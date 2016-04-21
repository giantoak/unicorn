from app import app, es, db, flask_bcrypt, login_manager
from app.config import es_url, es_port, es_index, tmp_dir
from app import User
# from app import Organization
from flask import jsonify
from flask import make_response
from flask import render_template
from flask import url_for
from flask import redirect
# from flask import Response
from flask import request
from flask import session
from flask import abort
from flask import flash
from flask import send_file
from flask_login import current_user
from flask_login import login_required
from flask_login import login_user
from flask_login import logout_user
# from flask_login import confirm_login
# from flask_login import fresh_login_required
from flask import Blueprint

import pandas as pd
from werkzeug.utils import secure_filename
import tempfile
import simplejson as json
import io
import re
import magic
import requests
from nltk import word_tokenize
from nltk.corpus import stopwords
from collections import Counter
import os
import subprocess

from bulk import bulk_download, bulk_search
import time
from datetime import datetime
from datetime import timedelta
# import corex as ce
import numpy as np
import phonenumbers
from phonenumbers import geocoder

from util.historical import amend_history
from util.historical import active_history_terms
from util.historical import update_history
from util.network import document_graph
from util.round_time import round_month_up, round_month_down, week_delta

es_path = 'http://{}:{}/{}'.format(es_url, es_port, es_index)

parent = os.path.dirname(os.path.realpath(__file__))

uni = Blueprint('unicorn', __name__, url_prefix='/unicorn')


@uni.route('/_bulk_search', methods=['POST'])
@login_required
def bulk_search_route():
    """
    Bulk search all of these queries
    :return: Excel file bundling query responses
    """
    search_results = request.form['searches']
    searches = search_results.split('\n')

    data = bulk_search(searches)
    return send_file(io.BytesIO(data.xls), as_attachment=True,
                     attachment_filename='bulk_{}.xls'.format(time.time()))


@uni.route('/bulk_download')
@login_required
def bulk_download_route():
    last_query = session.get('last_query', None)
    if last_query is None:
        return abort(404)

    ids = last_query['ids']
    query = last_query['query']

    data = bulk_download(ids)

    return send_file(io.BytesIO(data.xls), as_attachment=True,
                     attachment_filename=query + '.xls')


@uni.route('/<doc_id>/debug')
@login_required
def request_doc(doc_id):
    """
    Searches elastic index for a document matching a particular ID.
    :param str doc_id: A specific document ID
    :return: results of elastic search matching doc_id
    """
    q = {
        "query": {
            "match": {
                "_id": doc_id
            }
        },
    }
    return es.search(body=q, index=es_index)


def get_file(doc_id):
    """
    Render base64 encoded contents of a given file by its doc_id
    :param str doc_id: A specific document ID
    :return tuple: Base 64 encoded document contents and the document's title
    """
    r = request_doc(doc_id)
    try:
        data = r['hits']['hits']
        base64 = data[0]['_source']['file']
        fn = data[0]['_source']['title']
    except (KeyError, IndexError):
        abort(404)

    return base64, fn


@uni.route('/<doc_id>/entities')
@login_required
def get_entities(doc_id):
    """

    :param str doc_id: A specific document ID
    :return str: JSON for the list of retrieved entities
    """
    r = request_doc(doc_id)
    try:
        data = r['hits']['hits']
        entities = json.loads(data[0]['_source']['entities'])
        entities = [ent for ent in entities if ent['category'] != 'locations']

        print entities
        print type(entities)

    except (KeyError, IndexError):
        return jsonify([])

    return jsonify({'entities': entities})


@uni.route('/view/<doc_id>')
@login_required
def view_doc(doc_id):
    """
    In-depth view of a particular document. Displays PDF version of document,
    extracted entities, and other analytics.
    :param str doc_id: A specific document ID
    :return: rendered template for the current document
    """
    if is_owner_of_doc(doc_id):
        return render_template('doc-view.html', doc_id=doc_id)

    return abort(403)


