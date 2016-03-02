# import urllib2
# import json
import simplejson as json
# import nltk
# from nltk import word_tokenize
# from nltk.tokenize import RegexpTokenizer
import requests


def run(term=""):
    r = requests.get(''+term)
    data = r.json()
    titles = [x['_source']['title'] for x in data['hits']['hits']]
    return json.dumps(titles)