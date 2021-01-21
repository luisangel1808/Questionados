class Game{
    constructor(category, player){
        this.category=category;
        this.questionsSelected;
        this.player=player;
        this.number=0;
        this.right=0;
        this.incorrect=0;
        this.totalQuestions=20;
        this.getData()
        this.showElements()
    }

    showElements(){
        const loginContainer=document.getElementById('login')
        loginContainer.classList.replace('login','hidden')
        const gameContainer=document.getElementById('game')
        gameContainer.classList.replace('hidden','question')
    }

    showQuestion(question){        
        if(this.number===this.totalQuestions){
            prompt(`Has terminado`)
            this.showTable()
        }
        else{
            const questionsContainer=document.querySelector('.questions')
            this.removeElements(questionsContainer)
            const title = document.createElement('h2')
            title.textContent='Selecciona la opción correcta'        
            questionsContainer.appendChild(title) 
            const questionTitle = document.createElement('h3')
            questionTitle.innerText=question.Question        
            const optionsContainer=document.createElement('div')
            optionsContainer.classList.add('options')
            questionsContainer.appendChild(optionsContainer)
            let options=(question.Options)
            options.push(`${question.Correct}`)
            options.sort(()=>{return 0.5 - Math.random()})
            options.map((option)=>{
                const optionButton = document.createElement('Button')
                optionButton.type='button'
                optionButton.textContent=option
                optionsContainer.appendChild(optionButton)
                if(option===question.Correct){
                    optionButton.onclick = ()=>{
                        this.goodAnswer()
                        this.showQuestion(this.questionsSelected[this.number])
                    }
                }
                else{
                    optionButton.onclick = ()=>{
                        this.badAnswer()
                        this.showQuestion(this.questionsSelected[this.number])
                    }
                }
    
            })    
            console.log(this.number)
            this.showImage();
            questionsContainer.insertBefore(questionTitle,optionsContainer) 
            this.number++
        }

    }

    async getData()  {  
        const response = await fetch('questions.json');
        const questions = await response.json();
        this.questionsSelected=questions.questions;
        if (this.category!=='All') {
            this.questionsSelected=this.questionsSelected.filter((questionsSelected)=>{
                if (questionsSelected.category===this.category) {
                    return true;
                }
            })
        }
        this.questionsSelected.sort(()=>{return 0.5 - Math.random()})
        this.questionsSelected= this.questionsSelected.splice(0,20)
        this.showQuestion(this.questionsSelected[this.number])
    }   
    goodAnswer(){
        console.log('good job')
        this.right++
        const corrects = document.getElementById('corrects')
        corrects.innerHTML=`${this.right}`
    }
    badAnswer(){
        console.log('wrong')
        this.incorrect++
        const incorrects = document.getElementById('incorrects')
        incorrects.innerHTML=`${this.incorrect}`
    }
    showImage(){
        const image=document.querySelector('#questionImg') 
        image.src=`assets/img/${this.questionsSelected[this.number].category}.png`
        image.alt='category'
    }

    removeElements(element){
        while(element.firstChild){
            element.removeChild(element.firstChild)
        }
    }
    showTable(){
        const scoresBody = document.getElementById('scoresbody')
        const tdName = document.createElement('td')
        const tRow = document.createElement('tr')
        scoresBody.appendChild(tRow);
        tdName.innerText=this.player
        tRow.appendChild(tdName)
        const tdScore = document.createElement('td')
        tdScore.innerText=`${this.right}/${this.incorrect}`
        tRow.appendChild(tdScore)
        const tdTime = document.createElement('td')
        tdTime.innerText=`${minutesBoard}:${secondsBoard}`
        tRow.appendChild(tdTime)
        const scoresContainer=document.getElementById('scores')
        scoresContainer.classList.replace('hidden','scores')
        const gameContainer=document.getElementById('game')
        gameContainer.classList.replace('question','hidden')

        const playAgain = document.getElementById('playAgain')
        playAgain.onclick = () =>{
            scoresContainer.classList.replace('scores','hidden')
            const loginContainer=document.getElementById('login')
            loginContainer.classList.replace('hidden','login')
        }
    }   
      
}  

function start(category){    
    const playerInput = document.getElementById('player')
    const player = playerInput.value;
    game = new Game(category,player)
    timer(band)
    seconds=0;
    minutes=0;
    secondsBoard=0; 
    minutesBoard=0;
}

let seconds=0;
let minutes=0;
let secondsBoard=0; 
let minutesBoard=0;
let band=true
function timer(){
    if(band){
        setInterval(this.setTimer, 1000);
        band=false
    }     
};
  
function setTimer(){
    
    const timerContainer=document.getElementById('timer')
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    secondsBoard = `${seconds}`;
    minutesBoard = `${minutes}`;
    if (seconds < 10) {
      secondsBoard = `0${seconds}`;
    }
    if (minutes < 10) {
      minutesBoard = `0${minutes}`;
    }
    timerContainer.innerHTML = `${minutesBoard}:${secondsBoard}`;
  };


const goodAnswerMessagges= ['Lo haces genial','¡Que inteligente!','¡Eres genial!','¡Sigue así!','¡Fantástico!']
const badAnswerMessagges= ['Uy, casi','Lo siento, incorrecto','Concéntrate un poco más', 'Fallaste por poco', 'Sigue intentando']