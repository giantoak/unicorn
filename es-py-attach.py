from elasticsearch import Elasticsearch
import json
import sys

# default configuration settings (localhost:9200)
es = Elasticsearch()
DEFAULT_INDEX = 'dossiers'

def create_attachment_mapping(index=DEFAULT_INDEX):
    mappings_config = {
            "attachment" : {
                "properties" : {
                    "file" : {
                        "type" : "attachment",
                        "fields" : {
                            "title" : { "store" : "yes" },
                            "file" : { "term_vector":"with_positions_offsets", "store":"yes"}
                            }
                        }
                    }
                }
            }

    es.indices.create(index=index, body={
            'mappings': mappings_config,
        })

filename = sys.argv[1]
file64 = open(filename, "rb").read().encode("base64")

doc_struct = {
        'file': file64,
        'title': filename
        }

es.index(index=DEFAULT_INDEX, doc_type='attachment', body=doc_struct)
