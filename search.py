from app.config import es_url
from app.config import es_port
from app.config import es_index
import simplejson as json
import requests


def run(term=''):
    """

    :param str term:
    :returns str:
    """
    url = '{}:{}/{}/_search'.format(es_url, es_port, es_index)
    body = {
        "query": {
            "match": {
                "file": str(term)
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
