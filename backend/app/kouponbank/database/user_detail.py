from django.db import models
from rest_framework import serializers


def upload_to(instance, filename):
    return '/'.join([str(instance.user.username), filename])

class UserDetail(models.Model):
    user = models.OneToOneField(
        to="kouponbank.User",
        on_delete=models.CASCADE,
        related_name="user_details"
    )
    name = models.CharField(max_length=20, default="", blank=True)
    gender = models.CharField(max_length=50, default="", blank=True)
    birthday = models.CharField(max_length=50, default="", blank=True)
    location = models.CharField(max_length=50, default="", blank=True)
    profile_picture = models.ImageField(
        upload_to=upload_to,
        blank=True,
        null=True
    )

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetail
        fields = (
            "name",
            "gender",
            "birthday",
            "location",
            "profile_picture"
        )
