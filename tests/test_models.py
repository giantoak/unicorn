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


class TestModels(unittest.TestCase):
    def setUp(self):
        self.app = app.app.test_client()

        raise NotImplemented('Do these tests')

if __name__ == '__main__':
    unittest.main()