@uni.route('/pdf/<doc_id>')
@login_required
def pdf_endpoint(doc_id):
    """

    :param str doc_id:
    :return:
    """
    base64, fn = get_file(doc_id)
    b = base64.decode('base64')
    mimetype = magic.from_buffer(b, mime=True)

    if mimetype == 'application/pdf':
        return send_file(io.BytesIO(b), as_attachment=True,
                         attachment_filename=fn)

    fd, fname = tempfile.mkstemp(prefix=tmp_dir)
    stream = os.fdopen(fd, 'wb')
    stream.write(b)
    out_fname = fname + '.out'
    stream.close()

    os.chmod(fname, 0777)
    try:
        subprocess.check_output(['unoconv', '-o', out_fname, fname],
                                stderr=subprocess.STDOUT)
        out = send_file(out_fname,
                        as_attachment=True,
                        attachment_filename='{}.pdf'.format(fn))

    except subprocess.CalledProcessError as e:
        print e.output
        # Return error pdf
        out = "no pdf available"

    os.remove(fname)
    os.remove(out_fname)

    return out


@uni.route('/topics/<doc_id>')
def get_topics(doc_id):
    topics = json.loads(open('topics.json').read())
    return json.dumps(topics['documents'][doc_id])


@uni.route('/topics_latest')
@login_required
def topics_latest():
    last_query = session.get('last_query', None)
    if last_query is not None:
        return alltopics(last_query['query'])


@uni.route('/all_topics')
def alltopics(query):
    q = {
        "_source": False,
        "query": {
            "match": {
                "file": query
            }
        },
        "size": 10000000
    }
    r = es.search(body=q, index=es_index)

    # return doc ids specific to session query
    data = r['hits']['hits']
    uids = [str(hit['_id']) for hit in data]

    topics = json.loads(open('topics.json').read())

    # filter by uids
    documents = {key: topics['documents'][key] for key in uids}

    # pick random document to get number of topics
    num_topics = len(documents[uids[0]])

    num_docs = len(documents)

    # use argmax to return the highest rated topic per document, then enumerate bins across all documents
    # returns proportion of results per document where each document can only
    # be its maximum scored topic
    dist = {}
    count = 0
    for idx, x in enumerate(np.bincount([np.argmax(item[1]) for item in documents.items()],  minlength=num_topics)):
        dist['topic{}'.format(count)] = float(x) / num_docs
        count += 1
    topics['dist'] = dist

    # initialize a blank dict
    # enumerate topic + i as keys to blank lists
    date_ids = {'topic{}'.format(i): [] for i in range(num_topics)}

    # iterate over returned documents and pick best topic
    # add doc id to date_ids list for best topic
    for doc_id in documents:
        doc_topic = np.argmax(documents[doc_id])
        id_list = date_ids['topic' + str(doc_topic)]
        id_list.append(doc_id)
        date_ids['topic{}'.format(doc_topic)] = id_list

    topic_dates = {topic: '[]' for topic in date_ids}
    topic_query_dict = {
            "query": {
                "ids": {
                    # should return list of ids for the given topic
                    "values": ''
                }
            },
            "aggs": {
                "articles_over_time": {
                    "date_histogram": {
                        "field": "date",
                        "interval": "week"
                    }
                }
            }
        }

    for topic in date_ids:
        if len(date_ids[topic]) == 0:
            continue

        topic_query_dict['query']['ids']['values'] = date_ids[topic]
        response = es.search(body=topic_query_dict, index=es_index)

        df = pd.DataFrame(response['aggregations']['articles_over_time']['buckets'])
        df['Date'] = df.key_as_string.apply(lambda x: x[:10])
        df.columns = ['Count', 'key', 'key_as_string', 'Date']
        df.drop(['key', 'key_as_string'], axis=1, inplace=True)
        date_count_json = df.to_json(orient='records')

        topic_dates[topic] = date_count_json

    topics['date_agg'] = topic_dates

    return json.dumps(topics)


@uni.route('/download/<doc_id>')
@login_required
def download_endpoint(doc_id):

    base64, fn = get_file(doc_id)
    f = io.BytesIO(base64.decode('base64'))
    return send_file(f, as_attachment=True, attachment_filename=fn)


@uni.route('/search/<query>/<page>/preserve')
@login_required
def search_preserve(query, page):
    return search_endpoint(query, page, box_only=True)


