import json
import random

schools = [{
    'name': 'Carleton',
    'city': 'Ottawa',
    'rent': 500,
}, {
    'name': 'UOttawa',
    'city': 'Ottawa',
    'rent': 800,
}, {
    'name': 'Ryerson University',
    'city': 'Toronto',
    'rent': 1000,
}, {
    'name': 'University of Toronto',
    'city': 'Toronto',
    'rent': 1000,
}, {
    'name': 'York University',
    'city': 'Toronto',
    'rent': 1200,
}, {
    'name': 'Queens',
    'city': 'Kingston',
    'rent': 600,
}, {
    'name': 'University of Waterloo',
    'city': 'Waterloo',
    'rent': 700,
}]

tasks = ['Vacuuming',
         'Cleaning dishes',
         'Bringing out the trash/recycling/compost',
         'Cooking',
         'Driving',
         'Feeding pets',
         'Walking Pets',
         'Cleaning bathrooms',
         'Laundry',
         'Bringing in groceries',
         'Mopping floors',
         'Watering plants',
         'Mowing the lawn/shoveling (deicing) driveway]',
         ]


def randomizeclass():
    return random.choice(['senior', 'student'])


def formJSON():
    area = random.choice(schools)
    print(area)
    completejson = {
        'class': randomizeclass(),
        'name': '',
        'age': random.randint(55, 100),
        'email': '',
        'tasks': random.sample(tasks, random.randint(1, len(tasks))),
        'baserent': area['rent'],
        'closestschool': area['name'],
        'distance': random.randint(0, 15),
        'city': area['city'],
        'matches': [],
    }
    print(completejson)

formJSON()