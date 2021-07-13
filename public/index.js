const backendUrl =  "http://localhost:3000/"
const gameEndpoint = backendUrl + "api/game";

fillUpGame();
const gameBoard = document.getElementById('gameboard')

function fillUpGame(){
     fetch(gameEndpoint).then((response) => {
        if(response.status ===200){
            console.log(response)
            return response.json()
        }else{
            throw new Error (response.statusText)
        }   
    })
    .then(handleResponse)
    .catch(err => {
        console.error('no internet')
     })
}

function handleResponse(data) {
    let scoreCounter = document.getElementById('score');
    let h1Element =  document.createElement('h4');
        h1Element.textContent = data.question;
        gameBoard.appendChild(h1Element)
        data.answers.forEach((element) => {
            let buttonElement = document.createElement('button');
            buttonElement.textContent = element.answer;
            buttonElement.setAttribute("check", element.is_correct)
            buttonElement.addEventListener('click', (e) => {
                if(buttonElement.getAttribute('check') === 'true'){
                   buttonElement.classList.add('correct')
                   let score = scoreCounter.innerHTML;
                    let scoreNumber = parseInt(score)
                   scoreCounter.innerHTML =scoreNumber+1;
                   setTimeout(() => {
                    gameBoard.innerHTML="";
                   fillUpGame();
                    }, 2000);                   
                }else{
                    buttonElement.classList.add('incorrect')
                    setTimeout(() => {
                        scoreCounter.innerHTML = 0;
                        lookUpRightAnswer();
                        }, 1000); 
                    }
            })
            gameBoard.appendChild(buttonElement)

        })
}

function lookUpRightAnswer() {
    const btnElements = document.querySelectorAll('button');
    btnElements.forEach((element) => {
        if(element.getAttribute('check') === 'true'){
            element.classList.add('correct')
             }
         }
    )
    setTimeout(() => {
        gameBoard.innerHTML="";
        fillUpGame();
        }, 2000); 
    
}