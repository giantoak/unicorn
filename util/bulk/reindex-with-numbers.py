from elasticsearch import Elasticsearch
import json
import sys

import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from iterate_search import iterate_over_query
import requests
import json
from collections import defaultdict

import phonenumbers

def call_mitie(text):
    r = requests.post(url="http://127.0.0.1:10001/saruman",
            data=json.dumps(text))
    entities_raw = r.json()
    entities = parse_mitie_output(entities_raw)
    
    return entities

def parse_mitie_output(raw):
    entities = set()
    try:
        for elem in raw['entities']:
            entities.add(elem['text'])
    except KeyError:
        return list()
    
    return list(entities)

def update_partial(entities, doc_id):
    # Partial update doc
    partial_doc = {'doc': {'entities': entities} }

    es.update(index='dossiers', doc_type='attachment', id=doc_id, body=
            partial_doc, refresh=True)

es = Elasticsearch()
it = iterate_over_query(es, '*')

for doc in it:
    doc_id = doc['_id']
    try:
        text = {'text': doc['fields']['file'][0]}
    except KeyError, IndexError:
        continue
    
    entities = call_mitie(text)
    
    if len(entities) > 0:
        print doc_id, entities
        update_partial(entities, doc_id)

