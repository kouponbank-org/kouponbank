# pylint: disable=import-error
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
        related_name="owner_detail",
        blank=True,
        null=True
    )
    name = models.CharField(max_length=50, default="", blank=True)
    gender = models.CharField(max_length=50, default="")
    birthday = models.CharField(max_length=50, default="")
    address = models.CharField(max_length=50, default="", blank=True)
    cell_number = models.CharField(max_length=20, default="", blank=True)
    owner_picture = models.ImageField(
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
            "address",
            "cell_number",
            "owner_picture"
        )
