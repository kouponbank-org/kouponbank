# pylint: disable=import-error
import uuid

from django.db import models
from rest_framework import serializers

class Timeslot(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    table = models.ForeignKey(
        to="kouponbank.Table",
        on_delete=models.CASCADE,
        related_name="table_timeslot",
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