from app.config import es_url
from app.config import es_port
import simplejson as json
import requests


def run(term=""):
    url = '{}:{}/dossiers/_search'.format(es_url, es_port)
    body = {
        "query": {
            "match": {
                "file": term
            }
        },
        "highlight": {"fields": {"file": {}}}

    }
    r = requests.post(url, json.dumps(body))
    data = r.json()
    titles = []
    for hit in data['hits']['hits']:
        titles.append({"doc": hit['_source']['title'], "snippet": hit['highlight']['file']})

    return json.dumps(titles)
