import simplejson as json
import requests


def run(term=''):
    """

    :param str term: Page to request?
    :return list: List of titles of elastic hits in response
    """
    r = requests.get(str(term).strip())
    data = r.json()
    return json.dumps([x['_source']['title'] for x in data['hits']['hits']])
