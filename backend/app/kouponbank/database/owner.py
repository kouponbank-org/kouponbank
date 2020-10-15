import uuid

from django.db import models
from rest_framework import serializers

from kouponbank.database.owner_detail import OwnerDetail, OwnerDetailSerializer


class Owner(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=50, unique=True, blank=False)
    password = models.CharField(max_length=50, unique=False, blank=False)
    email = models.EmailField(max_length=254, unique=True, blank=False)

class OwnerSerializer(serializers.ModelSerializer):
    #owner_detail = OwnerDetailSerializer(source="owner_details", read_only=True)
    #To include owner_detail in the db and api list, add 'owner_detail' to fields
    class Meta:
        model = Owner
        fields = (
            "id",
            "username",
            "password",
            "email",
        )

    def create(self, validated_data):
        owner = Owner.objects.create(**validated_data)
        OwnerDetail.objects.create(
            id=owner.id,
            owner=owner,
            name="",
            gender="",
            birthday="",
            location=""
        )

        return owner
