const serviceAccount = require('./fbconfig.json');
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.REACT_APP_DATABASE_URL,
});

admin.initializeApp();


const firestore = admin.firestore();

const sendMatchesToFirestore = (student_id, matches) => {
    console.log('matches are sending', matches);
    console.log('to id', student_id);
    firestore.collection('student').doc(student_id).set({
        matches: matches
    })
}

module.exports = {sendMatchesToFirestore}