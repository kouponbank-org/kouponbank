from django.db import models
from rest_framework import serializers

from kouponbank.database.owner_detail import OwnerDetail, OwnerDetailSerializer


class Owner(models.Model):
    username = models.CharField("username", max_length=50, unique=True, default="")
    password = models.CharField("password", max_length=50, unique=False, default="")
    email = models.CharField("email", max_length=50, unique=True, default="")

class OwnerSerializer(serializers.ModelSerializer):
    owner_detail = OwnerDetailSerializer(source="owner_details", read_only=True)

    class Meta:
        model = Owner
        fields = ("username", "password", "email", "owner_detail")

    def create(self, validated_data):
        owner = Owner.objects.create(**validated_data)
        OwnerDetail.objects.create(
            owner=owner,
            name="",
            gender="",
        )

        return owner
