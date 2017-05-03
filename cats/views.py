# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Cat


def index(request):
    return render(request, "index.html")


def get_cats(request):

    cats = []

    for cat_object in Cat.objects.all():
        cats.append({"catName": cat_object.name, "syt": cat_object.fed, "description": cat_object.description})

    return JsonResponse(cats, safe=False)


@csrf_exempt
#@require_http_methods(["DELETE"])
def delete_cats(request):

    try:
        body_request = request.body
        cat_name = unicode(body_request[:32])

        if len(cat_name):
            Cat.objects.filter(name=cat_name).delete()

            return JsonResponse({'result': 'ok', 'info': u'Cat with name {0} deleted'.format(cat_name)})
        else:
            return JsonResponse({'result': 'error', 'info': 'Empty cat name'})

    except:
        return JsonResponse({'result': 'error', 'info': 'There is no cat with that name'})
