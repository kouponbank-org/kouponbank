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
    roadAddr= models.CharField(max_length=64, unique=True, blank=False)
    jibunAddr = models.CharField(max_length=64, unique=True, blank=False)
    zipNo = models.CharField(max_length=64, blank=False)
    entX = models.CharField(max_length=64, unique=True, blank=False)
    entY = models.CharField(max_length=64, unique=True, blank=False)

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