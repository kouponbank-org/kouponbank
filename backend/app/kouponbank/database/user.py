# pylint: disable=import-error
import uuid

from django.db import models
from kouponbank.database.business import Business
from kouponbank.database.user_detail import UserDetail, UserDetailSerializer
from rest_framework import serializers


class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    favorite_businesses = models.ManyToManyField(Business, blank=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    email = models.EmailField(max_length=254, unique=True)

class UserSerializer(serializers.ModelSerializer):
    user_detail = UserDetailSerializer(read_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "user_detail",
            "favorite_businesses",
            "username",
            "password",
            "email",
        )
