const admin = require('firebase-admin');

// const serviceAccount = require('./fbconfig.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
// }, 'node');

const firestore = admin.firestore();

const sendMatchesToFirestore = (student_id, matches) => {
    console.log('matches are sending', matches);
    console.log('to id', student_id);
    firestore.collection('student').doc(student_id).set({
        matches: matches
    })
}

module.exports = {sendMatchesToFirestore}