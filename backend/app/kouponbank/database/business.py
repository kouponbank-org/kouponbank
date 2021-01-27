# pylint: disable=import-error
import uuid

from django.db import models
from kouponbank.database.address import AddressSerializer
from kouponbank.database.business_detail import BusinessDetailSerializer
from kouponbank.database.business_verification import BusinessVerification
from kouponbank.database.owner import Owner
from rest_framework import serializers


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
    business_number = models.CharField(max_length=50)
    business_description = models.TextField()

class BusinessSerializer(serializers.ModelSerializer):
    business_address = AddressSerializer(read_only=True)
    business_detail = BusinessDetailSerializer(read_only=True)

    class Meta:
        model = Business
        fields = (
            "id",
            "business_address",
            "business_detail",
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
