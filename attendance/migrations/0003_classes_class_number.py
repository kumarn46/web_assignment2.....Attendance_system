# Generated by Django 5.1.3 on 2024-11-06 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("attendance", "0002_remove_enrollment_date_of_birth_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="classes",
            name="class_number",
            field=models.CharField(max_length=50, null=True),
        ),
    ]
