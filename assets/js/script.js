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

const alternativeButtons = document.getElementById("alternatives-box");
let currentQuestionIndex;
let shuffledQuestions;


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
    console.log("clicked easy button");
});
mediumButton.addEventListener("click", function () {
    runGame("medium");
    console.log("clicked medium button");
});
hardButton.addEventListener("click", function () {
    runGame("hard");
    console.log("clicked hard button");
});

// Game

function runGame(difficulty) {
    if (difficulty === "easy") {
        shuffledQuestions = easyQuestions.sort(() => Math.random() - .5);
        currentQuestionIndex = 0;
        console.log("easy game");
    } else if (difficulty === "medium") {
        shuffledQuestions = mediumQuestions.sort(() => Math.random() - .5);
        currentQuestionIndex = 0;
        console.log("medium game");
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
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

function showQuestion(questions) {
    questionText.innerHTML = questions.question;
    answer1.innerHTML = questions.a;
    answer2.innerHTML = questions.b;
    answer3.innerHTML = questions.c;
    answer4.innerHTML = questions.d;
};

function selectAnswer() {

}