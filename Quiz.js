const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

startBtn.addEventListener('click', () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
});

exitBtn.addEventListener('click', () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
});

continueBtn.addEventListener('click', () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
});

tryAgainBtn.addEventListener('click', () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
   questionCount = 0;
    questionNumb = 1;
     userScore = 0;
     showQuestions(questionCount);
     questionCounter(questionNumb);

headerScore();
});

goHomeBtn.addEventListener('click', () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
   questionCount = 0;
    questionNumb = 1;
     userScore = 0;
     showQuestions(questionCount);
     questionCounter(questionNumb);


});

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.addEventListener('click', () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    } else {
        console.log('Question Completed');
        showResultBox();
    }
});

const optionlist = document.querySelector('.option-list');

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
   
    questionText.textContent = `${questions[index].numb}.${questions[index].question}`;

  
    let optionTag = document.createRange().createContextualFragment(`
        <div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>
    `);

    optionlist.innerHTML = '';
    optionlist.appendChild(optionTag);

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
      
        option[i].addEventListener('click', () => optionSelected(option[i]));
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionlist.children.length;

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } 
    else {
        answer.classList.add('incorrect');

        for (let i = 0; i < allOptions; i++) {
            if (optionlist.children[i].textContent == correctAnswer) {
                optionlist.children[i].classList.add('correct');
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        optionlist.children[i].classList.add('disable');
    }

    nextBtn.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
  
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
   
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue =0;
    let progressEndValue = (userScore / questions.length)*100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#2006e6 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`;
        if (progressStartValue === progressEndValue) {
            clearInterval(progress);
        }
    }, speed);

}


// const timerElement = document.querySelector('.timer'); // Adjust the selector based on your HTML structure

// let timerSeconds = 60; // Set the initial time in seconds

// // Function to update the timer display
// function updateTimer() {
//     const minutes = Math.floor(timerSeconds / 60);
//     const seconds = timerSeconds % 60;
//     timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
// }

// // Function to handle each second of the timer
// function handleTimer() {
//     updateTimer();

//     if (timerSeconds === 0) {
//         // Handle the case when the timer reaches 0 (e.g., show result box)
//         showResultBox();
//         clearInterval(timerInterval);
//     } else {
//         timerSeconds--;
//     }
// }

// // Set an interval to update the timer every second
// const timerInterval = setInterval(handleTimer, 1000);

