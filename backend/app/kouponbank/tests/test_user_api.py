from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory

from kouponbank.database.user import User


# Create your tests here.
class UserModelTest(TestCase):
    def setUpTestData(self):
