import json

from rest_framework import status
from rest_framework.test import APIClient, APITestCase


class BusinessAPITest(APITestCase):
    test_owner = {
        "username": "Test Username",
        "email": "kouponbank@gmail.com",
        "password": "Test Password"
    }
    test_business = {
        "business_name": "Test Business",
        "business_email": "info@kouponbank.com",
        "description": "Some Long Description Here",
        "location": "Seoul, Korea",
    }

    def setUp(self):
        self.client = APIClient()
        self.owner_response = self.client.post(
            "/owners/",
            self.test_owner,
            format="json"
        )
        self.owner_id = json.loads(self.owner_response.content)['id']
        self.owner_url = f"/owners/{self.owner_id}/detail"

    def test_get(self):
        """Tests GET at /business/<uuid:business_id>/"""
        post_response = self.client.post(
            f"{self.owner_url}/business/",
            self.test_business,
            format="json"
        )
        get_response = self.client.get(
            f"{self.owner_url}/business/{json.loads(post_response.content)['id']}/"
        )
        self.assertEqual(post_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(get_response.status_code, status.HTTP_200_OK)
        
    def test_get_invalid_id(self):
        """Tests GET at /business/<uuid:business_id>/ with invalid id"""
        get_response = self.client.get(f"{self.owner_url}/business/0/")
        self.assertEqual(get_response.status_code, status.HTTP_404_NOT_FOUND)
        
    def test_get_all(self):
        """Tests GET at /business/"""
        get_response = self.client.get(f"{self.owner_url}/business/")
        self.assertEqual(json.loads(get_response.content), [])

    def test_post(self):
        """Tests POST at /business/"""
        post_response = self.client.post(
            f"{self.owner_url}/business/",
            self.test_business,
            format="json"
        )
        response = json.loads(post_response.content)
        self.assertEqual(response['business_name'], self.test_business['business_name'])

    def test_post_invalid_request(self):
        """Tests POST at /business/ with invalid request body"""
        post_response = self.client.post(
            f"{self.owner_url}/business/",
            {},
            format="json"
        )
        self.assertEqual(post_response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_put(self):
        """Tests PUT at /business/<uuid:business_id>/"""
        updated_business = {
            "business_name": "Updated Business",
            "business_email": "sahn1998@gmail.com",
            "description": "Updated Long Description Here",
            "location": "Incheon, Korea",
        }
        post_response = self.client.post(
            f"{self.owner_url}/business/",
            self.test_business,
            format="json"
        )
        updated_business['id'] = json.loads(post_response.content)['id']
        put_response = self.client.put(
            f"{self.owner_url}/business/{json.loads(post_response.content)['id']}/", 
            updated_business,
            format="json"
        )
        for key in json.loads(post_response.content).keys():
            if key == "id":
                self.assertEqual(
                    json.loads(post_response.content)[key],
                    json.loads(put_response.content)[key]
                )
            elif key == "business_name":
                self.assertNotEqual(
                    json.loads(post_response.content)[key],
                    json.loads(put_response.content)[key]
                )
    
    def test_put_invalid_id(self):
        """Tests PUT at /business/<uuid:business_id>/ with invalid business_id"""
        updated_business = {
            "business_name": "Updated Business",
            "business_email": "sahn1998@gmail.com",
            "description": "Updated Long Description Here",
            "location": "Incheon, Korea",
        }
        put_response = self.client.put(
            f"{self.owner_url}/business/0/", 
            updated_business,
            format="json"
        )
        self.assertEqual(put_response.status_code, status.HTTP_404_NOT_FOUND)

    def test_put_invalid_request(self):
        """Tests PUT at /business/<uuid:business_id>/ with invalid request body"""
        post_response = self.client.post(
            f"{self.owner_url}/business/",
            self.test_business,
            format="json"
        )
        put_response = self.client.put(
            f"{self.owner_url}/business/{json.loads(post_response.content)['id']}/", 
            {},
            format="json"
        )
        self.assertEqual(put_response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete(self):
        """Tests DELETE at /business/<uuid:business_id>/"""
        post_response = self.client.post(
            f"{self.owner_url}/business/",
            self.test_business,
            format="json"
        )
        delete_response = self.client.delete(
            f"{self.owner_url}/business/{json.loads(post_response.content)['id']}/"
        )
        self.assertEqual(delete_response.status_code, status.HTTP_204_NO_CONTENT)
        get_response = self.client.get(
            f"{self.owner_url}/business/{json.loads(post_response.content)['id']}/"
        )
        self.assertEqual(get_response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_invalid_id(self):
        """Tests DELETE at /business/<uuid:business_id>/ with invalid id"""
        delete_response = self.client.delete(f"{self.owner_url}/business/0/")
        self.assertEqual(delete_response.status_code, status.HTTP_404_NOT_FOUND)
