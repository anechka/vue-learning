# -*- coding: utf-8 -*-

import os
import django


def populate():
    from cats.models import Cat

    def add_cat(name, age, fed, description):
        c = Cat.objects.get_or_create(name=name, age=age, fed=fed, description=description)
        return c

    cats = [
        {"catName": "Pusya", "age": 6, "syt": False, "description": u"Серая"},
        {"catName": "Mosha", "age": 11, "syt": False, "description": u"Турок"},
        {"catName": "Oposya", "age": 9, "syt": False, "description": u"Флегматичный"},
        {"catName": "Kusya", "age": 5, "syt": True, "description": u"Пятнистый"},
        {"catName": "Persik", "age": 1, "syt": False, "description": u"Песчаный"},
        {"catName": "Monja", "age": 15, "syt": True, "description": u"Мудрая"},
        {"catName": "Musja", "age": 8, "syt": True, "description": u"Длинноногая"},
        {"catName": "Masya", "age": 1, "syt": False, "description": u"Смешная"}
    ]

    for cat in cats:
        name, age, fed, description = cat["catName"], cat["age"], cat["syt"], cat["description"]

        add_cat(
            name=name,
            age=age,
            fed=fed,
            description=description
            )

    # Print out what was added
    for c in Cat.objects.all():
        print "Added to cats: {0}".format(c.name)

if __name__ == '__main__':
    print "Starting cats population script..."

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'vuedjango.settings')

    django.setup()
    populate()
