from elasticsearch import helpers, Elasticsearch
from iterate_search import iterate_over_query

es = Elasticsearch(timeout=10000)
import csv
from collections import defaultdict
# Read and prepare dictionary of entities
entities = {}
with open('pathfinder.csv', 'rb') as f:
    reader = csv.reader(f)
    h = {x: i for i, x in enumerate(next(reader))}
    for row in reader:
        # Lowercase all
        entities[row[h['Entity 1 Name']]] = row[h['Entity 1 Type']]
        entities[row[h['Entity 2 Name']]] = row[h['Entity 2 Type']]

del entities['Unknown']
out = open('entity_list.csv', 'wb')
w = csv.writer(out)
for e, t in entities.iteritems():
    w.writerow([e, t])

out.close()

it = iterate_over_query('*', fields='file')

# Contains entities found in each group
doc_entities = defaultdict(list)

for i, row in enumerate(it):
    # Raw text
    doc_id = row['_id']
    try:
        raw_text = row['fields']['file'][0].lower()
    except KeyError:
        # No file found
        continue

    # Look for entity matches inside text:
    for entity in entities:
        if entity.lower() in raw_text:
            doc_entities[doc_id].append(entity)

out = open('doc_entities.csv', 'wb')
w = csv.writer(out)
actions = []
for doc_id, ents in doc_entities.iteritems():
    action_entities = []
    for e in ents:
        action_entities.append({
                    'entity': e,
                    'category': entities[e]
                    })

    action = {
            '_op_type': 'update',
            '_index': 'dossiers',
            '_type': 'attachment',
            '_id': doc_id,
            'doc': {'entity': action_entities}
            }
    
    actions.append(action)
    w.writerow([doc_id, entities])

results = helpers.bulk(es, actions, index='dossiers', doc_type='attachment')
print results
