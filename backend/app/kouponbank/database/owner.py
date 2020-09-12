from django.db import models
from rest_framework import serializers

from kouponbank.database.owner_detail import OwnerDetail, OwnerDetailSerializer


class Owner(models.Model):
    username = models.CharField(max_length=50, unique=True, default="")
    password = models.CharField(max_length=50, unique=False, default="")
    email = models.EmailField(max_length=254, unique=True, default="")

class OwnerSerializer(serializers.ModelSerializer):
    #owner_detail = OwnerDetailSerializer(source="owner_details", read_only=True)
    #To include owner_detail in the db and api list, add 'owner_detail' to fields
    class Meta:
        model = Owner
        fields = (
            "username",
            "password",
            "email"
        )

    def create(self, validated_data):
        owner = Owner.objects.create(**validated_data)
        OwnerDetail.objects.create(
            owner=owner,
            name="",
            gender="",
            birthday="",
            location=""
        )

        return owner
