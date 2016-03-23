from elasticsearch import Elasticsearch

# default configuration settings (localhost:9200)
es = Elasticsearch()

print es.snapshot.status(repository='unicorn_backups',
                         snapshot='2015-03-30_all_focus_africa')
