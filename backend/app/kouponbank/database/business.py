import uuid

from django.db import models
from rest_framework import serializers


def upload_to(instance, filename):
    return '/'.join([
        str(instance.business_owner.owner.username),
        str(instance.business_name),
        filename
    ])

class Business(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    business_owner = models.ForeignKey(
        to="kouponbank.OwnerDetail",
        on_delete=models.CASCADE,
        related_name="business",
        null=True
    )
    business_name = models.CharField(max_length=50, default="")
    business_email = models.EmailField(
        max_length=254,
        unique=True,
        default="",
        blank=True,
        null=True
    )
    description = models.TextField(default="", blank=True)
    location = models.CharField(max_length=50, default="", blank=True)
    business_picture = models.ImageField(
        upload_to=upload_to,
        blank=True,
        null=True
    )

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = (
            "id",
            "business_name",
            "business_email",
            "description",
            "location",
            "business_picture"
        )
