# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import JsonResponse

from .models import Cat


def index(request):
    return render(request, "index.html")


def cats(request):

    cats = []

    for cat_object in Cat.objects.all():
        cats.append({"catName": cat_object.name, "syt": cat_object.fed, "description": cat_object.description})

    return JsonResponse(cats, safe=False)
