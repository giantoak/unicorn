import networkx as nx
from networkx.readwrite import json_graph
from itertools import combinations

def make_graph(data):
    ''' Given elasticsearch search results that contain the fields
    `entities` and `title`, return a network graph
    '''
    g=nx.Graph()
    for hits in data['hits']['hits']:
        temp=[]
        try:
            for entity in hits['fields']['entities']:
                temp.append(entity)
                g.add_node(entity,{"origin":hits['fields']['title'][0]})
            edges=combinations(temp,2)
            g.add_edges_from(list(edges))
        except KeyError:
            pass
    return json_graph.node_link_data(g)
