# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Cat(models.Model):

    name = models.CharField(max_length=32)

    FED_CHOICES = (
        (True, u'Сыт'),
        (False, u'Голоден')
    )
    fed = models.BooleanField(choices=FED_CHOICES, default=False)

    description = models.CharField(max_length=128)

    def __unicode__(self):
        return u"{0} у нас {1} и сейчас {2}".format(
            self.name,
            self.description,
            u'Сыт' if self.fed else u'Голоден'
        )
