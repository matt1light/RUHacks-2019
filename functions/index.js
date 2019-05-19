const functions = require('firebase-functions');
const elasticsearch = require('./elasticsearch');


const admin = require('firebase-admin');
admin.initializeApp();


//  {wildcard} this is a way to allow any value for it, and grab it as a variable.

exports.modifySenior = functions.firestore
    .document('seniors/{userId}')
    .onWrite((change, context) => { 
        // call my send to elasticsearch call
        const document = change.after.exists ? change.after.data() : null;
        const id = context.params.userId;
        console.log(context);
        console.log(document);
        document['class'] = 'senior';
        elasticsearch.putPerson( document, id, 'people', 'person');
    }
)

exports.modifyStudent = functions.firestore
    .document('students/{userId}')
    .onWrite((change, context) => { 
        // call my send to elasticsearch call
        const document = change.after.exists ? change.after.data() : null;
        const id = context.params.userId;
        // console.log(context)
        console.log(document);
        document['class'] = 'student';
        elasticsearch.putPerson(document, id, 'people', 'person');

    }
)

exports.deleteStudent = functions.firestore
    .document('students/{userId}')
    .onDelete((change, context) => {
        const id = context.params.userId;
        elasticsearch.deletePerson(id, 'people', 'person');
    }
)

exports.deleteSenior = functions.firestore
    .document('seniors/{userId}')
    .onDelete((change, context) => {
        const id = context.params.userId;
        elasticsearch.deletePerson(id, 'people', 'person');
    }
)