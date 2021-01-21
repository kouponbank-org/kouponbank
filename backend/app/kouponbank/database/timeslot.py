# pylint: disable=import-error
import uuid

from django.db import models
from rest_framework import serializers
#from kouponbank.database.table import Table

class Timeslot(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reservation = models.ForeignKey(
        to="kouponbank.Reservation",
        on_delete=models.CASCADE,
        related_name="reservation_timeslot",
        null=True,
        blank=True,
    )
    times = models.CharField(max_length=48)
    date = models.DateField()

class TimeslotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timeslot
        fields = (
            "id",
            "times",
            "date",
        )