@uni.route('/hist/update/<query>/<active>')
@login_required
def update_history_route(query, active):
    session['history'] = update_history(session['history'], query, active)
    return make_response(json.dumps(session['history']))


@uni.route('/hist/delete')
@login_required
def delete_history():
    session['history'] = []
    return make_response(json.dumps(session['history']))


@uni.route('/hist/and')
@login_required
def history_query():
    """
    AND query over all active history terms
    """
    terms = active_history_terms(session['history'])
    body = {
        "_source": ["entity"],
        "fields": ["entities", "title"],
        "query": {
            "constant_score": {
                "filter": {
                    "terms": {
                        "file": terms,
                        "execution": "and"
                    }
                }
            }
        }
    }
    r = es.search(body=body, index=es_index, size=100)
    data = r['hits']['hits']
    graph = make_response(json.dumps(document_graph(data)))

    return graph


@uni.route('/search')
@uni.route('/search/<query>')
@uni.route('/search/<query>/<page>')
@login_required
def search_endpoint(query=None, page=None, box_only=False):
    if not query and not page:
        last_query = session.get('last_query', None)
        if last_query is not None:
            query, page = last_query['query'], last_query['page']
        else:
            # better error
            return abort(404)

    if not page:
        page = 1

    session['last_query'] = {'query': query, 'page': page, 'ids': []}
    session['history'] = amend_history(session.get('history', list()),
                                       session['last_query'])

    # convert pages to records for ES
    start = max(int(page) - 1, 0) * 10

    q = {
        # "fields": ["title", "highlight", "entities", "owner", "date"],
        "query": {
            "match": {
                "file": query
            }
        },

        "highlight": {"fields": {"file": {}},
                      "pre_tags": ["<span class='highlight'>"],
                      "post_tags": ["</span>"]
                      },

        "aggs": {
            "articles_over_time": {
                "date_histogram": {
                    "field": "date",
                    "interval": "week"
                }
            }
        }
    }

    raw_response = es.search(index=es_index,
                             body=q,
                             df='file',
                             from_=start,
                             fields=['title', 'highlight', 'entities', 'owner', 'date'],
                             size=10)

    hits = []

    for resp in raw_response['hits']['hits']:

        # Store returned ids
        session['last_query']['ids'].append(resp['_id'])

        if is_owner(resp['fields']['owner'][0]):
            # Flatten structure for individual hits
            hits.append({'id': resp['_id'],
                         'title': resp['fields']['title'][0],
                         'highlight': resp['highlight']['file'][0],
                         'permissions': True
                         })
        else:
            hits.append({'id': resp['_id'],
                         'title': resp['fields']['title'][0],
                         'permissions': False
                         })

    results = {
        'hits': hits,
        'took': float(raw_response['took']) / 1000,
        'total': "{:,}".format(raw_response['hits']['total']),
        'total_int': int(raw_response['hits']['total']),
        'query': query,
        'from': int(page)
    }

    if box_only:
        return render_template('search-results-box.html', results=results)

    return render_template('search-template.html', results=results,
                           history=session['history'])


