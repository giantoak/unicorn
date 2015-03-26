from app import app, es
from flask import jsonify
from flask import render_template
from flask import url_for
from flask import redirect
from flask import Response
from flask import request
from flask import session
from flask import abort
from flask import send_file
from werkzeug import secure_filename
import flask
import tempfile
import json
from elasticsearch_dsl import Search, Q
import io
import re
import magic
import requests
from nltk import word_tokenize
from nltk.corpus import stopwords
from collections import Counter
import os
import subprocess

from bulk import bulk_download
from config import tmp_dir
from util.network import make_graph

DEFAULT_INDEX = 'dossiers'

@app.route('/bulk_download')
def bulk_download_route():
    if 'last_query' not in session:
        return abort(404)
    
    last_query = session['last_query']

    ids = last_query['ids']
    query = last_query['query']

    data = bulk_download(ids)

    return send_file(io.BytesIO(data.xls), as_attachment=True,
            attachment_filename=query + '.xls')

@app.route('/<doc_id>/debug')
def request_doc(doc_id):
    q = {
            "query" : {
                "match" : {
                    "_id" : doc_id
                    }
                },
            }
    response = es.search(body=q, index=DEFAULT_INDEX)
    return response

def get_file(doc_id):
    ''' Render base64 encoded contents of a given file by its doc_id '''
    response = request_doc(doc_id)
    try:
        base64 = response['hits']['hits'][0]['_source']['file']
        fn = response['hits']['hits'][0]['_source']['title']
    except KeyError, IndexError:
        abort(404)

    return base64, fn

@app.route('/<doc_id>/entities')
def get_entities(doc_id):
    response = request_doc(doc_id)
    try:
        entities = response['hits']['hits'][0]['_source']['entities']
    except KeyError, IndexError:
        return jsonify([])
    
    return jsonify({'entities': entities})

@app.route('/view/<doc_id>')
def view_doc(doc_id):
    ''' In-depth view of a particular document.
    Displays pdf version of document, extracted entities,
    as well as other analytics. '''

    return render_template('doc-view.html', doc_id=doc_id)

@app.route('/pdf/<doc_id>')
def pdf_endpoint(doc_id):
    base64, fn = get_file(doc_id)
    b = base64.decode('base64')
    mimetype = magic.from_buffer(b, mime=True)

    if mimetype == 'application/pdf':
        return send_file(io.BytesIO(b), as_attachment=True,
                attachment_filename=fn)
    
    else:
        fd, fname = tempfile.mkstemp(prefix=tmp_dir)
        stream = os.fdopen(fd, 'wb')
        stream.write(b)
        out_fname = fname + '.out'
        stream.close()

        os.chmod(fname, 0777)
        try:
            subprocess.check_output(['unoconv', '-o', out_fname, fname],
                    stderr=subprocess.STDOUT)
            with open(out_fname, 'rb') as converted_stream:
                out = send_file(out_fname, as_attachment=True,
                        attachment_filename=fn + '.pdf')
        except subprocess.CalledProcessError as e:
            print e.output
            # Return error pdf
            out = "no pdf available"

        
        os.remove(fname)
        os.remove(out_fname)
        
        return out

@app.route('/download/<doc_id>')
def download_endpoint(doc_id):
    
    base64, fn = get_file(doc_id)
    f = io.BytesIO(base64.decode('base64'))
    return send_file(f,
            as_attachment=True,
            attachment_filename=fn)

@app.route('/search')
@app.route('/search/<query>')
@app.route('/search/<query>/<page>')
def search_endpoint(query=None, page=None):
    if not query and not page:
        last_query = session.get('last_query', None)
        if last_query:
            query, page = last_query['query'], last_query['page']
        else:
            # better error
            return abort(404)
    
    if not page:
        page = 1

    session['last_query'] = {'query': query, 'page': page, 'ids': []}
    # convert pages to records for ES 
    start = int(page)
    if start > 1:
        start *= 10

    q = {
            "fields": ["title", "highlight", "entities"],
            "from": start,
            "query" : {
                "match" : {
                    "file" : query
                    }
                },

            "highlight": { "fields": { "file": { } } }
            }
    raw_response = es.search(body=q, index=DEFAULT_INDEX,
            df="file", 
            size=10)

    hits = []

    for resp in raw_response['hits']['hits']:
        # Store returned ids
        session['last_query']['ids'].append(resp['_id'])

        # Flatten structure for individual hits
        hits.append({'id': resp['_id'], 
            'title': resp['fields']['title'][0],
            'highlight': resp['highlight']['file'][0]
            })

    results = {
            'hits': hits,
            'took': float(raw_response['took'])/1000,
            'total': "{:,}".format(raw_response['hits']['total']),
            'total_int': int(raw_response['hits']['total']),
            'query': query,
            'from': int(page)
            }
    return render_template('search-template.html', results=results)

@app.route('/')
def root():
    return render_template('index-dash.html')

@app.route('/upload/')
def upload_form():
    return render_template('upload.html')

@app.route('/_upload-documents', methods=['POST'])
def upload_endpoint():
    files = request.files.getlist('file[]') 
    d = {}
    for f in files:
        sf = secure_filename(f.filename)

        es_dict = {
                'file': f.read().encode('base64'),
                'title': sf
                }
        es.index(index=DEFAULT_INDEX, doc_type='attachment', body=es_dict)
        f.close()
        

    return redirect(url_for('root'))

@app.route('/viz')
def viz_all():
    q = {
        "fields" : ["entities","title"],
        "query" : {
            "match_all" : {}
            },
        "size": 500
        }
    r = es.search(body=q, index=DEFAULT_INDEX)
    graph = make_graph(r)

    return json.dumps(graph)

@app.route('/viz/<query>')
def viz_endpoint(query):
    url='http://localhost:9200/dossiers/_search'
    q = {
        "fields" : ["entities","title"],
        "query" : {
            "term" : { "file" : query }
            }
        }
    r=requests.post(url,data=json.dumps(q))    
    data=r.json()
    graph = make_graph(data)
    return json.dumps(graph)

@app.route('/wordcloud/<query>')
def wc(query):
    stopset=set(stopwords.words('english'))
    url='http://localhost:9200/dossiers/_search'
    q = {
        "fields" : ["file"],
        "query" : {
            "term" : { "file" : query }
            }
        }
    r=requests.post(url,data=json.dumps(q))    
    data=r.json()['hits']['hits'][0]['fields']['file'][0]

    nowhite=re.sub('\s', ' ', data)
    nowhite=re.sub(r'[^\w\s]', '', data)
    wt=word_tokenize(nowhite)
    wc=dict(Counter(wt))
    frequency=[]
    for k,v in wc.iteritems():
        frequency.append(dict({"text":k,"size":v*3}))
    frequency=filter(lambda x:x['size']>3 and x['text'].lower() not in stopset,frequency)
    return json.dumps(frequency)

@app.route('/<doc_id>/related')
def more_like_this(doc_id):
    ''' Returns similar documents '''
    q = {
      "fields": ["title"],
        "query": {
            "more_like_this" : {
            "docs" : [
            {
                "_index" : "dossiers",
                "_type" : "attachment",
                "_id" : doc_id
            }]
          }
        },
        "size": 10
    }
    
    response = es.search(body=q, index=DEFAULT_INDEX)
    results = {'results': []}
    try:
        for r in response['hits']['hits']:
            results['results'].append({
                'id': r['_id'],
                'name': r['fields']['title'][0]
                })
    except KeyError, IndexError:
        pass

    return jsonify(results)

@app.route('/index.html')
def reroute_index():
    return redirect('/')
