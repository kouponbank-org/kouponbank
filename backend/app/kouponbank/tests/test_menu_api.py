import json

from rest_framework import status
from rest_framework.test import APIClient, APITestCase


# Create your tests here.
class MenuAPITest(APITestCase):
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
    test_menu = {
        "menu_title": "Test Menu",
        "description": "Some Long Description Here",
    }

    def setUp(self):
        self.client = APIClient()
        # creating owner response
        self.owner_response = self.client.post(
            "/owners/",
            self.test_owner,
            format="json"
        )
        self.owner_id = json.loads(self.owner_response.content)['id']
        # creating business responses
        self.business_response = self.client.post(
            f"/owners/{self.owner_id}/detail/business/",
            self.test_business,
            format="json"
        )
        self.business_id = json.loads(self.business_response.content)['id']
        # creating url for menu routing
        self.business_url = f"/owners/{self.owner_id}/detail/business/{self.business_id}"

    def test_get(self):
        """Tests GET at /menu/<uuid:menu_id>/"""
        post_response = self.client.post(
            f"{self.business_url}/menu/",
            self.test_menu,
            format="json"
        )
        get_response = self.client.get(
            f"{self.business_url}/menu/{json.loads(post_response.content)['id']}/"
        )
        self.assertEqual(post_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(get_response.status_code, status.HTTP_200_OK)
        
    def test_get_invalid_id(self):
        """Tests GET at /menu/<uuid:menu_id>/ with invalid id"""
        get_response = self.client.get(f"{self.business_url}/menu/0/")
        self.assertEqual(get_response.status_code, status.HTTP_404_NOT_FOUND)
        
    def test_get_all(self):
        """Tests GET at /menu/"""
        get_response = self.client.get(f"{self.business_url}/menu/")
        self.assertEqual(json.loads(get_response.content), [])

    def test_post(self):
        """Tests POST at /menu/"""
        post_response = self.client.post(
            f"{self.business_url}/menu/",
            self.test_menu,
            format="json"
        )
        response = json.loads(post_response.content)
        self.assertEqual(response['menu_title'], self.test_menu['menu_title'])

    def test_post_invalid_request(self):
        """Tests POST at /menu/ with invalid request body"""
        post_response = self.client.post(
            f"{self.business_url}/menu/",
            {},
            format="json"
        )
        self.assertEqual(post_response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_put(self):
        """Tests PUT at /menu/<uuid:menu_id>/"""
        updated_menu = {
            "menu_title": "Updated Menu",
            "description": "Some Short Description Here",
        }
        post_response = self.client.post(
            f"{self.business_url}/menu/",
            self.test_menu,
            format="json"
        )
        updated_menu['id'] = json.loads(post_response.content)['id']
        put_response = self.client.put(
            f"{self.business_url}/menu/{json.loads(post_response.content)['id']}/", 
            updated_menu,
            format="json"
        )
        for key in json.loads(post_response.content).keys():
            if key == "id":
                self.assertEqual(
                    json.loads(post_response.content)[key],
                    json.loads(put_response.content)[key]
                )
            elif key == "menu_title":
                self.assertNotEqual(
                    json.loads(post_response.content)[key],
                    json.loads(put_response.content)[key]
                )
    
    def test_put_invalid_id(self):
        """Tests PUT at /menu/<uuid:menu_id>/ with invalid menu_id"""
        updated_menu = {
            "menu_title": "Updated Menu",
            "description": "Some Short Description Here",
        }
        put_response = self.client.put(
            f"{self.business_url}/menu/0/", 
            updated_menu,
            format="json"
        )
        self.assertEqual(put_response.status_code, status.HTTP_404_NOT_FOUND)

    def test_put_invalid_request(self):
        """Tests PUT at /menu/<uuid:menu_id>/ with invalid request body"""
        post_response = self.client.post(
            f"{self.business_url}/menu/",
            self.test_menu,
            format="json"
        )
        put_response = self.client.put(
            f"{self.business_url}/menu/{json.loads(post_response.content)['id']}/", 
            {},
            format="json"
        )
        self.assertEqual(put_response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete(self):
        """Tests DELETE at /menu/<uuid:menu_id>/"""
        post_response = self.client.post(
            f"{self.business_url}/menu/",
            self.test_menu,
            format="json"
        )
        delete_response = self.client.delete(
            f"{self.business_url}/menu/{json.loads(post_response.content)['id']}/"
        )
        self.assertEqual(delete_response.status_code, status.HTTP_204_NO_CONTENT)
        get_response = self.client.get(
            f"{self.business_url}/menu/{json.loads(post_response.content)['id']}/"
        )
        self.assertEqual(get_response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_invalid_id(self):
        """Tests DELETE at /menu/<uuid:menu_id>/ with invalid id"""
        delete_response = self.client.delete(f"{self.business_url}/menu/0/")
        self.assertEqual(delete_response.status_code, status.HTTP_404_NOT_FOUND)