@uni.route('/timeline')
@uni.route('/timeline/<query>')
@uni.route('/timeline/<query>/<page>')
@login_required
def timeline_new(query=None, page=None, box_only=False):
    if not query and not page:
        last_query = session.get('last_query', None)
        if last_query is not None:
            query, page = last_query['query'], last_query['page']
        else:
            # better error
            return abort(404)

    if not page:
        page = 1

    session['last_query'] = {'query': query, 'page': page, 'ids': []}
    # convert pages to records for ES
    start = max(int(page) - 1, 0) * 10

    q_daterange = {
        "aggs": {
            "max_date": {"max": {"field": "date"}},
            "min_date": {"min": {"field": "date"}}
        }
    }

    response = es.search(body=q_daterange, index=es_index)

    print("response['aggregations']['min_date']: {}".format(response['aggregations']['min_date']))
    print("response['aggregations']['max_date']: {}".format(response['aggregations']['max_date']))

    min_date_datetime = round_month_down(datetime.strptime(
        response['aggregations']['min_date']['value_as_string'],
        "%Y-%m-%dT%H:%M:%S.%fZ"))
    max_date_datetime = round_month_up(datetime.strptime(
        response['aggregations']['max_date']['value_as_string'],
        "%Y-%m-%dT%H:%M:%S.%fZ"))
    min_date = min_date_datetime.strftime(format="%Y-%m-%d")
    max_date = max_date_datetime.strftime(format="%Y-%m-%d")
    time_delta = week_delta(min_date_datetime, max_date_datetime)
    rng = pd.date_range(min_date, periods=time_delta, freq='w')
    rng = rng.tolist()
    rng = [date + timedelta(days=1) for date in rng]
    rng = [date.strftime("%Y-%m-%d") for date in rng]
    rngframe = pd.DataFrame(index=rng)

    timeline_minimum = min_date_datetime - timedelta(days=7)
    timeline_minimum = timeline_minimum.strftime(format="%Y-%m-%d")

    print(min_date)
    print(max_date)

    q = {
        "fields": ["title", "highlight", "entities", "owner", "date"],
        "from": start,
        "query": {
            "match": {
                "file": query
            }
        },

        "highlight": {"fields": {"file": {}},
                      "pre_tags": ["<span class='highlight'>"],
                      "post_tags": ["</span>"]
                      },

        "aggs": {
            "articles_over_time": {
                "date_histogram": {
                    "field": "date",
                    "interval": "week"
                }},
            "max_date": {"max": {"field": "date"}},
            "min_date": {"min": {"field": "date"}}
        }
    }

    response = es.search(body=q, index=es_index)

    print(response['aggregations']['articles_over_time']['buckets'])

    df = pd.DataFrame(response['aggregations']['articles_over_time']['buckets'])
    df['Date'] = df.key_as_string.apply(lambda x: str(x[:10]))
    df.columns = ['Count', 'key', 'key_as_string', 'Date']
    df.drop(['key', 'key_as_string'], axis=1, inplace=True)
    df.set_index('Date', inplace=True)

    output = rngframe.join(df, how="left")
    output = output.fillna(0)
    output = output.reset_index()
    output.columns = ['Date', 'Count']

    out = {'date_data': output.to_json(orient='records'),
           'time_min': timeline_minimum}

    print(json.dumps(out))
    return json.dumps(out)


@uni.route('/')
@login_required
def root():
    user_struct = {
        'notifs': 0
    }
    return render_template('index-dash.html', user=user_struct)


@uni.route('/user')
@login_required
def user_page():
    # If current user is admin
    return render_template('user-invite.html')


@uni.route('/upload/')
@login_required
def upload_form():
    return render_template('upload.html')


@uni.route('/_upload-documents', methods=['POST'])
@login_required
def upload_endpoint():
    """
    Takes a document and stores it in the elasticsearch index
    """
    files = request.files.getlist('file[]')
    d = {}
    for f in files:
        sf = secure_filename(f.filename)

        es_dict = {
            'file': f.read().encode('base64'),
            'title': sf,
            'owner': 'blank'  # current_owner.organization.organization
        }
        es.index(index=es_index, doc_type='attachment', body=es_dict)
        f.close()

    return redirect(url_for('.root'))


@uni.route('/viz')
@login_required
def viz_all():
    q = {
        "fields": ["entities", "title"],
        "query": {
            "match_all": {}
        },
        "size": 100
    }
    r = es.search(body=q, index=es_index)
    data = r['hits']['hits']
    graph = document_graph(data)

    return json.dumps(graph)


@uni.route('/clusters')
@login_required
def get_clusters():
    last_query = session.get('last_query', None)
    query = ''
    if last_query is not None:
        query = last_query['query']
    url = '{}/attachment/_search_with_clusters'.format(es_path)
    request = {
        "search_request": {
            "query": {"match": {"_all": query}},
            "size": 100
        },
        "algorithm": "lingo",
        "max_hits": 0,
        "query_hint": query,
        "field_mapping": {
            "title": ["_source.title"],
            "content": ["_source.content"]
        }
    }
    r = requests.post(url, data=json.dumps(request))
    return json.dumps(r.json())


