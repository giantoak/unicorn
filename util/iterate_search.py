from app.config import es_index
import elasticsearch


def iterate_over_query(es,
                       query,
                       index=es_index,
                       batch_size=10,
                       count=None,
                       count_args=None,
                       search_args=None,
                       fields='*'):
    """
    Uses `scroll` API to iterate over search results
    :param elasticsearch.Elasticsearch es:
    :param query:
    :param str index:
    :param int batch_size:
    :param count:
    :param dict count_args:
    :param dict search_args:
    :param fields:
    """
    if count_args is None:
        count_args = {}

    if search_args is None:
        search_args = {}

    if count is None:
        count = es.count(index=index, q=query, **count_args)['count']
    
    # Initialize scroll scan
    r = es.search(index=index,
                  doc_type='attachment',
                  q=query,
                  size=count,
                  scroll='10m',
                  search_type='scan',
                  **search_args)
    
    s = es.scroll(scroll_id=r['_scroll_id'])
    while True:
        print count, len(s['hits']['hits'])
        for result in s['hits']['hits']:
            yield result

        try:
            s = es.scroll(scroll_id=r['_scroll_id'])
        except elasticsearch.exceptions.NotFoundError:
            break
