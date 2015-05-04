from elasticsearch import Elasticsearch

es = Elasticsearch()

q ={ "attachment": {
        "properties": {
        "entity": {
            "type": "nested",
            }
        }
    }
}
es.indices.put_mapping(index='dossiers', doc_type='attachment', body = q)
