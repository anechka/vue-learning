# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.core.validators import MinValueValidator
from django.db import models


class Cat(models.Model):

    name = models.CharField(max_length=32)

    FED_CHOICES = (
        (True, u'Сыт'),
        (False, u'Голоден')
    )
    fed = models.BooleanField(choices=FED_CHOICES, default=False)
    age = models.PositiveSmallIntegerField(validators=[MinValueValidator(1)], default=1)
    description = models.CharField(max_length=128)

    def __unicode__(self):
        return u"{0}, возраст: {1} у нас {2} и сейчас {3}".format(
            self.name,
            self.age,
            self.description,
            u'Сыт' if self.fed else u'Голоден'
        )
