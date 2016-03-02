import networkx as nx
from networkx.readwrite import json_graph
from itertools import combinations


def document_graph(hits):
    """
    Given elasticsearch search results that contain the _source
    `entity` that contains `entity` and `category`, return a graph
    where edges connect nodes of two types: `document` and `entity`

    Documents will have attributes:
        - `id`, the document ID (primary key)
        - `title`, the document filename

    Entities will have attributes:
        - `entity`, the entity (primary key)
        - `category`, the entity type

    """
    
    # Create a graph that has two types of nodes:
    #   - documents
    #   - entities
    g = nx.Graph()

    for hit in hits:
        # Sane names for elasticsearch objects
        _id = hit['_id']
        title = hit['fields']['title'][0]
        try:
            sources = hit['_source']['entity']
        except KeyError:
            # Result has no entities
            continue
        
        edges = {x['entity']: x['category'] for x in sources}

        # Create node for the new document
        g.add_node(_id, dict(
            type = 'document',
            title = title))
        
        for ent in edges:
            # Add previously unseen entities as nodes
            if ent not in g:
                g.add_node(ent, dict(
                    type = 'entity',
                    category=edges[ent]))

            # Link entity node with current doc node
            g.add_edge(_id, ent)
    
    js = json_graph.node_link_data(g)
    js['adj'] = g.adj
    return js


def make_graph(data):
    """
    Given elasticsearch search results that contain the _source
    `entity` that contains `entity` and `category`, return a graph
    that has connections between all the entities in a given result set,
    and connections across these results.
    """
    g = nx.Graph()
    
    for hits in data['hits']['hits']:
        temp=[]
        try:
            for entity in hits['_source']['entity']:
                temp.append(entity['entity'])
                g.add_node(entity['entity'], 
                        dict(origin=hits['fields']['title'][0]))

            edges = combinations(temp, 2)
            g.add_edges_from(list(edges))
        except KeyError:
            continue

    return json_graph.node_link_data(g)
