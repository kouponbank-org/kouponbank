import json

from rest_framework import status
from rest_framework.test import APIClient, APITestCase


class CouponBasketAPITest(APITestCase):
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
    test_business = {
        "business_name": "Test Business",
        "business_email": "info@kouponbank.com",
        "description": "Some Long Description Here",
        "location": "Seoul, Korea",
    }
    test_coupon = {
        "coupon_title": "Test Coupon",
        "description": "Some Short Description Here",
        "coupon_code": "KouponBank",
    }

    def setUp(self):
        self.client = APIClient()
        # creating user instance
        self.user_response = self.client.post(
            "/users/",
            self.test_user,
            format="json"
        )
        self.user_id = json.loads(self.user_response.content)['id']
        # creating owner instance
        self.owner_response = self.client.post(
            "/owners/",
            self.test_owner,
            format="json"
        )
        self.owner_id = json.loads(self.owner_response.content)['id']
        # creating business instance
        self.business_response = self.client.post(
            f"/owners/{self.owner_id}/detail/business/",
            self.test_business,
            format="json"
        )
        self.business_id = json.loads(self.business_response.content)['id']
        # creating coupon instance
        self.coupon_response = self.client.post(
            f"/owners/{self.owner_id}/detail/business/{self.business_id}/coupon/",
            self.test_coupon,
            format="json"
        )
        self.coupon_id = json.loads(self.coupon_response.content)['id']
        # creating base test case for coupon
        self.test_coupon_basket = {
            "coupon_id": self.coupon_id,
            "business_key": self.business_id,
            "business_name": self.test_business['business_name'],
            "coupon_code": self.test_coupon['coupon_code'],
            "coupon_title": self.test_coupon['coupon_title']
        }
        self.users_url = f"/users/{self.user_id}"

    def test_get(self):
        """Tests GET at /couponbasket/<uuid:coupon_id>/"""
        post_response = self.client.post(
            f"{self.users_url}/couponbasket/",
            self.test_coupon_basket,
            format="json"
        )
        get_response = self.client.get(
            f"{self.users_url}/couponbasket/{json.loads(post_response.content)['coupon_id']}/"
        )
        self.assertEqual(post_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(get_response.status_code, status.HTTP_200_OK)
        
    def test_get_invalid_id(self):
        """Tests GET at /couponbasket/<uuid:coupon_id>/ with invalid id"""
        get_response = self.client.get(f"{self.users_url}/couponbasket/0/")
        self.assertEqual(get_response.status_code, status.HTTP_404_NOT_FOUND)
        
    def test_get_all(self):
        """Tests GET at /couponbasket/"""
        get_response = self.client.get(f"{self.users_url}/couponbasket/")
        self.assertEqual(json.loads(get_response.content), [])

    def test_post(self):
        """Tests POST at /couponbasket/"""
        post_response = self.client.post(
            f"{self.users_url}/couponbasket/",
            self.test_coupon_basket,
            format="json"
        )
        response = json.loads(post_response.content)
        self.assertEqual(response['coupon_title'], self.test_coupon_basket['coupon_title'])

    def test_post_invalid_request(self):
        """Tests POST at /couponbasket/ with invalid request body"""
        post_response = self.client.post(
            f"{self.users_url}/couponbasket/",
            {},
            format="json"
        )
        self.assertEqual(post_response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete(self):
        """Tests DELETE at /couponbasket/<uuid:coupon_id>/"""
        post_response = self.client.post(
            f"{self.users_url}/couponbasket/",
            self.test_coupon_basket,
            format="json"
        )
        delete_response = self.client.delete(
            f"{self.users_url}/couponbasket/{json.loads(post_response.content)['coupon_id']}/"
        )
        self.assertEqual(delete_response.status_code, status.HTTP_204_NO_CONTENT)
        get_response = self.client.get(
            f"{self.users_url}/couponbasket/{json.loads(post_response.content)['coupon_id']}/"
        )
        self.assertEqual(get_response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_invalid_id(self):
        """Tests DELETE at /couponbasket/<uuid:coupon_id>/ with invalid id"""
        delete_response = self.client.delete(f"{self.users_url}/couponbasket/0/")
        self.assertEqual(delete_response.status_code, status.HTTP_404_NOT_FOUND)