@uni.route('/geo')
@login_required
def geo_endpoint():
    last_query = session.get('last_query', None)
    if last_query is None:
        return json.dumps([])
    query = last_query['query']

    url = '{}/_search'.format(es_path)

    loc_q = {
        "size": 30000,
        "filter": {
            "exists": {"field": "locations"}
        }
    }

    q = {
        "size": 100000,
        "fields": ["entities", "title", "file", "entities"],
        "query": {
            "query_string": {"query": query}
        }
    }
    r = es.search(body=q, index=es_index)
    data = r
    locations = []
    # for hit in data['hits']['hits']:
    #   print(hit['fields']['file'][0])
    #   print
    #   for location in geodict_lib.find_locations_in_text(re.sub('\s', ' ', hit['_source']['file'])):
    #       for token in location['found_tokens']:
    #       locations.append({'lat':token['lat'],'lon':token['lon'],'name':token['matched_string']})

    # geo = map(lambda x: x['found_tokens'])
    # return json.dumps(locations)
    # print('Number of Hits: ' + str(len(data['hits']['hits'])))

    for hit in data['hits']['hits']:
        entity_locations = []

        entities = json.loads(hit['fields']['entities'][0])

        try:
            for ent in entities:
                if ent['category'] == 'locations':
                    entity_locations.append(ent)
        except:
            locs = []

        try:
            doc_file = str(hit['fields']['file'][0].replace('\n', '<br>'))
        except:
            continue

        try:
            for location in entity_locations:
                locations.append({'lat': location['entity']['lat'], 'lon': location['entity']['lon'],
                                  'name': location['entity']['placename'], 'title': hit['fields']['title'],
                                  'file': doc_file})
        except:
            continue
            # print('no locations')

    # geo = map(lambda x: x['found_tokens'])
    return json.dumps(locations)


@uni.route('/serve_geo_new', methods=['POST'])
@uni.route('/serve_geo_new/<query>', methods=['POST'])
@uni.route('/serve_geo_new/<query>/<page>', methods=['POST'])
@login_required
def serve_geo_new(query=None, page=None, box_only=True, bounds=None):

    if bounds is None:
        bounds = {}

    if request.method == "POST":
        json_dict = request.get_json()
        print(json_dict)
        print(type(json_dict))
        try:
            bounds = json_dict['bounds']['bounds']
            southwest_lat = bounds['southwest_lat']
            southwest_lon = bounds['southwest_lon']
            northeast_lat = bounds['northeast_lat']
            northeast_lon = bounds['northeast_lon']

        except:
            southwest_lat = -84
            southwest_lon = -170
            northeast_lat = 85
            northeast_lon = 189

    print(json_dict)
    print('running a new query...')

    if not query and not page:
        last_query = session.get('last_query', None)
        if last_query is not None:
            query, page = last_query['query'], last_query['page']
        else:
            # better error
            return abort(404)

    if not page:
        page = 1

    session['last_query'] = {'query': query, 'page': page, 'ids': []}
    # convert pages to records for ES
    start = int(page)
    if start > 1:
        start *= 10

    q = {
        "fields": ["title", "highlight", "entities", "owner", "body"],
        "from": start,
        "query": {
            "filtered": {
                "query": {
                    "match": {
                        "file": query
                    }
                },
                "filter": {
                    "geo_bounding_box": {
                        "locs": {
                            "top_left": {
                                "lat": northeast_lat,  # top_lat,
                                "lon": southwest_lon,  # top_lon
                            },
                            "bottom_right": {
                                "lat": southwest_lat,  # bottom_lat,
                                "lon": northeast_lon,  # bottom_lon
                            }
                        }
                    }
                }
            }
        },
        "highlight": {
            "fields": {
                "file": {

                }
            },
            "pre_tags": [
                "<span class='highlight'>"
            ],
            "post_tags": [
                "</span>"
            ]
        }
    }

    raw_response = es.search(body=q, index=es_index,
                             df="file",
                             size=10)

    hits = []

    for resp in raw_response['hits']['hits']:
        # Store returned ids
        session['last_query']['ids'].append(resp['_id'])

        text = resp['fields']['body'][0]
        text = re.sub('\\n\\n', '\\n', text)
        text = re.sub('\\n', '<br>', text)

        if is_owner(resp['fields']['owner'][0]):
            # Flatten structure for individual hits
            hits.append({'id': resp['_id'],
                         'title': resp['fields']['title'][0],
                         'highlight': resp['highlight']['file'][0],
                         'permissions': True,
                         'body': text
                         })
        else:
            hits.append({'id': resp['_id'],
                         'title': resp['fields']['title'][0],
                         'permissions': False
                         })

    results = {
        'hits': hits,
        'took': float(raw_response['took']) / 1000,
        'total': "{:,}".format(raw_response['hits']['total']),
        'total_int': int(raw_response['hits']['total']),
        'query': query,
        'from': int(page)
    }

    if box_only:
        return render_template('search-results-map.html', results=results)

    return render_template('search-template.html', results=results)


