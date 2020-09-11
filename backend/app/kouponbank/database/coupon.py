from django.db import models
from rest_framework import serializers


class Coupon(models.Model):
    business = models.ForeignKey(
        to="kouponbank.Business",
        on_delete=models.CASCADE,
        related_name="business_coupon",
        null=True
    )
    business_key = models.IntegerField()
    coupon_title = models.CharField(max_length=50, default="")
    description = models.TextField(default="")
    coupon_code = models.CharField(max_length=50, default="")

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ("business_key", "coupon_title", "description", "coupon_code")
