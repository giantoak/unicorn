import sys
import os
import unittest
from mock import MagicMock, patch
import json
sys.path.append(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__))))
import app
from app.config import admin_username, admin_password
import base64


class TestViews(unittest.TestCase):
    def setUp(self):
        self.app = app.app.test_client()

    def open_with_auth(self, url, method, **args):
        return self.app.open(url,
            method=method,
            headers={
                'Authorization': 'Basic ' + base64.b64encode(admin_username + \
                ":" + admin_password)
            },
            **args
        )
    
    def test_empty_search_no_session(self):
        result = self.open_with_auth('/search', 'get')
        self.assertEqual(result.status_code, 404, msg=result.status)

    def test_no_page_search(self):
        def spoof_search_results(**args):
            ''' Return a known result '''
            return {}
            
        with patch('app.Elasticsearch.search', 
                MagicMock(return_value=spoof_search_results)) as MockES:
            result = self.open_with_auth('/search/test', 'get')
            self.assertEqual(result.status_code, 200,
                    msg='This test fails because it is incompletely written')
    

if __name__ == '__main__':
    unittest.main()
