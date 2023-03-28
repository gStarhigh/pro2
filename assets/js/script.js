// Variables
const startBtn = document.getElementById("start-btn");
const usernameForm = document.getElementById("username-form");
const usernameInput = document.getElementById("username");
const welcomeSection = document.getElementById("welcome-game-area");
const difficultySection = document.getElementById("difficulty-game-area");
const questionsSection = document.getElementById("questions-game-area");
const finishedSection = document.getElementById("finished-game-area");
const rulesSection = document.getElementById("game-rules-section");
const easyButton = document.getElementById("easy-btn");
const mediumButton = document.getElementById("medium-btn");
const hardButton = document.getElementById("hard-btn");
const nextQuestionButton = document.getElementById("next-question");
const toDiffbutton = document.getElementById("to-diff-button");
const answer1 = document.getElementById("alternative-1");
const answer2 = document.getElementById("alternative-2");
const answer3 = document.getElementById("alternative-3");
const answer4 = document.getElementById("alternative-4");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementsByClassName("alternatives");


let currentQuestionIndex;
let shuffledQuestions;
let isDisabled = false;


// Focus on the username box when the page is loaded
document.getElementById("username").focus();

// Adds the hide class to all sections except the welcome section
difficultySection.classList.add("hide");
questionsSection.classList.add("hide");
finishedSection.classList.add("hide");
rulesSection.classList.add("hide");

// Removes the hide class from the welcome section
welcomeSection.classList.remove("hide");

/**
 * Listens after a click from the user on the start button, checks so the username is not empty,
 * then removes the hide element from the difficulty 
 * section and adds it to the welcome section
 */
startBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var username = usernameInput.value.trim();
    if (username === "") {
        alert("Gamer tag can't be empty, please choose a Gamer tag and try again!");
        return;
    }

    // If the username is not empty, remove the hide class from the difficulty section
    welcomeSection.classList.add("hide");
    rulesSection.classList.remove("hide");
});


// Listens for a submit event on the username form, but does not perform any action
usernameForm.addEventListener("submit", function (event) {
    event.preventDefault();
});


/**
 * Listens for a click on the to difficulty section button and then removes the hide element
 *  on the difficulty section and adds it to the rules section
 */
toDiffbutton.addEventListener("click", function (event) {
    event.preventDefault();

    difficultySection.classList.remove("hide");
    rulesSection.classList.add("hide");
});



// Game Section

// Event listeners for the difficulties
easyButton.addEventListener("click", function () {
    runGame("easy");
});
mediumButton.addEventListener("click", function () {
    runGame("medium");
});
hardButton.addEventListener("click", function () {
    runGame("hard");
});

// Next question button event listener

nextQuestionButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion();
});

// Game

function runGame(difficulty) {
    if (difficulty === "easy") {
        shuffledQuestions = easyQuestions.sort(() => Math.random() - .5);
        currentQuestionIndex = 0;
    } else if (difficulty === "medium") {
        shuffledQuestions = mediumQuestions.sort(() => Math.random() - .5);
        currentQuestionIndex = 0;
    } else if (difficulty === "hard") {
        shuffledQuestions = hardQuestions.sort(() => Math.random() - .5);
        currentQuestionIndex = 0;
    }
    difficultySection.classList.add("hide");
    questionsSection.classList.remove("hide");


    // Calls setNextQuestions function
    setNextQuestion();
};

function setNextQuestion() {
    isDisabled = false;
    resetQuiz();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].removeAttribute("disabled");
    }
};


function showQuestion(questions) {
    questionText.innerHTML = questions.question;
    answer1.innerHTML = questions.a;
    answer1.setAttribute("data-answer", "a");
    answer2.innerHTML = questions.b;
    answer2.setAttribute("data-answer", "b");
    answer3.innerHTML = questions.c;
    answer3.setAttribute("data-answer", "c");
    answer4.innerHTML = questions.d;
    answer4.setAttribute("data-answer", "d");
};

// Add a eventlistener for the answer buttons to see what value was clicked

answer1.addEventListener("click", function () {
    checkAnswer("a");
});
answer2.addEventListener("click", function () {
    checkAnswer("b");
});
answer3.addEventListener("click", function () {
    checkAnswer("c");
});
answer4.addEventListener("click", function () {
    checkAnswer("d");
});

function checkAnswer(answer) {
    if (isDisabled) {
        return;
    }
    isDisabled = true;
    const correctAnswer = shuffledQuestions[currentQuestionIndex].answer;
    if (answer === correctAnswer) {
        // If the answer is correct
        console.log("correct answer");
        nextQuestionButton.classList.remove("hide");
        document.querySelector(`[data-answer="${correctAnswer}"]`).classList.add("correct-answer");
    } else {
        // the answer is incorrect
        console.log("incorrect answer");
        document.querySelector(`[data-answer="${answer}"]`).classList.add("wrong-answer");
    }
};


function resetQuiz() {
    nextQuestionButton.classList.add("hide");
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].classList.remove("correct-answer", "wrong-answer");
    }
};