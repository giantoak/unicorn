import sys
import os
import unittest
from mock import MagicMock, patch
# import simplejson as json
sys.path.append(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__))))
import app
from app.config import db_conn_str
import base64
import sqlalchemy

class TestConnections(unittest.TestCase):
    def setUp(self):
        self.app = app.app.test_client()
    
    def test_conn(self):
        ''' Only passes if the connection can be made '''
        engine = sqlalchemy.create_engine(db_conn_str)
        connection = engine.connect()
        connection.close()
    
if __name__ == '__main__':
    unittest.main()
