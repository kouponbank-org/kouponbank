import uuid

from django.db import models
from rest_framework import serializers

class Reservation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    table = models.ForeignKey(
        to="kouponbank.Table",
        on_delete=models.CASCADE,
        related_name = "table_reservation",
        blank=True,
        null=True,
    )
    business = models.ForeignKey(
        to="kouponbank.Business",
        on_delete=models.CASCADE,
        related_name="business_reservation",
        blank=True,
        null=True,
    )
    user = models.ForeignKey(
        to="kouponbank.User",
        related_name="user_reservation",
        blank=True,
        null=True,
    )
    start_time = models.TimeField()
    end_time = models.TimeField()

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = (
            "id",
            "start_time",
            "end_time",
        )