import sys
import os
import unittest
from mock import MagicMock

import app
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

class TestViews(unittest.TestCase):
    def setUp(self):
        self.app = app.app.test_client()
    
    def test_request_doc(self):
        es = MagicMock()
        es.search.return_value = True
        doc = self.app.get('/test/debug')
        assert json.loads(doc.data[0]) == True

if __name__ == '__main__':
    unittest.main()