@uni.route('/serve_clusters', methods=['POST'])
@uni.route('/serve_clusters/<query>', methods=['POST'])
@uni.route('/serve_clusters/<query>/<page>', methods=['POST'])
# @login_required
def serve_clusters(query=None, page=None, box_only=True, dates={}, documents={}):
    if request.method == "POST":
        json_dict = request.get_json()

    if not query and not page:
        last_query = session.get('last_query', None)
        if last_query is not None:
            query, page = last_query['query'], last_query['page']
        else:
            # better error
            return abort(404)

    q = {
        "query": {
            "bool": {
                "must": [
                    {
                        "match": {
                            "file": query
                        }
                    },
                    {
                        "terms": {
                            "_id": json_dict['documents']
                        }
                    }
                ]
            }
        },
        "fields": ["title", "highlight", "entities", "owner", "date"],
        "highlight": {
            "fields": {
                "file": {
                    "number_of_fragments": 1,
                    "pre_tags": ["<span class='highlight'>"],
                    "post_tags": ["</span>"]
                }
            }
        }
    }

    raw_response = es.search(body=q, index=es_index,
                             df="file",
                             size=10)

    hits = []

    for resp in raw_response['hits']['hits']:

        # Store returned ids
        session['last_query']['ids'].append(resp['_id'])

        if is_owner(resp['fields']['owner'][0]):
            # Flatten structure for individual hits
            hits.append({'id': resp['_id'],
                         'title': resp['fields']['title'][0],
                         'highlight': resp['highlight']['file'][0],
                         'permissions': True
                         })
        else:
            hits.append({'id': resp['_id'],
                         'title': resp['fields']['title'][0],
                         'permissions': False
                         })

    results = {
        'hits': hits,
        'took': float(raw_response['took']) / 1000,
        'total': "{:,}".format(raw_response['hits']['total']),
        'total_int': int(raw_response['hits']['total']),
        'query': query,
        'from': int(page)
    }

    if box_only:
        return render_template('search-results-box.html', results=results)

    return render_template('search-template.html', results=results)


@uni.route('/serve_timeline', methods=['POST'])
@uni.route('/serve_timeline/<query>', methods=['POST'])
@uni.route('/serve_timeline/<query>/<page>', methods=['POST'])
@login_required
def serve_timeline(query=None, page=None, box_only=True, dates=None):

    if dates is None:
        dates = {}

    if request.method == "POST":
        json_dict = request.get_json()
        # print(json_dict)
        # print(type(json_dict))

    dates = json_dict['dates']
    start_date = dates[0][0:10]
    end_date = dates[1][0:10]

    if start_date == end_date:
        start_date = "1973-01-01"
        end_date = "1974-01-01"
    # print(start_date, end_date)

    # print('running a new query...')

    if not query and not page:
        last_query = session.get('last_query', None)
        if last_query is not None:
            query, page = last_query['query'], last_query['page']
        else:
            # better error
            return abort(404)

    if not page:
        page = 1

    session['last_query'] = {'query': query, 'page': page, 'ids': []}
    # convert pages to records for ES
    start = int(page)
    if start > 1:
        start *= 10

    q = {
        "fields": ["title", "highlight", "entities", "owner", "date"],
        "from": start,
        "query": {
            "match": {
                "file": query
            }
        },
        "filter": {
            "range": {
                "date": {
                    "gte": start_date,
                    "lte": end_date,
                    "format": "yyyy-MM-dd"
                }
            }
        },
        "highlight": {"fields": {"file": {}},
                      "pre_tags": ["<span class='highlight'>"],
                      "post_tags": ["</span>"]
                      }
    }

    raw_response = es.search(body=q, index=es_index,
                             df="file",
                             size=10)

    # print(q)
    # print(raw_response)

    hits = []

    for resp in raw_response['hits']['hits']:

        # Store returned ids
        session['last_query']['ids'].append(resp['_id'])

        if is_owner(resp['fields']['owner'][0]):
            # Flatten structure for individual hits
            hits.append({'id': resp['_id'],
                         'title': resp['fields']['title'][0],
                         'highlight': resp['highlight']['file'][0],
                         'permissions': True
                         })
        else:
            hits.append({'id': resp['_id'],
                         'title': resp['fields']['title'][0],
                         'permissions': False
                         })

    results = {
        'hits': hits,
        'took': float(raw_response['took']) / 1000,
        'total': "{:,}".format(raw_response['hits']['total']),
        'total_int': int(raw_response['hits']['total']),
        'query': query,
        'from': int(page)
    }

    if box_only:
        return render_template('search-results-box.html', results=results)

    return render_template('search-template.html', results=results)


