# pylint: disable=import-error
import uuid

from django.db import models
from rest_framework import serializers

from kouponbank.database.user_detail import UserDetail
from kouponbank.database.business import Business

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    businesses = models.ManyToManyField(Business)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50, unique=False)
    email = models.EmailField(max_length=254, unique=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "password",
            "email",
        )

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        UserDetail.objects.create(
            id=user.id,
            user=user,
            name="",
            gender="",
            birthday="",
            address="",
            cell_number="",
        )

        return user
