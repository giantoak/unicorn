from app.config import es_index
from elasticsearch import Elasticsearch

# default configuration settings (localhost:9200)
es = Elasticsearch()

q = {
        "indices": es_index,
        "ignore_unavailable": False,
        "include_global_state": True
}

es.snapshot.create(repository='unicorn_backups',
                   body=q,
                   snapshot='2015-03-30_all_focus_africa')