@uni.route('/viz/<query>')
@login_required
def viz_endpoint(query):
    # url = '{}/_search'.format(es_path)
    q = {
        "_source": ["entity"],
        "fields": ["entities", "title"],
        "query": {
            "match": {
                "file": query
            }
        },
        "size": 150
    }

    r = es.search(body=q, index=es_index)
    data = r['hits']['hits']
    graph = document_graph(data)
    return json.dumps(graph)


@uni.route('/viz_latest')
@login_required
def viz_latest():
    last_query = session.get('last_query', None)
    if last_query is not None:
        return viz_endpoint(last_query['query'])


@uni.route('/wc_latest')
@login_required
def wc_latest():
    last_query = session.get('last_query', None)
    if last_query is not None:
        return wc(last_query['query'])


@uni.route('/url_list')
@uni.route('/url_list/<query>')
@login_required
def url_fetch(query=""):
    if not query:
        last_query = session.get('last_query', None)
        if last_query is not None:
            query = session['last_query']['query']
    stopset = set(stopwords.words('english'))
    q = {
        "fields": ["file"],
        "query": {
            "term": {"file": query}
        }
    }
    r = es.search(body=q, index=es_index)
    data = r['hits']['hits']
    urls = []
    pn = []
    for doc in data:
        urls.append(re.findall(r'(https?://[^\s]+)', doc['fields']['file'][0]))
        try:
            for match in phonenumbers.PhoneNumberMatcher(doc['fields']['file'][0], region=None):
                pn.append({'number': phonenumbers.format_number(match.number, phonenumbers.PhoneNumberFormat.E164),
                           'location': geocoder.description_for_number(match.number, "en")})
        except KeyError:
            pass
    urls = filter(lambda x: x != [], urls)
    # urls_flat=reduce(lambda x,y: x.extend(y),urls)
    urls_flat = [item for sublist in urls for item in sublist]
    return json.dumps({'urls': dict(Counter(urls_flat)), 'pn': pn})


@uni.route('/wordcloud/<query>')
@login_required
def wc(query):
    stop_words = set(stopwords.words('english'))
    # generating a corpus specific stopword list
    stopset_state_specific = {'review', 'na', 'declassifiedreleased', 'review', 'unclassified', 'confidential',
                              'secret', 'disposition', 'released', 'approved', 'document', 'classification',
                              'restrictions', 'state', 'department', 'date', 'eo', 'handling'}
    stop_set = stop_words.union(stopset_state_specific)
    q = {
        "fields": ["file", "body"],  # added body to query
        "query": {
            "match": {
                "file": query
            }
        }
    }
    r = es.search(body=q, index=es_index)
    # switched to return 'body' instead of 'file':
    # 'body' is the portion of the 'file' that has been regex'd by the uploader
    # to include the most relevant information (e.g. excluding headers)
    data = r['hits']['hits'][0]['fields']['body'][0]
    # no_white = re.sub('\s', ' ', data)
    # updated to disallow numbers from the wordcloud
    no_white = re.sub(r'[^A-Za-z\s]', '', data)
    w_c = dict(Counter(word_tokenize(no_white)))
    frequency = []
    for k, v in w_c.iteritems():
        frequency.append(dict({"text": k, "size": v * 3}))
    frequency = filter(lambda x: x['size'] > 3 and x['text'].lower() not in stop_set, frequency)
    return json.dumps(frequency)


