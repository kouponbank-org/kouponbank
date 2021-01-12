import uuid

from django.db import models
from rest_framework import serializers

class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reservation = models.OneToOneField(
        to="kouponbank.Reservation",
        on_delete=models.CASCADE,
        related_name="reservation_order",
    )
    total_price = models.DecimalField(decimal_places=2)
    total_quantity = models.IntegerField(default=1)
    order_complete_status = models.BooleanField(default=False)

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            "id",
            "total_price",
            "total_quantity",
            "order_complete_status",
        )
