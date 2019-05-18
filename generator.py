import json
import random
import names
import uuid

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
         'Mowing the lawn/shoveling (deicing) driveway',
         ]


def formoneJSON():
    area = random.choice(schools)
    name = names.get_full_name()
    onejson = {
        'id': str(uuid.uuid4()),
        'photo': '',
        'class': 'senior',
        'name': name,
        'age': random.randint(55, 100),
        'email': name.lower().replace(' ', '') + '@gmail.com',
        'tasks': random.sample(tasks, random.randint(1, len(tasks))),
        'baserent': area['rent'],
        'closestschool': area['name'],
        'distance': random.randint(0, 15),
        'city': area['city'],
        'matches': [],
    }
    return onejson


def generatedata():
    users = []
    print('generating data')
    for i in range(10):
        users.append(formoneJSON())
    print(json.dumps(users, indent=4))
    fulljson = {'users': users}
    print('writing to file seniordata.txt')
    with open('seniordata.txt', 'w') as f:
        f.write(json.dumps(fulljson, indent=4, sort_keys=True))
        f.close()


generatedata()
