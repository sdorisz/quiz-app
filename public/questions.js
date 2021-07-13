
const backendUrl = "http://localhost:3000/"
const questionsEndpoint = backendUrl + "api/questions";




fillUpQuestions() 



const formElement = document.getElementById('question-form');

formElement.addEventListener('submit', (e) => {
    e.preventDefault()
    const questionValue = document.getElementById('qusetion-input-field').value;
    const firstAnswer = document.getElementById("first-answer-text").value
    const firstAnswerValidity = document.getElementById("first-answer-radio").checked
    const secondAnswer = document.getElementById("second-answer-text").value
    const secondAnswerValidity = document.getElementById("second-answer-radio").checked
    const thirdAnswer = document.getElementById("third-answer-text").value
    const thirdAnswerValidity = document.getElementById("third-answer-radio").checked
    const forthAnswer = document.getElementById("forth-answer-text").value
    const forthAnswerValidity = document.getElementById("forth-answer-radio").checked
   
    let newQuestion = {
        "question": questionValue,
        "answers": [
          {
            "answer": firstAnswer,
            "is_correct": firstAnswerValidity
          },
          {
            "answer": secondAnswer,
            "is_correct": secondAnswerValidity 
          },
          {
            "answer": thirdAnswer,
            "is_correct": thirdAnswerValidity 
          },
          {
            "answer": forthAnswer,
            "is_correct": forthAnswerValidity
          }
        ]
      }
    
      fetch(questionsEndpoint, {
        method: 'POST',
        body: JSON.stringify(newQuestion),
        headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((response)=>{
            console.log(response)
             if(response.ok){
                   return response.json();
            }else{
                throw new Error('Bad HTTP!')
            }
        })
        .then((result) =>{
            console.log(result)
        })
        .catch((err) => {
            console.log(err);
        });
        
        formElement.reset();
        fillUpQuestions();

    })


function fillUpQuestions() {
let questions = document.getElementsByClassName('questionboard');
fetch(questionsEndpoint).then((response) => {
    if(response.status ===200){
         return response.json()
    }else{
        throw new Error (response.statusText)
    }   
})
.then((data) => {
    data.forEach((element) => {
    let divElement = document.createElement('div')
    divElement.classList.add('question');
    divElement.textContent =element.question;
    divElement.setAttribute('id', element.id)
    let pElement = document.createElement('p');
    let buttonElement = document.createElement('button');
    buttonElement.textContent="Törlés"

    buttonElement.addEventListener('click', (e) =>{
        let p=buttonElement.parentNode
        idNumber = p.getAttribute('id')
        url = questionsEndpoint + "/" + idNumber
        console.log(url)
        fetch(url, {
            method: 'DELETE',
       })
       .then(res => res.json())
       .then(res => console.log(res))
       .catch((err) => {
               console.log(err);
       })
       p.parentNode.removeChild(p);
        
    })

    let hrElement = document.createElement('hr');
    divElement.appendChild(pElement);
    divElement.appendChild(buttonElement);
    divElement.appendChild(hrElement)
    questions[0].appendChild(divElement);
    })
})
.catch(err => {
    console.error('no internet')
 })
}
