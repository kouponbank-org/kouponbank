from django.db import models
from rest_framework import serializers

from kouponbank.database.user_detail import UserDetail, UserDetailSerializer


class User(models.Model):
    username = models.CharField(max_length=50, unique=True, default="")
    password = models.CharField(max_length=50, unique=False, default="")
    email = models.CharField(max_length=50, unique=True, default="")

class UserSerializer(serializers.ModelSerializer):
    user_detail = UserDetailSerializer(source="user_details", read_only=True)

    class Meta:
        model = User
        fields = ("username", "password", "email", "user_detail")

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        UserDetail.objects.create(
            user=user,
            name="",
            gender="",
        )

        return user
