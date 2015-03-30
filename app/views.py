from app import app, es, db, flask_bcrypt, login_manager
from app import User, Organization
from flask import jsonify
from flask import render_template
from flask import url_for
from flask import redirect
from flask import Response
from flask import request
from flask import session
from flask import abort
from flask import flash
from flask import send_file
from flask.ext.login import (current_user, login_required, login_user, 
        logout_user, confirm_login, fresh_login_required)

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

from bulk import bulk_download, bulk_search
from config import tmp_dir
from util.network import make_graph
import time

DEFAULT_INDEX = 'dossiers'

@app.route('/_bulk_search', methods=['POST'])
@login_required
def bulk_search_route():

    search_results = request.form['searches']
    searches = search_results.split('\n')
    
    data = bulk_search(searches)
    return send_file(io.BytesIO(data.xls), as_attachment=True,
            attachment_filename='bulk_{}.xls'.format(time.time()))

    # Bulk search all of these queries
    # Bundle results into excel


@app.route('/bulk_download')
@login_required
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
@login_required
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
@login_required
def get_entities(doc_id):
    response = request_doc(doc_id)
    try:
        entities = response['hits']['hits'][0]['_source']['entities']
    except KeyError, IndexError:
        return jsonify([])
    
    return jsonify({'entities': entities})

@app.route('/view/<doc_id>')
@login_required
def view_doc(doc_id):
    ''' In-depth view of a particular document.
    Displays pdf version of document, extracted entities,
    as well as other analytics. '''
    
    if is_owner_of_doc(doc_id):
        return render_template('doc-view.html', doc_id=doc_id)
    else:
        return abort(403)

@app.route('/pdf/<doc_id>')
@login_required
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
@login_required
def download_endpoint(doc_id):
    
    base64, fn = get_file(doc_id)
    f = io.BytesIO(base64.decode('base64'))
    return send_file(f,
            as_attachment=True,
            attachment_filename=fn)

@app.route('/search/<query>/<page>/preserve')
@login_required
def search_preserve(query, page):
    return search_endpoint(query, page, box_only=True)

@app.route('/search')
@app.route('/search/<query>')
@app.route('/search/<query>/<page>')
@login_required
def search_endpoint(query=None, page=None, box_only=False):
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
            "fields": ["title", "highlight", "entities", "owner"],
            "from": start,
            "query" : {
                "match" : {
                    "file" : query
                    }
                },

            "highlight": { "fields": { "file": { } },
                "pre_tags" : ["<span class='highlight'>"],
                "post_tags" : ["</span>"]
                }
            }
    raw_response = es.search(body=q, index=DEFAULT_INDEX,
            df="file", 
            size=10)

    hits = []
    
    for resp in raw_response['hits']['hits']:
        # Store returned ids
        session['last_query']['ids'].append(resp['_id'])
        
        if is_owner(resp['fields']['owner'][0]):
            # Flatten structure for individual hits
            hits.append({'id': resp['_id'], 
                'title': resp['fields']['title'][0],
                'highlight': resp['highlight']['file'][0],
                'permissions': True
                })
        else:
            hits.append({'id': resp['_id'], 
                'title': resp['fields']['title'][0],
                'permissions': False
                })


    results = {
            'hits': hits,
            'took': float(raw_response['took'])/1000,
            'total': "{:,}".format(raw_response['hits']['total']),
            'total_int': int(raw_response['hits']['total']),
            'query': query,
            'from': int(page)
            }

    if box_only:
        return render_template('search-results-box.html', results=results)

    return render_template('search-template.html', results=results)

@app.route('/')
@login_required
def root():
    user_struct = {
            'notifs': 0
            }
    return render_template('index-dash.html', user=user_struct)

@app.route('/user')
@login_required
def user_page():
    # If current user is admin

    return render_template('user-invite.html')


@app.route('/upload/')
@login_required
def upload_form():
    return render_template('upload.html')

@app.route('/_upload-documents', methods=['POST'])
@login_required
def upload_endpoint():
    files = request.files.getlist('file[]') 
    d = {}
    for f in files:
        sf = secure_filename(f.filename)

        es_dict = {
                'file': f.read().encode('base64'),
                'title': sf,
                'owner': current_owner.organization.organization
                }
        es.index(index=DEFAULT_INDEX, doc_type='attachment', body=es_dict)
        f.close()

    return redirect(url_for('root'))

@app.route('/viz')
@login_required
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
@login_required
def viz_endpoint(query):
    url='http://localhost:9200/dossiers/_search'
    q = {
        "fields" : ["entities","title"],
        "query" : {
            "term" : { "file" : query }
            }
        }
    #r=requests.post(url,data=json.dumps(q))
    r=es.search(body=q,index=DEFAULT_INDEX)    
    data=r
    graph = make_graph(data)
    return json.dumps(graph)

@app.route('/viz_latest')
@login_required
def viz_latest():
    return viz_endpoint(session['last_query']['query'])


@app.route('/wc_latest')
@login_required
def wc_latest():
    return wc(session['last_query']['query'])

@app.route('/wordcloud/<query>')
@login_required
def wc(query):
    stopset=set(stopwords.words('english'))
    url='http://localhost:9200/dossiers/_search'
    q = {
        "fields" : ["file"],
        "query" : {
            "term" : { "file" : query }
            }
        }
    #r=requests.post(url,data=json.dumps(q))    
    r=es.search(body=q,index=DEFAULT_INDEX)
    data=r['hits']['hits'][0]['fields']['file'][0]

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
@login_required
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
@login_required
def reroute_index():
    return redirect('/')

@app.route('/register', methods=['POST'])
@login_required
def handle_registration():
    if not current_user.moderator:
        return redirect('/')

    email = request.form['email']
    password = request.form['password']
    
    # Change this to: current user's group
    organization = current_user.organization
    
    pw_hashed = flask_bcrypt.generate_password_hash(password)
    new_user = User(email=email,
                    password=pw_hashed,
                    organization=organization)

    db.session.add(new_user)
    db.session.commit()

    return redirect('/')

######################################
# Registration blueprint:
######################################

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == 'GET':
        return render_template("/user-login.html")

    email = request.form["email"]
    password = request.form["password"]
    user = User.query.filter_by(email=email).first()
    if user and flask_bcrypt.check_password_hash(user.password, 
            password):
            if login_user(user):
                return redirect('/')
            else:
                flash("Invalid email or password")

    return render_template("/user-login.html")

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect('/login')


@login_manager.unauthorized_handler
def login_redirect():
    return redirect('/login')

@login_manager.user_loader
def load_user(userid):
    return User.query.get(userid)

def is_owner_of_doc(doc):
    owner = es.get(index=DEFAULT_INDEX, doc_type='attachment', id=doc, 
            fields='owner')['fields']['owner'][0]
    return is_owner(owner)

def is_owner(org):
    return current_user.organization.organization == 'admins' or \
            current_user.organization.organization == org

@app.errorhandler(403)
def permission_denied(e):
    return render_template('permission-denied.html'), 403
