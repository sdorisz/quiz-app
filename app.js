import express from "express";
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import firebase from 'firebase';
import '@firebase/firestore';
import fs from 'fs';



const firebaseConfig = {
    apiKey: "AIzaSyAFkaNrFsFssDpXNKeUoIw-7ANdXC-nU8I",
    authDomain: "quiz-app-3f3ee.firebaseapp.com",
    projectId: "quiz-app-3f3ee",
    storageBucket: "quiz-app-3f3ee.appspot.com",
    messagingSenderId: "482294915303",
    appId: "1:482294915303:web:8d15fdd5ddb17709544242"
  };
  
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

  

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));


app.get("/game", (req, res, next) =>{
    //res.sendFile('index.html',{root: './public'});
    res.sendFile('index.html',{root: path.join(__dirname, 'public')})

})

app.get("/questions", (req, res, next) =>{
    
})

app.get("/api/game", async(req, res, next) =>{
  const queryRef = await db.collection('questions').get();
  const questions = [];

  queryRef.forEach(doc => questions.push({ id: doc.id, ...doc.data() }));

  const randomIndex = Math.floor(Math.random() * questions.length);

  res.json(questions[randomIndex]);
})



app.get("/api/questions", async (req, res, next) =>{
  const queryRef = await db.collection('questions').get();
  const questions = [];

  queryRef.forEach(doc => questions.push({ id: doc.id, question: doc.data().question }));

  res.json(questions);
})

app.post('/api/questions', async (req, res, next) => {
    const inputData = req.body;
    
    if(typeof inputData.question !== 'string' || inputData.question.length<3) {
        throw new Error ('invalid question');
    }
    
    if(Array.isArray(inputData.answers) || inputData.answers.length !== 4 ){
        throw new Error ('invalid question');
    }

    for(let i = 0; i < inputData.ansers.length; i++){
        const answerObject = inputData.answers[i]
        if(typeof answerObject.ansers !== 'string' || answerObject.answer.length <3){
            throw new Error( `invalid answer ${i}`);
        }
  

        if(typeof answerObject.is_correct !== 'boolean'){
            throw new Error(`invalid answer ${i}`)
        }
    }

    if(inputData.answers.filter(answerObject => answerObject.is_correct).length !==1){
        throw new Error ('there are more than 1 correct answer')
    }

    const doc = await db.collection('questions').add(inputData);

    res.json({
        id: doc.id
    })
})

app.delete("/api/questions/:id", async(req, res, next) =>{
    const id = req.params.id;

    await db.collection('questions')
        .doc(id)
        .delete();

    res.json({});
})

app.listen(port, () => {
    console.log(`App listening on ${port}`)
})