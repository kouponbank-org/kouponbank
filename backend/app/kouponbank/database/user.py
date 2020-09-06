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
        #user_detail_data = validated_data.pop('user_detail')
        user = User.objects.create(**validated_data)
        UserDetail.objects.create(
            user=user,
            name="",
            gender="",
        )
        #for user_detail in user_detail_data:
        #    UserDetail.objects.create(user=user, **user_detail)

        return user

    # def update(sef, instance, validated_data):
    #     user_detail_data = validated_data.pop('user_detail')
    #     user_detail = (instance.user_detail).all()
    #     user_detail = list(user_detail)
    #     instance.
