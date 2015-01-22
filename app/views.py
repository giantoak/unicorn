from app import app

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

        f.save(outfile)
        d[outfile.name] = outfile
        
    session['file_dict'] = d
    
    import pprint; pprint.pprint(d)
    [x.close() for x in d.values()]
    del d
