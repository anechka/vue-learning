# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-05-11 16:15
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32)),
                ('fed', models.BooleanField(choices=[(True, '\u0421\u044b\u0442'), (False, '\u0413\u043e\u043b\u043e\u0434\u0435\u043d')], default=False)),
                ('age', models.PositiveSmallIntegerField(default=1, validators=[django.core.validators.MinValueValidator(1)])),
                ('description', models.CharField(max_length=128)),
            ],
        ),
    ]
