# pylint: disable=import-error
import uuid

from django.db import models
from kouponbank.database.business import Business
from rest_framework import serializers
import datetime
from kouponbank.database.business import Business
from kouponbank.database.timeslot import Timeslot

class Table(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    business = models.ForeignKey(
        Business,
        on_delete=models.CASCADE,
        related_name="business_table",
        null=True,
        blank=True,
    )
    table_capacity = models.IntegerField()
    table_outlet = models.BooleanField()
    table_near_wall = models.BooleanField()

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = (
            "id",
            "table_capacity",
            "table_outlet",
            "table_near_wall",
        )
