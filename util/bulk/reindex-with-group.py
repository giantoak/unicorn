from elasticsearch import Elasticsearch
# import simplejson as json
import sys

import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from iterate_search import iterate_over_query
import requests
from collections import defaultdict

import phonenumbers

def update_partial(doc_id, group):
    # Partial update doc
    partial_doc = {'doc': {'owner': group} }

    es.update(index='dossiers', doc_type='attachment', id=doc_id, body=
            partial_doc, refresh=True)

es = Elasticsearch()
it = iterate_over_query(es, '*', fields='_id')

for i, doc in enumerate(it):
    doc_id = doc['_id']
    update_partial(doc_id, 'Focus Africa')

    if i % 10 == 0:
        print i, doc_id
