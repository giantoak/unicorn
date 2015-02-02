import urllib2
import json
import simplejson
import nltk
from nltk import word_tokenize
from nltk.tokenize import RegexpTokenizer
import requests


def run(term=""):
	url='http://ec2-54-145-248-41.compute-1.amazonaws.com:9200/dossiers/_search'
	body={
		"query":{
			"match":{
				"file":term
			}
		},
		"highlight":{"fields":{"file":{}}}

	}
	r=requests.post(url,json.dumps(body))
	data=r.json()
	titles=[]
	for hit in data['hits']['hits']:
		titles.append({"doc":hit['_source']['title'],"snippet":hit['highlight']['file']})

	return json.dumps(titles)