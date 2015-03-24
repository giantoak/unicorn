import sys
import os
import unittest
from mock import MagicMock, patch
import json
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
import app

class TestViews(unittest.TestCase):
    def setUp(self):
        self.app = app.app.test_client()
    
    def test_search_called(self, search):
        q = {
            "fields" : ["entities","title"],
            "query" : {
                "term" : { "file" : "test" }
                }
            }

        
        with patch('app.Elasticsearch') as mock:
            result = self.app.get('/viz/test')
            mock().search.assert_called_with(body=json.dumps(q), index='dossiers')


if __name__ == '__main__':
    unittest.main()
