# Generated by Django 3.0.8 on 2021-01-09 15:12

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('kouponbank', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Seat',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('capacity', models.IntegerField(blank=True, max_length=2)),
                ('time_start', models.DateTimeField(blank=True, db_index=True)),
                ('duration', models.IntegerField(blank=True, max_length=2)),
                ('seat_feature_outlet', models.BooleanField(blank=True)),
                ('seat_feature_wifi', models.BooleanField(blank=True)),
                ('seat_feature_wall', models.BooleanField(blank=True)),
                ('business', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='business_seat', to='kouponbank.Business')),
            ],
        ),
    ]