import json

from rest_framework import status
from rest_framework.test import APIClient, APITestCase


class UserAPITest(APITestCase):
    test_user = {
        "username": "Test Username",
        "email": "kouponbank@gmail.com",
        "password": "Test Password"
    }

    def setUp(self):
        self.client = APIClient()

    def test_get(self):
        """Tests GET at /users/<uuid:user_id>/"""
        post_response = self.client.post(
            "/users/",
            self.test_user,
            format="json"
        )
        get_response = self.client.get(
            f"/users/{json.loads(post_response.content)['id']}/"
        )
        self.assertEqual(post_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(get_response.status_code, status.HTTP_200_OK)
        
    def test_get_invalid_id(self):
        """Tests GET at /users/<uuid:user_id>/ with invalid id"""
        get_response = self.client.get("/users/0/")
        self.assertEqual(get_response.status_code, status.HTTP_404_NOT_FOUND)
        
    def test_get_all(self):
        """Tests GET at /users/"""
        get_response = self.client.get("/users/")
        self.assertEqual(json.loads(get_response.content), [])

    def test_post(self):
        """Tests POST at /users/"""
        post_response = self.client.post(
            "/users/",
            self.test_user,
            format="json"
        )
        response = json.loads(post_response.content)
        self.assertEqual(response['username'], self.test_user['username'])

    def test_post_invalid_request(self):
        """Tests POST at /users/ with invalid request body"""
        post_response = self.client.post(
            "/users/",
            {},
            format="json"
        )
        self.assertEqual(post_response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_put(self):
        """Tests PUT at /users/<uuid:user_id>/"""
        updated_user = {
            "username": "Updated User",
            "email": "info@kouponbank.com",
            "password": "Updated Password"
        }
        post_response = self.client.post(
            "/users/",
            self.test_user,
            format="json"
        )
        updated_user['id'] = json.loads(post_response.content)['id']
        put_response = self.client.put(
            f"/users/{json.loads(post_response.content)['id']}/", 
            updated_user,
            format="json"
        )
        for key in json.loads(post_response.content).keys():
            if key == "id":
                self.assertEqual(
                    json.loads(post_response.content)[key],
                    json.loads(put_response.content)[key]
                )
            else:
                self.assertNotEqual(
                    json.loads(post_response.content)[key],
                    json.loads(put_response.content)[key]
                )
    
    def test_put_invalid_id(self):
        """Tests PUT at /users/<uuid:user_id>/ with invalid user_id"""
        updated_user = {
            "username": "Updated User",
            "email": "info@kouponbank.com",
            "password": "Updated Password"
        }
        put_response = self.client.put(
            "/users/0/", 
            updated_user,
            format="json"
        )
        self.assertEqual(put_response.status_code, status.HTTP_404_NOT_FOUND)

    def test_put_invalid_request(self):
        """Tests PUT at /users/<uuid:user_id>/ with invalid request body"""
        post_response = self.client.post(
            "/users/",
            self.test_user,
            format="json"
        )
        put_response = self.client.put(
            f"/users/{json.loads(post_response.content)['id']}/", 
            {},
            format="json"
        )
        self.assertEqual(put_response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete(self):
        """Tests DELETE at /users/<uuid:user_id>/"""
        post_response = self.client.post(
            "/users/",
            self.test_user,
            format="json"
        )
        delete_response = self.client.delete(
            f"/users/{json.loads(post_response.content)['id']}/"
        )
        self.assertEqual(delete_response.status_code, status.HTTP_204_NO_CONTENT)
        get_response = self.client.get(
            f"/users/{json.loads(post_response.content)['id']}/"
        )
        self.assertEqual(get_response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_invalid_id(self):
        """Tests DELETE at /users/<uuid:user_id>/ with invalid id"""
        delete_response = self.client.delete("/users/0/")
        self.assertEqual(delete_response.status_code, status.HTTP_404_NOT_FOUND)
