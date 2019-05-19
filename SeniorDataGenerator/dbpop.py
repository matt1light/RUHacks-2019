import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import generator
import sys


cred = credentials.Certificate('fbconfig.json')
firebase_admin.initialize_app(cred)
db = firestore.client()


def main():
    if (len(sys.argv)<1):
        print('Number of genrations required')
        exit(1)
    data = generator.generatedata(int(sys.argv[1]))
    print('pushing to DB')
    for user in data['users']:
        push_to_firestore(user)


def push_to_firestore(user):
    doc_ref = db.collection('seniors').document(user['id'])
    doc_ref.set(user)

main()