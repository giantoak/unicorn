import simplejson as json
import requests


def run(term=""):
    r = requests.get(''+term)
    data = r.json()
    titles = [x['_source']['title'] for x in data['hits']['hits']]
    return json.dumps(titles)
