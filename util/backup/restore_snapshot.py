from app.config import es_index
from elasticsearch import Elasticsearch

# default configuration settings (localhost:9200)
es = Elasticsearch()
snapshot = '2015-03-30_all_focus_africa'
c = raw_input('WARNING: This will delete index {} and replace with\
snapshot {}. Type "YES" to continue.'.format(es_index, snapshot))

if c == 'YES':
    es.indices.delete(index=es_index)
    es.snapshot.restore(repository='unicorn_backups',
                        snapshot=snapshot)
