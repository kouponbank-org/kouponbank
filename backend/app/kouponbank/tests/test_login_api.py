import json

from rest_framework import status
from rest_framework.test import APIClient, APITestCase


class LoginAPITest(APITestCase):
    test_user = {
        "username": "Test Username",
        "email": "kouponbank@gmail.com",
        "password": "Test Password"
    }
    test_owner = {
        "username": "Test Username",
        "email": "kouponbank@gmail.com",
        "password": "Test Password"
    }
    
    def setUp(self):
        self.client = APIClient()

    def test_user_post(self):
        """Tests POST at /login/user/"""
        create_user_response = self.client.post(
            "/users/",
            self.test_user,
            format="json"
        )
        self.assertEqual(create_user_response.status_code, status.HTTP_201_CREATED)
        login_response = self.client.post(
            "/login/user/",
            self.test_user,
            format="json"
        )
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        for key in json.loads(login_response.content).keys():
            if key != "id":
                self.assertEqual(json.loads(login_response.content)[key], self.test_user[key])
            
    def test_user_post_fail(self):
        """Tests POST at /login/user/ with bad body"""
        create_user_response = self.client.post(
            "/users/",
            self.test_user,
            format="json"
        )
        self.assertEqual(create_user_response.status_code, status.HTTP_201_CREATED)
        login_response = self.client.post(
            "/login/user/",
            {"username": self.test_user["username"], "email": self.test_user["email"], "password": ""},
            format="json"
        )
        self.assertEqual(login_response.status_code, status.HTTP_404_NOT_FOUND)


    def test_owner_post(self):
        """Tests POST at /login/owner/"""
        create_owner_response = self.client.post(
            "/owners/",
            self.test_owner,
            format="json"
        )
        self.assertEqual(create_owner_response.status_code, status.HTTP_201_CREATED)
        login_response = self.client.post(
            "/login/owner/",
            self.test_owner,
            format="json"
        )
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        for key in json.loads(login_response.content).keys():
            if key != "id":
                self.assertEqual(json.loads(login_response.content)[key], self.test_owner[key])
            
    def test_owner_post_fail(self):
        """Tests POST at /login/owner/ with bad body"""
        create_owner_response = self.client.post(
            "/owners/",
            self.test_owner,
            format="json"
        )
        self.assertEqual(create_owner_response.status_code, status.HTTP_201_CREATED)
        login_response = self.client.post(
            "/login/owner/",
            {"username": self.test_user["username"], "email": self.test_user["email"], "password": ""},
            format="json"
        )
        self.assertEqual(login_response.status_code, status.HTTP_404_NOT_FOUND)
