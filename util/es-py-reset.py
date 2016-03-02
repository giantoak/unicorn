from elasticsearch import Elasticsearch
import sys
# import simplejson as json

# default configuration settings (localhost:9200)
es = Elasticsearch()
DEFAULT_INDEX = 'dossiers'

es.indices.delete(index=DEFAULT_INDEX)