# @uni.route('/topicmodel')
# @uni.route('/topicmodel/<query>')
# @login_required
# def tm(query):
#     # count_vectorizer.fit_transform(train_set)
#     # print("Vocabulary:", count_vectorizer.vocabulary)
#     # Vocabulary: {'blue': 0, 'sun': 1, 'bright': 2, 'sky': 3}
#     # freq_term_matrix = count_vectorizer.transform(test_set)
#     # print(freq_term_matrix.todense())
#     stopset = set(stopwords.words('english'))
#
#     # url = '{}/_search'.format(es_path)
#     q = {
#         "fields": ["file"],
#         "query": {
#             "term": {"file": query}
#         }
#     }
#
#     return json.dumps(topic_words[0])


@uni.route('/<doc_id>/related')
@login_required
def more_like_this(doc_id):
    """
    Returns similar documents
    :param doc_id:
    :return:
    """
    q = {
        "fields": ["title"],
        "query": {
            "more_like_this": {
                "docs": [
                    {
                        "_index": "dossiers",
                        "_type": "attachment",
                        "_id": doc_id
                    }]
            }
        },
        "size": 10
    }

    response = es.search(body=q, index=es_index)
    results = {'results': []}
    try:
        for r in response['hits']['hits']:
            results['results'].append({
                'id': r['_id'],
                'name': r['fields']['title'][0]
            })
    except (KeyError, IndexError):
        pass

    return jsonify(results)


@uni.route('/index.html')
@login_required
def reroute_index():
    return redirect(url_for('.root'))


@uni.route('/register', methods=['POST'])
@login_required
def handle_registration():
    if not current_user.moderator:
        return redirect(url_for('.root'))

    email = request.form['email']
    password = request.form['password']

    # Change this to: current user's group
    organization = current_user.organization

    pw_hashed = flask_bcrypt.generate_password_hash(password)
    new_user = User(email=email,
                    password=pw_hashed,
                    organization=organization)

    db.session.add(new_user)
    db.session.commit()

    return redirect(url_for('.root'))


######################################
# Registration blueprint:
######################################

@uni.route("/login", methods=["GET", "POST"])
def login():
    if request.method == 'GET':
        return render_template("/user-login.html")

    email = request.form["email"]
    password = request.form["password"]
    user = User.query.filter_by(email=email).first()
    if user and flask_bcrypt.check_password_hash(user.password,
                                                 password):
        if login_user(user):
            return redirect(url_for('.root'))
        else:
            flash("Invalid email or password")

    return render_template("/user-login.html")


@uni.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('.login'))


@login_manager.unauthorized_handler
def login_redirect():
    return redirect(url_for('.login'))


@login_manager.user_loader
def load_user(userid):
    return User.query.get(userid)


def is_owner_of_doc(doc):
    """
    Function for checking document ownership.
    SINCE WE ARE KEEPING ACCESS CONTROL SIMPLE, WE ARE DEFAULTING THIS TO TRUE
    :param str doc: A specific document ID
    :return bool: whether the document's owner matches the current owner
    """
    # owner = es.get(index=es_index, doc_type='attachment', id=doc, fields='owner')['fields']['owner'][0]
    # return is_owner(owner)
    return True


def is_owner(org):
    """
    Function for checking if a user's org has ownership rights
    SINCE WE ARE KEEPING ACCESS CONTROL SIMPLE, WE ARE DEFAULTING THIS TO TRUE
    :param str org: An organization
    :return bool: whether the organization matches the current user or the group of admins
    """
    return True
    # return current_user.organization.organization == 'admins' or current_user.organization.organization == org


@app.errorhandler(403)
def permission_denied(e):
    return render_template('permission-denied.html'), 403
