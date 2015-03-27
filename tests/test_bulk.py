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

from app.bulk import bulk_search

class TestUtils(unittest.TestCase):
    def setUp(self):
        self.app = app.app.test_client()
        raise NotImplemented

    def open_with_auth(self, url, method, **args):
        return self.app.open(url,
            method=method,
            headers={
                'Authorization': 'Basic ' + base64.b64encode(admin_username + \
                ":" + admin_password)
            },
            **args
        )
    
    def test_no_page_search(self):
        def spoof_es_search(**args):
            ''' Return a known result '''
            res = {u'hits': {u'hits': [{u'_score': 0.3063939, u'_type': u'attachment', u'_id': u'AUwKEjtBxAizi9IbDC4C', u'fields': {u'entities': [u'Eliot NAVINGA Amado', u'Isaac COSSA Abel COSSA', u'FSReport', u'Sandra Snelling', u'MOZAMBIQUE', u'SANDRA', u'Isaac MASHABA Juunho COSSA'], u'title': [u'SAN-076-2013_-_OPS_LEBOMBO.pdf']}, u'_index': u'dossiers'}, {u'_score': 0.29403955, u'_type': u'attachment', u'_id': u'AUwKEfdVxAizi9IbDC2w', u'fields': {u'title': [u'SAN-141-2014_-_SSA_REPORT.doc']}, u'_index': u'dossiers'}, {u'_score': 0.2530809, u'_type': u'attachment', u'_id': u'AUwKGNV-xAizi9IbDC9G', u'fields': {u'entities': [u'Mafikeng', u'Manyana Game Reserve', u'InfoReports', u'Chocoe', u'ECI', u'Magude', u'Mozambique', u'Tembisa', u'Tony', u'Zachariah Chauke'], u'title': [u'MSP-026-2013_-_PLANNED_POACHING_IN_MAFIKENG.docx']}, u'_index': u'dossiers'}, {u'_score': 0.24760365, u'_type': u'attachment', u'_id': u'AUwKEiQoxAizi9IbDC3p', u'fields': {u'entities': [u'ECI Phalaborwa', u'Shivuri', u'Bruce Lesley', u'PGH', u'Mahalati', u'Dindani', u'Ken Maggs', u'Shimangi', u'Eric Mashele', u'Mbombi', u'Mashava', u'Toyota', u'John Hlungwani', u'Sandra Snelling', u'Hlungwani', u'Vincent Mashava', u'Sabastiou Mbombi', u'Muchavi', u'South Africa', u'Jantare Mbombi', u'Diva Mashele', u'Mozambique', u'Eric'], u'title': [u'SAN-109-2014_-_POACHING_GROUP_WITH_INSIDE_CONTACTS.docx']}, u'_index': u'dossiers'}, {u'_score': 0.24545994, u'_type': u'attachment', u'_id': u'AUwKHS7_xAizi9IbDDA5', u'fields': {u'title': [u'MBS_Spreadsheet_the_Remix.xls']}, u'_index': u'dossiers'}, {u'_score': 0.23860697, u'_type': u'attachment', u'_id': u'AUwKGOkPxAizi9IbDC9x', u'fields': {u'title': [u'MSP-048-2014_-_RAFIC.doc']}, u'_index': u'dossiers'}, {u'_score': 0.22177503, u'_type': u'attachment', u'_id': u'AUwKGeVHxAizi9IbDC-o', u'fields': {u'title': [u'SSW-034-2014_-_POWER_MNISI_-_11_AUGUST_2014.docx']}, u'_index': u'dossiers'}, {u'_score': 0.21443105, u'_type': u'attachment', u'_id': u'AUwKEjGCxAizi9IbDC35', u'fields': {u'title': [u'SAN-025-2013_-_SIBIYA_-_NTHULI.docx']}, u'_index': u'dossiers'}, {u'_score': 0.21443105, u'_type': u'attachment', u'_id': u'AUxSe6dPdwFot_assZHQ', u'fields': {u'title': [u'MSP-045-2014_-_VALITO_COSSA.doc.pdf']}, u'_index': u'dossiers'}, {u'_score': 0.21090075, u'_type': u'attachment', u'_id': u'AUwKGM-KxAizi9IbDC8x', u'fields': {u'entities': [u'SANParks', u'South Africa', u'Vietnamese', u'Vietnam', u'Mozambique', u'Nguyen Mau Chien', u'NWCRU Information Report'], u'title': [u'MSP-089-2014_-_VIETNAM_INVESTIGATION.pdf']}, u'_index': u'dossiers'}], u'total': 135, u'max_score': 0.3063939}, u'_shards': {u'successful': 25, u'failed': 0, u'total': 25}, u'took': 151, u'timed_out': False}

            return res
            
        with patch('app.Elasticsearch.search', 
                MagicMock(return_value=spoof_es_search())) as MockES:

            result = bulk_search(['one', 'two'])
            MockES.assert_called()

if __name__ == '__main__':
    unittest.main()
