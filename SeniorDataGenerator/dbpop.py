import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
import generator


cred = credentials.Certificate('fbconfig.json')
firebase_admin.initialize_app(cred)
db = firestore.client()
doc_ref = db.collection(u'users').document(u'test')
generator.generatedata()

def get_data():
    data = generator.generatedata()
    #for user in data['users']:
        #print(form_data(user))
        #push_to_firestore(user)


def push_to_firestore(user):
    doc_ref = db.collection('People').document(user['id'])
    doc_ref.set(user)


get_data()