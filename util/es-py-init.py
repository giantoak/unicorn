from elasticsearch import Elasticsearch
import sys
# import simplejson as json

# default configuration settings (localhost:9200)
es = Elasticsearch()
DEFAULT_INDEX = 'dossiers'

def create_attachment_mapping(index=DEFAULT_INDEX):
    mappings_config = {
            "attachment" : {
                "properties" : {
                    "file": {
                        "type": "attachment",
                        "path": "full",
                        "fields": {
                            "file": {
                                "type": "string",
                                "term_vector":"with_positions_offsets",
                                "store": True
                                }
                            }
                        }
                    }
                }
            }

    es.indices.create(index=index, body={
            'mappings': mappings_config,
        })

create_attachment_mapping()
