import uuid

from django.db import models
from rest_framework import serializers

class Verification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    business = models.OneToOneField(
        to="kouponbank.Business",
        on_delete=models.CASCADE,
        related_name="business_verification",
    )
    verified_business = models.BooleanField(default=False)
    verified_owner = models.BooleanField(default=False)
    verified_email = models.BooleanField(default=False)

class VerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Verification
        fields = (
            "verified_business",
            "verified_owner",
            "verified_email",
        )