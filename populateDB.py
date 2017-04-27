# -*- coding: utf-8 -*-

import os
import django


def populate():
    from cats.models import Cat

    def add_cat(name, fed, description):
        c = Cat.objects.get_or_create(name=name, fed=fed, description=description)
        return c

    cats = [
        {"catName": "Pusya", "syt": False, "description": u"Серая"},
        {"catName": "Mosha", "syt": False, "description": u"Турок"},
        {"catName": "Oposya", "syt": False, "description": u"Флегматичный"},
        {"catName": "Kusya", "syt": True, "description": u"Пятнистый"},
        {"catName": "Persik", "syt": False, "description": u"Песчаный"},
        {"catName": "Monja", "syt": True, "description": u"Мудрая"},
        {"catName": "Musja", "syt": True, "description": u"Длинноногая"},
        {"catName": "Masya", "syt": False, "description": u"Смешная"}
    ]

    for cat in cats:
        name, fed, description = cat["catName"], cat["syt"], cat["description"]

        add_cat(
            name=name,
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
