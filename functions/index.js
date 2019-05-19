const functions = require('firebase-functions');
const elasticsearch = require('./elasticsearch');
const match = require('./match');
const search = require('./search');
const serviceAccount = require('./serviceAccountKey.json');
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://ruhacks-2019.firebaseio.com'
});

const firestore = admin.firestore();

const sendMatchesToFirestore = (student_id, matches) => {
    console.log('matches are sending', matches);
    console.log('to id', student_id);
    firestore.collection('students').doc(student_id).update({
        matches: matches
    })
}
// const sendMatchesToFirestore = require('./firestoreActions').sendMatchesToFirestore;


const test_student = {
    id: '1234567890',
    tasks: {
        trash: true,
        dishes: false,
        vacuum: true,
        cook: false,
        drive: true,
        feed_pets: false,
        walk_pets: true,
        bathroom: true,
        groceries: true,
        mop: false,
        plants: true,
        mow_lawn: true,
        driveway: true,
    },
    city: "Ottawa",
    class: "student",
    school: "Carleton University"
}

const doTheWholeMatchingThing = (student) => {
    search.getMatch(student).then((matches) => {
        return match.prepMatches(matches)
    }).catch(error => {
        return console.log(error);
    }).then((matches) => {
        return match.populateMatches({matches, student})}
    ).catch((error)=>{
        return console.log(error)
    }).then((matchObjects)=>{
        console.log('About to send to firestore')
        return sendMatchesToFirestore(student.id, matchObjects)
    }).catch((error)=>{
        return error;
    });
}

console.log(doTheWholeMatchingThing(test_student));

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
        console.log({change, context});
        // call my send to elasticsearch call
        const document = change.after.exists ? change.after.data() : null;
        const id = context.params.userId;
        // console.log(context)
        console.log(document);
        document['class'] = 'student';
        elasticsearch.putPerson(document, id, 'people', 'person');
        const docWithId = Object.assign(document, {id: id});
        console.log(docWithId)
        doTheWholeMatchingThing(docWithId);
   });

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