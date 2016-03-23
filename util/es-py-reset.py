from app.config import es_index
from elasticsearch import Elasticsearch
# import simplejson as json
# import sys

# default configuration settings (localhost:9200)
es = Elasticsearch()

es.indices.delete(index=es_index)
