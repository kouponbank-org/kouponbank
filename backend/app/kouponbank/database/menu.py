import uuid

from django.db import models
from rest_framework import serializers


def upload_to(instance, filename):
    return '/'.join([
        str(instance.business_owner.owner.username),
        str(instance.business_name),
        str(instance.menu_title),
        filename
    ])

class Menu(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    business = models.ForeignKey(
        to="kouponbank.Business",
        on_delete=models.CASCADE,
        related_name="business_menu",
        null=True
    )
    menu_title = models.CharField(max_length=50, default="")
    description = models.TextField(default="", blank=True)
    menu_picture = models.ImageField(
        upload_to=upload_to,
        blank=True,
        null=True
    )

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = (
            "id",
            "menu_title",
            "description",
            "menu_picture"
        )
