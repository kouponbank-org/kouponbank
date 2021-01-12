import uuid

from django.db import models
from rest_framework import serializers

class Table(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    business = models.ForeignKey(
        to="kouponbank.Business",
        on_delete=models.CASCADE,
        related_name="business_table",
        null=True,
        blank=True,
    )
    table_capacity = models.IntegerField(default=0)
    table_outlet = models.BooleanField(default=False)
    table_near_wall = models.BooleanField(default=False)

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = (
            "id",
            "table_capacity",
            "table_outlet",
            "table_near_wall",
        )