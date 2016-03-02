import elasticsearch
from elasticsearch import Elasticsearch
# import simplejson as json
# import sys

# default configuration settings (localhost:9200)
es = Elasticsearch()
DEFAULT_INDEX = 'dossiers'


def iterate_over_query(es, query, index=DEFAULT_INDEX,
                       batch_size=10, count=None, count_args={}, search_args={}, fields='*'):
    """Uses `scroll` API to iterate over search results"""

    if not count:
        count = es.count(index=index, q=query, **count_args)['count']
    
    # Initialize scroll scan
    r = es.search(index=index, doc_type='attachment', q=query, size=count, scroll='10m', search_type='scan', **search_args)
    
    s = es.scroll(scroll_id=r['_scroll_id'])
    while True:
        print count, len(s['hits']['hits'])
        for result in s['hits']['hits']:
            yield result

        try:
            s = es.scroll(scroll_id=r['_scroll_id'])
        except elasticsearch.exceptions.NotFoundError:
            break
