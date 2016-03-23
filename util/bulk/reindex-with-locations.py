from elasticsearch import Elasticsearch
import sys

# default configuration settings (localhost:9200)
es = Elasticsearch()
DEFAULT_INDEX = 'dossiers'

filename = sys.argv[1]
file64 = open(filename, "rb").read().encode("base64")

doc_struct = {'file': file64, 'title': filename}

es.index(index=DEFAULT_INDEX, doc_type='attachment', body=doc_struct)
