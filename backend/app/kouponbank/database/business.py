import uuid

from django.db import models
from rest_framework import serializers

class Business(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(
        to="kouponbank.Owner",
        on_delete=models.CASCADE,
        related_name="owner_business",
        null=True,
        blank=True,
    )
    user = models.ForeignKey(
        to="kouponbank.User",
        related_name="favorite_user_business",
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
