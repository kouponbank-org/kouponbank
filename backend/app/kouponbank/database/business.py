# pylint: disable=import-error
import uuid

from django.db import models
from rest_framework import serializers

from kouponbank.database.business_detail import BusinessDetail
from kouponbank.database.owner import Owner
from kouponbank.database.address import Address
from kouponbank.database.business_verification import BusinessVerification

class Business(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(
        Owner,
        on_delete=models.CASCADE,
        related_name="owner_business",
        null=True,
        blank=True,
    )
    business_name = models.CharField(max_length=50)
    business_number = models.CharField(max_length=50, blank=True)
    business_description = models.TextField(blank=True)

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = (
            "id",
            "business_name",
            "business_number",
            "business_description",
        )

    def create(self, validated_data):
        business = Business.objects.create(**validated_data)
        BusinessVerification.objects.create(
            id=business.id,
            business=business,
            verified_business=False,
            verified_owner=False,
            verified_email=False,
        )
        
        return business
