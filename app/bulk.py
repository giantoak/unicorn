from config import es_index
from app import es
# import zipfile
import tablib


def bulk_search(queries):
    """

    :param list queries: List of elasticsearch queries
    :return tablib.Dataset:
    """
    data = tablib.Dataset(headers=['filename', 'id', 'query'])
    for q in queries:
        r = es.search(q=q, fields=['title'], size=100, index=es_index,
                      doc_type="attachment")
        for res in r['hits']['hits']:
            title = res['fields']['title'][0]
            _id = res['_id']
            
            data.append((title, _id, q))

    return data


def bulk_download(ids):
    """
    Construct ElasticSearch query for all files, return tablib Dataset.
    :param ids:
    :return tablib.Dataset:
    """
    data = tablib.Dataset(headers=['title', 'text'])

    for doc_id in ids:
        # Grab file for doc_id
        r = es.get(index=es_index, doc_type="attachment", id=doc_id,
                   fields=['title', 'file'])
        
        f = r['fields']
        data.append((f['title'][0], f['file'][0]))
    
    # return file
    return data
