class Game{
    constructor(category, player){
        this.category=category;
        this.questionsSelected;
        this.player=player;
        this.number=0;
        this.right=0;
        this.incorrect=0;
        this.totalQuestions=20;
        this.seconds=0;
        this.minutes=0;
        this.active=true;
        this.getData();
        this.showElements();
        this.timer();
    }

    showElements(){
        const loginContainer=document.getElementById('login');
        loginContainer.classList.replace('login','hidden');
        const gameContainer=document.getElementById('game');
        gameContainer.classList.replace('hidden','question');
        const corrects = document.getElementById('corrects');
        corrects.innerHTML='0';
        const incorrects = document.getElementById('incorrects');
        incorrects.innerHTML='0';
    }

    showQuestion(question){        
        if(this.number===this.totalQuestions){
            this.active=false;
            alert(`Has terminado`);
            this.showTable();
        }
        else{
            const questionsContainer=document.querySelector('.questions');
            this.removeElements(questionsContainer);
            const title = document.createElement('h2');
            title.textContent='Selecciona la opción correcta';    
            questionsContainer.appendChild(title); 
            const questionTitle = document.createElement('h3');
            questionTitle.innerText=question.Question;        
            const optionsContainer=document.createElement('div');
            optionsContainer.classList.add('options');
            questionsContainer.appendChild(optionsContainer);
            let options=(question.Options);
            options.push(`${question.Correct}`);
            options.sort(()=>{return 0.5 - Math.random()});
            options.map((option)=>{
                const optionButton = document.createElement('Button');
                optionButton.type='button';
                optionButton.textContent=option;
                optionsContainer.appendChild(optionButton);
                if(option===question.Correct){
                    optionButton.onclick = ()=>{
                        this.goodAnswer();
                        this.showQuestion(this.questionsSelected[this.number]);
                    }
                }
                else{
                    optionButton.onclick = ()=>{
                        this.badAnswer();
                        this.showQuestion(this.questionsSelected[this.number]);
                    }
                }
    
            })    
            this.showImage();
            questionsContainer.insertBefore(questionTitle,optionsContainer); 
            this.number++;
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
        this.right++
        const corrects = document.getElementById('corrects')
        corrects.innerHTML=`${this.right}`
        const gAMessagges= ['Lo haces genial','¡Que inteligente!','¡Eres genial!','¡Sigue así!','¡Fantástico!']
        this.showMessage(gAMessagges)

    }
    badAnswer(){

        this.incorrect++
        const incorrects = document.getElementById('incorrects')
        incorrects.innerHTML=`${this.incorrect}`
        const bAMessagges= ['Uy, casi','Lo siento, incorrecto','Concéntrate un poco más', 'Fallaste por poco', 'Sigue intentando']
        this.showMessage(bAMessagges)
    }

    showMessage(phrases){
        const messagge = document.getElementById('message')
        messagge.innerText=phrases[Math.round(Math.random()*5)]       
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
        tdTime.innerText=`${this.minutesBoard}:${this.secondsBoard}`
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

    timer(){
        
            setInterval(() => {
                if (this.active===true) {
                    const timerContainer=document.getElementById('timer')
                    this.seconds++;
                    if (this.seconds === 60) {
                    this.seconds = 0;
                    this.minutes++;
                    }
                    this.secondsBoard = `${this.seconds}`;
                    this.minutesBoard = `${this.minutes}`;
                    if (this.seconds < 10) {
                    this.secondsBoard = `0${this.seconds}`;
                    }
                    if (this.minutes < 10) {
                    this.minutesBoard = `0${this.minutes}`;
                    }
                    timerContainer.innerHTML = `${this.minutesBoard}:${this.secondsBoard}`;
                }
            },1000);       
    };
}  

function start(category){    
    const playerInput = document.getElementById('player')
    const player = playerInput.value;
    const game = new Game(category,player)
}