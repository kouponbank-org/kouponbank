# pylint: disable=import-error
import uuid

from django.db import models
from rest_framework import serializers
from kouponbank.database.business import Business
from kouponbank.database.table import Table
from kouponbank.database.user import User

class Reservation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    table = models.ForeignKey(
        Table,
        on_delete=models.CASCADE,
        related_name = "table_reservation",
    )
    business = models.ForeignKey(
        Business,
        on_delete=models.CASCADE,
        related_name="business_reservation",
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="user_reservation",
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