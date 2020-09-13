import uuid

from django.db import models
from rest_framework import serializers


def upload_to(instance, filename):
    return '/'.join([str(instance.owner.username), filename])

class OwnerDetail(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.OneToOneField(
        to="kouponbank.Owner",
        on_delete=models.CASCADE,
        related_name="owner_details"
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

class OwnerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OwnerDetail
        fields = (
            "id",
            "name",
            "gender",
            "birthday",
            "location",
            "profile_picture"
        )
