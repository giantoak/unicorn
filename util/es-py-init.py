from app.config import es_index
from elasticsearch import Elasticsearch

# default configuration settings (localhost:9200)
es = Elasticsearch()


def create_attachment_mapping(index=es_index):
    mappings_config = {
            "attachment": {
                "properties": {
                    "file": {
                        "type": "attachment",
                        "path": "full",
                        "fields": {
                            "file": {
                                "type": "string",
                                "term_vector": "with_positions_offsets",
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
