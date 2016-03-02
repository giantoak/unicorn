from elasticsearch import Elasticsearch
# import simplejson as json
# import sys

# default configuration settings (localhost:9200)
es = Elasticsearch()
DEFAULT_INDEX = 'dossiers'

es.indices.delete(index=DEFAULT_INDEX)
