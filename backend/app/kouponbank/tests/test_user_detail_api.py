import json

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from kouponbank.database.user import User
from kouponbank.database.user_detail import UserDetail


class UserDetailAPITest(APITestCase):
    test_user = {
        "username": "Test Username",
        "email": "kouponbank@gmail.com",
        "password": "Test Password"
    }
    test_user_details = {
        "name": "Test Name",
        "gender": "Male",
        "birthday": "Test Birthday",
        "location": "Korea"
    }

    def setUp(self):
        self.client = APIClient()

    def test_get(self):
        """Tests GET at /users/<uuid:user_id>/details"""
        post_response = self.client.post(
            "/users/",
            self.test_user,
            format="json"
        )
        get_user_response = self.client.get(
            f"/users/{json.loads(post_response.content)['id']}/"
        )
        get_detail_response = self.client.get(
            f"/users/{json.loads(post_response.content)['id']}/detail/"
        )
        self.assertEqual(post_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(get_user_response.status_code, status.HTTP_200_OK)
        self.assertEqual(get_detail_response.status_code, status.HTTP_200_OK)
        
    def test_get_invalid_id(self):
        """Tests GET at /users/<uuid:user_id>/ with invalid id"""
        get_response = self.client.get("/users/0/")
        self.assertEqual(get_response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_put(self):
        """Tests PUT at /users/<uuid:user_id>/details/"""
        post_response = self.client.post(
            "/users/",
            self.test_user,
            format="json"
        )
        get_response = self.client.get(
            f"/users/{json.loads(post_response.content)['id']}/detail/"
        )
        self.test_user_details['id'] = json.loads(post_response.content)['id']
        put_response = self.client.put(
            f"/users/{json.loads(post_response.content)['id']}/", 
            self.test_user_details,
            format="json"
        )
        for key in self.test_user_details.keys():
            if key == "id":
                self.assertEqual(
                    json.loads(get_response.content)[key],
                    self.test_user_details[key]
                )
            else:
                self.assertNotEqual(
                    json.loads(get_response.content)[key],
                    self.test_user_details[key]
                )

    def test_put_invalid_id(self):
        """Tests PUT at /users/<uuid:user_id>/ with invalid user_id"""
        put_response = self.client.put(
            "/users/0/", 
            self.test_user_details,
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
