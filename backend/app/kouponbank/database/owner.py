# pylint: disable=import-error
import uuid

from django.db import models
from kouponbank.database.owner_detail import OwnerDetail, OwnerDetailSerializer
from rest_framework import serializers


class Owner(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    email = models.EmailField(max_length=254, unique=True)

class OwnerSerializer(serializers.ModelSerializer):
    owner_detail = OwnerDetailSerializer(read_only=True)
    #To include owner_detail in the db and api list, add 'owner_detail' to fields
    class Meta:
        model = Owner
        fields = (
            "id",
            "owner_detail",
            "username",
            "password",
            "email",
        )

