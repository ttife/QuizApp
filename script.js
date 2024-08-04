const questions = [
    {
        question: "Who is the current president of Nigeria?",
        answers: [
            { text : "Muhammed Buhari", correct: false},
            { text : "Peter Obi", correct: false},
            { text : "Bola Ahmed Tinubu", correct: true},
            { text : "Atiku Abubakar", correct: false},
        ]
    },
    {
        question: "What team does Gavi currently play for?",
        answers: [
            { text : "Real Madrid", correct: false},
            { text : "Barcelona", correct: true},
            { text : "Manchester United", correct: false},
            { text : "Arsenal", correct: false},
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text : "Rome", correct: false},
            { text : "Berlin", correct: false},
            { text : "Madrid", correct: false},
            { text : "Paris", correct: true},
        ]
    },
    {
        question: "How many days are in a week?",
        answers: [
            { text : "7", correct: true},
            { text : "6", correct: false},
            { text : "8", correct: false},
            { text : "4", correct: false},
        ]
    },
    {
        question: "What is the smallest unit of Life?",
        answers: [
            { text : "Molecule", correct: false},
            { text : "Organ", correct: false},
            { text : "Cell", correct: true},
            { text : "Atom", correct: false},
        ]
    }
];

const ElementQuestion = document.getElementById("correct");
const AnsBtn = document.getElementById("ansBtn");
const nextButton = document.getElementById("NextButton");

let currentQuestionIndex = 0;
let score = 0;

function StartQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    ElementQuestion.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        AnsBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", rightAnswer);
    });
};

function resetState(){
    nextButton.style.display = "none";
    while(AnsBtn.firstChild){
        AnsBtn.removeChild(AnsBtn.firstChild);
    }
};

function rightAnswer(c){
    const rightBtn = c.target;
    const itsCorrect = rightBtn.dataset.correct === "true";
    if(itsCorrect){
        rightBtn.classList.add("correct");
        score++;
    }else{
        rightBtn.classList.add("incorrect");
    }
    Array.from(AnsBtn.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function displayScore(){
    resetState();
    ElementQuestion.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again?";
    nextButton.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        displayScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }else{
        StartQuiz();
    }
});

StartQuiz();

