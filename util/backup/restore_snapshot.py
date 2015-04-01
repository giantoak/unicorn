from elasticsearch import Elasticsearch

import sys
import os

# default configuration settings (localhost:9200)
es = Elasticsearch()
DEFAULT_INDEX = 'dossiers'
snapshot = '2015-03-30_all_focus_africa'
c = raw_input('WARNING: This will delete index "dossiers" and replace with\
snapshot {}. Type "YES" to continue.'.format(DEFAULT_INDEX, snapshot))

if c == 'YES':
    es.indices.delete(index=DEFAULT_INDEX)
    es.snapshot.restore(repository='unicorn_backups', 
            snapshot=snapshot)
