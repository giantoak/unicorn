from app import app, es
from flask import jsonify
from flask import render_template
from flask import url_for
from flask import redirect
from flask import Response
from flask import request
from flask import session
from werkzeug import secure_filename
import flask
import tempfile
import json

from elasticsearch_dsl import Search, Q

DEFAULT_INDEX = 'dossiers'

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
    raw_response = es.search(body=q, index=DEFAULT_INDEX, df="file")
    clean_response = []

    for resp in raw_response['hits']['hits']:
        clean_response.append((resp['_source']['title'], resp['highlight']['file'][0]))

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
