import uuid

from django.db import models
from rest_framework import serializers

class Address(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    business = models.OneToOneField(
        to="kouponbank.Business",
        on_delete=models.CASCADE,
        related_name="business_address",
        null=True,
        blank=True,
    )
    roadAddr= models.TextField(unique=True)
    jibunAddr = models.TextField(unique=True)
    zipNo = models.CharField(max_length=5)
    entX = models.TextField(unique=True)
    entY = models.TextField(unique=True)

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = (
            "roadAddr",
            "jibunAddr",
            "zipNo",
            "entX",
            "entY"
        )