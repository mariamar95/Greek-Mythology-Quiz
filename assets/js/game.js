const question = document.querySelector("#question");
const choices = Array.from(document.getElementsByClassName('choice'));
const scoreText = document.querySelector(".score");
const progressBarFull = document.querySelector(".progressBarFull");
const buttonParent = document.querySelector('.btns-container');
const timer = document.querySelector('.timer');

let currentQuestion = {};
let score = 0;
let availableQuestions = [];
let questionCounter = 0;
let acceptingAnswers = true;
let timerInterval, questionTimeoutOne, questionTimeoutTwo;

let questions = [{
        question: 'What is the name of the Greek goddess of the earth?',
        choice1: 'Gaea',
        choice2: 'Hera',
        choice3: 'Aphrodite',
        choice4: 'Demeter',
        answer: 1,
    },
    {
        question: 'Which Greek goddess in known as the goddess of chance?',
        choice1: 'Atropos',
        choice2: 'Hera',
        choice3: 'Aphrodite',
        choice4: 'Tyche',
        answer: 4,
    },
    {
        question: 'In Greek mythology who shaped and formed the dreams?',
        choice1: 'Cybele',
        choice2: 'Eunostus',
        choice3: 'Morpheus',
        choice4: 'Dryades',
        answer: 3,
    },
    {
        question: 'The name of which Greek goddess means youth or in the prime life?',
        choice1: 'Harmonia',
        choice2: 'Athena',
        choice3: 'Hebe',
        choice4: 'Hestia',
        answer: 3,
    },
    {
        question: 'Which Greek goddess is considered the queen of gods?',
        choice1: 'Ananke',
        choice2: 'Athena',
        choice3: 'Nemesis',
        choice4: 'Hera',
        answer: 4,
    },
    {
        question: 'How long did the Trojan War last?',
        choice1: '35 years',
        choice2: '40 years',
        choice3: '10 years',
        choice4: '15 years',
        answer: 3,
    },
    {
        question: 'What is the staff carried by Hermes called?',
        choice1: 'Hammer',
        choice2: 'Bow',
        choice3: 'Trident',
        choice4: 'Caduceus',
        answer: 4,
    },
    {
        question: 'How many heads did Cerberus, the guards of the underworld, have?',
        choice1: '3',
        choice2: '2',
        choice3: '4',
        choice4: '12',
        answer: 1,
    },
    {
        question: 'Who fell in love with his reflection?',
        choice1: 'Narcissus',
        choice2: 'Cladeus',
        choice3: 'Pan',
        choice4: 'Hestia',
        answer: 1,
    },
    {
        question: 'Who is the Greek god of love?',
        choice1: 'Thaumas',
        choice2: 'Pontos',
        choice3: 'Eros',
        choice4: 'Phorcys',
        answer: 3,
    },
    {
        question: 'Which of these in Greek mythology is the god of the sea, earthquakes, and horses?',
        choice1: 'Aristaeus',
        choice2: 'Poseidon',
        choice3: 'Notus',
        choice4: 'Peneus',
        answer: 2,
    },
    {
        question: 'In Greek mythology, which Titan was condemned to holding up the sky for eternity?',
        choice1: 'Helios',
        choice2: 'Hyperion',
        choice3: 'Atlas',
        choice4: 'Phoebe',
        answer: 3,
    },
    {
        question: 'Who was the mother and wife of Uranus?',
        choice1: 'Peitharchia',
        choice2: 'Athena',
        choice3: 'Gaea',
        choice4: 'Ceto',
        answer: 3,
    },
    {
        question: 'Who lured sailors with their enchanting music and sweet song?',
        choice1: 'Harmonia',
        choice2: 'Satyr',
        choice3: 'Siren',
        choice4: 'Sea goat',
        answer: 3,
    },
    {
        question: 'Which sea monster has 12 feet and 6 heads?',
        choice1: 'Scylla',
        choice2: 'Euryale',
        choice3: 'Aello',
        choice4: 'Ocypete',
        answer: 1,
    },
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNextQuestion();
};

/* Shows a new question 
-If you reach the maximum questions it takes you to the end page
-Loads up a random question that didn't come up before during this game
-Load up the answers to the question
-Updates the progress bar
-Sets a timer when the question loads up
-Disables buttons when the timer goes off
-Show the correct asnwer when the timer goes off
-Shuffels the answers so that they don't show up on the same button*/
getNextQuestion = () => {
    //clearing all intervals and timeouts from the previous question
    if(timerInterval) {
        clearInterval(timerInterval);
        clearTimeout(questionTimeoutOne);
        clearTimeout(questionTimeoutTwo);}

    //shuffling the answers
    for (var i = choices.length; i >= 0; i--) {
        buttonParent.appendChild(choices[Math.random() * i | 0]);
    }

    let counter = 10;

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("./end.html");
    }

    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;
    questionCounter++;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    let correctAnswerIndex = currentQuestion.answer;
    let correctButton = document.querySelector("[data-number='" + correctAnswerIndex + "']");

    choices.forEach(choice => {
        const number = choice.dataset.number;
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);
    acceptingAnswers = true;

    //timeouts for the current question's processes after 15s and 10s respectively
    questionTimeoutOne = setTimeout(() => {
        getNextQuestion();
        correctButton.classList.remove("correct");
        buttonParent.classList.remove("disabled");
    }, 15000);

    questionTimeoutTwo = setTimeout(() => {
        correctButton.classList.add("correct");
        buttonParent.classList.add("disabled");
    }, 10000);

    //timer interval changes after every 1s
    timerInterval = setInterval(() => {
        counter--;
        if (counter == 0) {
            clearInterval(timerInterval);
        }
        timer.innerHTML = counter;
    }, 1000);
};

/* 
Changes the answer button to green or red for right or wrong answer
Increments the score if the answer is correct*/
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }
        selectedChoice.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.classList.remove(classToApply);
            getNextQuestion();
        }, 1000);
    });
});

// Updates the score every time a user asnwers a question
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();