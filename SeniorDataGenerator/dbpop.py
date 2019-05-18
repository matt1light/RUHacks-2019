import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


def startfirebase():
    cred = credentials.Certificate('fbconfig.json')
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    doc_ref = db.collection(u'users').document(u'test')


def get_data():
    person = {
        'name': '',
        'class': '',
        'email': '',
        'age': 0,
        'tasks': [],
        'base_rent': 0,
        'distance': 0,
        'city': '',
        'closest_school': '',
        'matches': []
    }


startfirebase()
