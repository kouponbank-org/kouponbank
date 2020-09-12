from django.db import models
from rest_framework import serializers


def upload_to(instance, filename):
    return '/'.join([
        str(instance.business_owner.owner.username),
        str(instance.business_name),
        str(instance.coupon_title),
        filename
    ])

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
    coupon_picture = models.ImageField(
        upload_to=upload_to,
        blank=True,
        null=True
    )

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = (
            "business_key",
            "coupon_title",
            "description",
            "coupon_code",
            "coupon_picture"
        )
