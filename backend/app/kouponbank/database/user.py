import uuid

from django.db import models
from rest_framework import serializers

from kouponbank.database.user_detail import UserDetail, UserDetailSerializer


class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=50, unique=True, blank=False)
    password = models.CharField(max_length=50, unique=False, blank=False)
    email = models.EmailField(max_length=254, unique=True, blank=False)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "password",
            "email"
        )

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        UserDetail.objects.create(
            id=user.id,
            user=user,
            name="",
            gender="",
            birthday="",
            location=""
        )

        return user
