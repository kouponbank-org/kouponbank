from django.db import models
from rest_framework import serializers


class Menu(models.Model):
    business = models.ForeignKey(
        to="kouponbank.Business",
        on_delete=models.CASCADE,
        related_name="business_menu",
        null=True
    )
    menu_title = models.CharField(max_length=50, default="")
    description = models.TextField(default="")

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ("menu_title", "description")
