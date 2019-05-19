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

tasks = {'vacuum',
         'dishes',
         'trash',
         'cook',
         'drive',
         'feed_pets',
         'walk_pets',
         'bathroom',
         'laundry',
         'groceries',
         'mop',
         'plants',
         'mow_lawn',
         'driveway',
         }

def randomize_tasks():
    task_list = {}
    for task in tasks:
        task_list[task] = random.choice([True, False])
    return(task_list)

def formoneJSON():
    area = random.choice(schools)
    gender = random.choice(['women', 'men'])
    if gender == 'women':
        name = names.get_full_name('female')
    else:
        name = names.get_full_name('male')

    photourl = 'https://randomuser.me/api/portraits/' + gender + '/' + str(random.randint(0, 99)) + '.jpg'
    onejson = {
        'id': str(uuid.uuid4()),
        'photo': photourl,
        'class': 'senior',
        'name': name,
        'age': random.randint(55, 100),
        'email': name.lower().replace(' ', '') + '@gmail.com',
        'tasks': randomize_tasks(),
        'base_rent': area['rent'],
        'closest_school': area['name'],
        'distance': random.randint(0, 15),
        'city': area['city'],
        'matches': [],
    }
    return onejson


def generatedata():
    users = []
    print('generating data')
    for i in range(500):
        users.append(formoneJSON())
    print(json.dumps(users, indent=4))
    fulljson = {'users': users}
    print('writing to file seniordata.json')
    write_data(fulljson)
    return fulljson


def write_data(data):
    with open('./seniordata.json', 'w') as f:
        f.write(json.dumps(data, indent=4))
        f.close()

