# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET

# Exceptions:
from django.core.exceptions import ObjectDoesNotExist

from .models import Cat


def index(request):
    return render(request, "index.html")


@require_GET
def get_cats(request):

    cats = []

    for cat_object in Cat.objects.all():
        cats.append({"catName": cat_object.name, "syt": cat_object.fed, "description": cat_object.description})

    return JsonResponse(cats, safe=False)


@csrf_exempt
def process_one_cat(request, cat_name):

    if request.method == 'GET':
        try:
            cat_object = Cat.objects.get(name=cat_name)

            return JsonResponse({"catName": cat_object.name, "syt": cat_object.fed, "description": cat_object.description})
        except ObjectDoesNotExist:
            return JsonResponse({'result': 'error', 'info': 'There is no cat with that name'})

    elif request.method == 'DELETE':
        Cat.objects.get(name=cat_name).delete()
        return JsonResponse({'result': 'ok', 'info': u'Cat with name {0} deleted'.format(cat_name)})