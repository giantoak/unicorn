from app.config import es_index
from elasticsearch import Elasticsearch
import sys

# default configuration settings (localhost:9200)
es = Elasticsearch()

filename = sys.argv[1]
file64 = open(filename, 'rb').read().encode('base64')

doc_struct = {'file': file64, 'title': filename}

es.index(index=es_index, doc_type='attachment', body=doc_struct)
