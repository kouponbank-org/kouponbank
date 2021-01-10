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
    verified_business = models.BooleanField(default=False)
    verified_owner = models.BooleanField(default=False)
    verified_email = models.BooleanField(default=False)
    business_owner = models.ForeignKey(
        to="kouponbank.OwnerDetail",
        on_delete=models.CASCADE,
        related_name="business",
        null=True,
        blank=True
    )
    business_name = models.CharField(max_length=50, blank=False)
    business_email = models.EmailField(
        max_length=254,
        blank=True,
    )
    description = models.TextField(blank=True)
    business_number = models.CharField(max_length=50, blank=True)
    business_picture = models.ImageField(
        upload_to=upload_to,
        blank=True,
        null=True
    )
    roadAddr= models.CharField(max_length=64, unique=True, blank=False)
    jibunAddr = models.CharField(max_length=64, unique=True, blank=False)
    zipNo = models.CharField(max_length=64, blank=False)
    entX = models.CharField(max_length=64, unique=True, blank=False)
    entY = models.CharField(max_length=64, unique=True, blank=False)
    #business_hour = models.TimeField (blank=True, db_index=True)

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = (
            "id",
            "verified_business",
            "verified_owner",
            "verified_email",
            "business_name",
            "business_email",
            "description",
            "business_picture",
            "roadAddr",
            "jibunAddr",
            "zipNo",
            "entX",
            "entY",
        )
