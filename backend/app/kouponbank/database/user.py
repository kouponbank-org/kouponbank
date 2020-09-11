from django.db import models
from rest_framework import serializers

from kouponbank.database.user_detail import UserDetail, UserDetailSerializer


class User(models.Model):
    username = models.CharField(max_length=50, unique=True, default="")
    password = models.CharField(max_length=50, unique=False, default="")
    email = models.CharField(max_length=50, unique=True, default="")

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password", "email")

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        UserDetail.objects.create(
            user=user,
            name="",
            gender="",
            birthday="",
            location=""
        )

        return user
