import json

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from kouponbank.database.owner import Owner
from kouponbank.database.owner_detail import OwnerDetail


class OwnerDetailAPITest(APITestCase):
    test_owner = {
        "username": "Test Username",
        "email": "kouponbank@gmail.com",
        "password": "Test Password"
    }
    test_owner_details = {
        "name": "Test Name",
        "gender": "Male",
        "birthday": "Test Birthday",
        "location": "Korea"
    }

    def setUp(self):
        self.client = APIClient()

    def test_get(self):
        """Tests GET at /owners/<uuid:owner_id>/details"""
        post_response = self.client.post(
            "/owners/",
            self.test_owner,
            format="json"
        )
        get_owner_response = self.client.get(
            f"/owners/{json.loads(post_response.content)['id']}/"
        )
        get_detail_response = self.client.get(
            f"/owners/{json.loads(post_response.content)['id']}/detail/"
        )
        self.assertEqual(post_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(get_owner_response.status_code, status.HTTP_200_OK)
        self.assertEqual(get_detail_response.status_code, status.HTTP_200_OK)
        
    def test_get_invalid_id(self):
        """Tests GET at /owners/<uuid:owner_id>/ with invalid id"""
        get_response = self.client.get("/owners/0/")
        self.assertEqual(get_response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_put(self):
        """Tests PUT at /owners/<uuid:owner_id>/details/"""
        post_response = self.client.post(
            "/owners/",
            self.test_owner,
            format="json"
        )
        get_response = self.client.get(
            f"/owners/{json.loads(post_response.content)['id']}/detail/"
        )
        self.test_owner_details['id'] = json.loads(post_response.content)['id']
        put_response = self.client.put(
            f"/owners/{json.loads(post_response.content)['id']}/", 
            self.test_owner_details,
            format="json"
        )
        for key in self.test_owner_details.keys():
            if key == "id":
                self.assertEqual(
                    json.loads(get_response.content)[key],
                    self.test_owner_details[key]
                )
            else:
                self.assertNotEqual(
                    json.loads(get_response.content)[key],
                    self.test_owner_details[key]
                )

    def test_put_invalid_id(self):
        """Tests PUT at /owners/<uuid:owner_id>/ with invalid owner_id"""
        put_response = self.client.put(
            "/owners/0/", 
            self.test_owner_details,
            format="json"
        )
        self.assertEqual(put_response.status_code, status.HTTP_404_NOT_FOUND)

    def test_put_invalid_request(self):
        """Tests PUT at /owners/<uuid:owner_id>/ with invalid request body"""
        post_response = self.client.post(
            "/owners/",
            self.test_owner,
            format="json"
        )
        put_response = self.client.put(
            f"/owners/{json.loads(post_response.content)['id']}/", 
            {},
            format="json"
        )
        self.assertEqual(put_response.status_code, status.HTTP_400_BAD_REQUEST)
