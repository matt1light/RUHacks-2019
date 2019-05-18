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


def randomizeclass():
    return random.choice(['senior', 'student'])


def formJSON():
    area = random.choice(schools)
    print (area)
    JSON = {
        'class': randomizeclass(),
        'name': '',
        'age': random.randint(55, 100),
        'email': '',
        'tasks': [],
        'baserent': area['rent'],
        'closestschool': area['name'],
        'distance': random.randint(0, 15),
        'city': area['city'],
        'matches': [],
    }
    print(JSON)

formJSON()