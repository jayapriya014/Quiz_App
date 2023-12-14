const questions = [
    {
        question: "What does HTML stand for?",
        answers:[
            {text: "Hyperlinks and Text Markup Language",correct:false},
            {text: "Hyper Text Markup Language",correct:true},
            {text: "Home Tool Markup Language",correct:false},
            {text: "Hyper Tool Markup Language",correct:false},
        ]
    },
    {
        question: "Who is making the Web standards? ",
        answers:[
            {text: "The World Wide Web Consortium",correct:true},
            {text: "Mozilla",correct:false},
            {text: "Microsoft",correct:false},
            {text: "Google",correct:false},
        ]
    },
    {
        question: "Choose the correct HTML tag for the largest heading?",
        answers:[
            {text: "h6",correct:false},
            {text: "head",correct:false},
            {text: "h1",correct:true},
            {text: "heading",correct:false},
        ]
    },
    {
        question: "What is the correct HTML tag for inserting a line break? ",
        answers:[
            {text: "break",correct:false},
            {text: "br",correct:true},
            {text: "lb",correct:false},
            {text: "rb",correct:false},
        ]
    },
    {
        question: " How can you make a numbered list? ",
        answers:[
            {text: "list",correct:false},
            {text: "dl",correct:false},
            {text: "ul",correct:false},
            {text: "ol",correct:true},
        ]
    }
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex + 1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=> {
        const button =document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
 function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectBtn=e.target;
    const isCorrect=selectBtn.dataset.correct==="true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});




startQuiz();
