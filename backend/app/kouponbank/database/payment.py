# pylint: disable=import-error
import uuid

from django.db import models
from rest_framework import serializers
from kouponbank.database.user import User

class Payment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="user_payment_method"
    )
    card_holder_name = models.CharField(max_length=50)
    card_number = models.CharField(max_length=16, unique=True)
    card_billing_address = models.TextField(),
    card_type = models.CharField(max_length=50)

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = (
            "id",
            "card_holder_name",
            "card_billing_address",
            "card_type",
        )