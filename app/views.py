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
import networkx as nx
from itertools import combinations
from networkx.readwrite import json_graph
from elasticsearch_dsl import Search, Q
import io
import requests

DEFAULT_INDEX = 'dossiers'

@app.route('/download/<doc_id>')
def download_endpoint(doc_id):
    q = {
            "query" : {
                "match" : {
                    "_id" : doc_id
                    }
                },
            }
    response = es.search(body=q, index=DEFAULT_INDEX)
    
    try:
        f = io.BytesIO(response['hits']['hits'][0]['_source']['file']
                .decode('base64'))
        fn = response['hits']['hits'][0]['_source']['title']
    except KeyError, IndexError:
        abort(404)

    return send_file(f,
            as_attachment=True,
            attachment_filename=fn)


@app.route('/search/<query>')
def search_endpoint(query):
    q = {
            "query" : {
                "match" : {
                    "file" : query
                    }
                },

            "highlight": { "fields": { "file": { } } }
            }
    raw_response = es.search(body=q, index=DEFAULT_INDEX, df="file", size=50)
    clean_response = []

    for resp in raw_response['hits']['hits']:
        clean_response.append((resp['_id'], resp['_source']['title'], 
            resp['highlight']['file'][0]))

    return Response(json.dumps({'result': clean_response}), mimetype='text/json')

@app.route('/')
def root():
    return render_template('home-tabview.html')

@app.route('/upload/')
def upload_form():
    return render_template('upload.html')

@app.route('/_upload-documents', methods=['POST'])
def upload_endpoint():
    files = request.files.getlist('file[]') 
    d = {}
    for f in files:
        sf = secure_filename(f.filename)
        outfile = tempfile.NamedTemporaryFile(delete=False)

        es_dict = {
                'file': f.read().encode('base64'),
                'title': sf
                }
        es.index(index=DEFAULT_INDEX, doc_type='attachment', body=es_dict)
        f.close()
        

    return redirect(url_for('root'))

@app.route('/viz/<query>')
def viz_endpoint(query):
    url='http://ec2-54-145-248-41.compute-1.amazonaws.com:9200/dossiers/_search'
    q = {
        "fields" : ["entities","title"],
        "query" : {
            "term" : { "file" : query }
            }
        }
    r=requests.post(url,data=json.dumps(q))    
    data=r.json()
    g=nx.Graph()
    for hits in data['hits']['hits']:
        temp=[]
        try:
            for entity in hits['fields']['entities']:
                temp.append(entity)
                g.add_node
            edges=combinations(temp,2)
            g.add_edges_from(list(edges))
        except KeyError:
            pass
    return json.dumps(json_graph.node_link_data(g))