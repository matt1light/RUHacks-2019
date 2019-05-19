const functions = require('firebase-functions');
const elasticsearch = require('./elasticsearch');


const admin = require('firebase-admin');
admin.initializeApp();


//  {wildcard} this is a way to allow any value for it, and grab it as a variable.

exports.modifyPerson = functions.firestore
    .document('People/{userId}')
    .onWrite((change, context) => { 
        // call my send to elasticsearch call
        const document = change.after.exists ? change.after.data() : null;
        console.log(document);
        console.log(change);
        elasticsearch.putUser(document);
    }
)