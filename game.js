
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText =document.getElementById("score");
const progressBarFull= document.getElementById("progressBarFull");
/* const loader =document.getElementById("loader");
const game = document.getElementById("game"); */



let currentQuestion ={};
let acceptingAnswers= false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions= [
    {
        question : "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question : "Where is the correct place to insert a JavaScript? ",
        choice1: "The <body> section",
        choice2: "The <head>section",
        choice3: " Both the <head> section and the <body> section are correct",
        choice4: "Between <head> and <body>",
        answer: 3
    },
    {
        question : "How do you write 'Hello World' in an alert box? ",
        choice1: " msg('Hello World');",
        choice2: " msgBox('Hello World');",
        choice3: " alertBox('Hello World');",
        choice4: " alert('Hello World');",
        answer: 4
    },
    {
        question : "How do you call a function named 'myFunction'?",
        choice1: "  call myFunction()",
        choice2: "  call function myFunction()",
        choice3: "  myFunction()",
        choice4: "  myFunction",
        answer: 3
    },
    {
        question : "How to write an IF statement in JavaScript?",
        choice1: "   if i = 5",
        choice2: "   if (i == 5)",
        choice3: "   if i == 5 then",
        choice4: "   if i = 5 then",
        answer: 2
    },
    {
        question: " What is the correct sintax for referring to an external script called xxx.js ?",
        choice1: "<script href= 'xxx.js'>",
        choice2: "<script name= 'xxx.js'>",
        choice3: "<script src= 'xxx.js'>",
        choice4: "<script file= 'xxx.js'>",
        answer: 3
    },
    {
        question : "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        choice1: "    if i <> 5",
        choice2: "    if (i <> 5)",
        choice3: "    if i =! 5 then",
        choice4: "    if (i != 5)",
        answer: 4
    },
    {
        question : "How does a FOR loop start?",
        choice1: "     for i = 1 to 5",
        choice2: "     for (i = 0; i <= 5)",
        choice3:"      for (i <= 5; i++)",
        choice4: "     for (i = 0; i <= 5; i++)",
        answer: 4
    },
    {
        question : "How can you add a comment in a JavaScript?",
        choice1: "    'This is a comment ",
        choice2: "     <!--This is a comment--> ",
        choice3: "     //This is a comment",
        choice4: "     /*This is a comment */",
        answer: 3
    },
    {
        question : "What is the correct way to write a JavaScript array?",
        choice1: "    var colors = ['red', 'green', 'blue'] ",
        choice2: "    var colors = (1:'red', 2:'green', 3:'blue') ",
        choice3: "    var colors = 'red', 'green', 'blue' ",
        choice4: "    var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')" ,
        answer: 1
    },
    {
        question : "How do you find the number with the highest value of x and y?",
        choice1: "   ceil(x, y) ",
        choice2: "   Math.max(x, y) ",
        choice3: "    Math.ceil(x, y)",
        choice4: "    top(x, y)" ,
        answer: 2
    }

];



const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 11;


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();


  /*   game.classList.remove("hidden");
    loader.classList.add("hidden"); */
}

getNewQuestions= () =>{
    if(availableQuestions === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html");
    }
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    questionCounter ++;

    progressText.innerText =`Question ${questionCounter}/${MAX_QUESTIONS}`; 

  

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex,1);
    acceptingAnswers = true;

};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers)return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorect";
        
        if( classToApply === "correct"){
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
      
        setTimeout( () =>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestions();
        }, 1000);
        
     
    });
});

incrementScore = num =>{
    score += num;
    scoreText.innerText = score;
}


startGame();
