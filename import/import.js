import firebase from 'firebase';
import fs from 'fs';

//CSERÉLD LE A SAJÁT APPOD CONFIG OBJECTJÉRE!
var firebaseConfig = {
    apiKey: "AIzaSyAFkaNrFsFssDpXNKeUoIw-7ANdXC-nU8I",
    authDomain: "quiz-app-3f3ee.firebaseapp.com",
    projectId: "quiz-app-3f3ee",
    storageBucket: "quiz-app-3f3ee.appspot.com",
    messagingSenderId: "482294915303",
    appId: "1:482294915303:web:8d15fdd5ddb17709544242"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// firebase
//   .auth()
//   .signInAnonymously()
//   .then(() => {
//     console.log('signed in');
//   })
//   .catch((error) => {
//     console.error(error);
//   });
  
const fileName = './questions.json';
let content = [];
fs.readFile(fileName, function read(err, data) {
  if (err) {
    throw err;
  }
  content = JSON.parse(data);


for (let question of content.questions){
db.collection('questions')
         .add(question)
         .then(() => {
           console.log('Document written');
        })
         .catch((error) => {
          console.error('Error adding document: ', error);
       });
    }
});


// firebase.auth().onAuthStateChanged(async (user) => {
//   if (user) {
//     const questions = Object.keys(content);
//     for (let i = 0; i < questions.length; i++) {
//       db.collection('question')
//         .doc(questions[i])
//         .set(content[questions[i]])
//         .then(() => {
//           console.log('Document written');
//         })
//         .catch((error) => {
//           console.error('Error adding document: ', error);
//         });
//     }
//   } else {
//     console.log('no user');
//   }
// });
