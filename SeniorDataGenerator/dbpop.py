import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import generator


cred = credentials.Certificate('fbconfig.json')
firebase_admin.initialize_app(cred)
db = firestore.client()


def main():
    data = generator.generatedata()
    print('pushing to DB')
    for user in data['users']:
        push_to_firestore(user)


def push_to_firestore(user):
    doc_ref = db.collection('People').document(user['id'])
    doc_ref.set(user)

main()