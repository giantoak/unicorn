from app.config import es_index
from elasticsearch import Elasticsearch
import simplejson as json
import sys
import requests

import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from iterate_search import iterate_over_query


def parse_mitie_output(raw_json):
    """

    :param dict raw_json: dict of JSON values
    :returns list: List of entities
    """
    if 'entities' not in raw_json:
        return list()

    return list(set([elem['text'] for elem in raw_json['entities'] if 'text' in elem]))


def call_mitie(text):
    """

    :param text:
    """
    r = requests.post(url="http://127.0.0.1:10001/saruman",
                      data=json.dumps(text))
    entities_raw = r.json()
    return parse_mitie_output(entities_raw)


def update_partial(es, entities, doc_id):
    """
    Add entities to docs
    :param es:
    :param entities
    :param doc_id
    """
    # Partial update doc
    partial_doc = {'doc': {'entities': entities}}
    es.update(index=es_index,
              doc_type='attachment',
              id=doc_id,
              body=partial_doc,
              refresh=True)


def main():
    es = Elasticsearch()
    itr = iterate_over_query(es, '*')

    for doc in itr:
        doc_id = doc['_id']
        try:
            text = {'text': doc['fields']['file'][0]}
        except (KeyError, IndexError):
            continue

        entities = call_mitie(text)

        if len(entities) > 0:
            print doc_id, entities
            update_partial(es, entities, doc_id)


if __name__ == "__main__":
    main()
