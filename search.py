import urllib2
import json
import simplejson
import nltk
from nltk import word_tokenize
from nltk.tokenize import RegexpTokenizer
import requests


def run(term=""):
	url=''+term
	r=requests.get(url)
	data=r.json()
	titles=[]
	for hit in data['hits']['hits']:
		titles.append(hit['_source']['title'])

	return json.dumps(titles)