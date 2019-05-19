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
        elasticsearch.putPerson(document, id, 'seniors', 'senior');
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
        elasticsearch.putPerson(document, id, 'students', 'student');
    }
)

exports.deleteStudent = functions.firestore
    .document('students/{userId}')
    .onDelete((change, context) => {
        const id = context.params.userId;
        elasticsearch.deletePerson(id, 'students', 'student');
    }
)

exports.deleteSenior = functions.firestore
    .document('seniors/{userId}')
    .onDelete((change, context) => {
        const id = context.params.userId;
        elasticsearch.deletePerson(id, 'seniors', 'senior');
    }
)