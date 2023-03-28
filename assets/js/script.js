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
const playAgainButton = document.getElementById("play-again-button");
const finishedHeadline = document.getElementById("finished-headline");
const finishedScoreText = document.getElementById("finished-score-text");


let currentQuestionIndex;
let shuffledQuestions;
let isDisabled = false;
//keeping track of the number of questions answered
let questionsAnswered = 0;
let oldScore = 0;
let oldWrongScore = 0;


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
    finishedHeadline.innerText = `Congratulations ${username}! You finished the game!`;
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
    currentQuestionIndex++;
    setNextQuestion();
});

// Play again button, when clicked, hides the finished section and displays the difficulties section.

playAgainButton.addEventListener("click", function () {
    finishedSection.classList.add("hide");
    difficultySection.classList.remove("hide");
    questionsAnswered = 0;
    document.getElementById("correct-score-amount").innerText = 0;
    document.getElementById("wrong-score-amount").innerText = 0;
})

/**
 * Runs the game and shows the questions depending on the users 
 * difficulty settingand sorts the questions randomly and
 */
function runGame(difficulty) {
    if (difficulty === "easy") {
        shuffledQuestions = easyQuestions.sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
    } else if (difficulty === "medium") {
        shuffledQuestions = mediumQuestions.sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
    } else if (difficulty === "hard") {
        shuffledQuestions = hardQuestions.sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
    }
    difficultySection.classList.add("hide");
    questionsSection.classList.remove("hide");

    // Calls setNextQuestions function
    setNextQuestion();
}


function setNextQuestion() {
    isDisabled = false;
    resetQuiz();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].removeAttribute("disabled");
    }
}

// Shows the question and the alternatives in the correct buttons, also stores the data answer for each button.
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
}


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

/**
 * Checks if the user clicked the correct answer and then disables the buttons so they cannot change answer.
 * Then shows the next question button and depending on if the user got it right, increases the correct or wrong
 * answers counter.
 */
function checkAnswer(answer) {
    if (isDisabled) {
        return;
    }
    isDisabled = true;
    const correctAnswer = shuffledQuestions[currentQuestionIndex].answer;

    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].removeAttribute("disabled");
        if (answerButtons[i].getAttribute("data-answer") === correctAnswer) {
            answerButtons[i].classList.add("correct-answer");
            if (answer === correctAnswer) {
                incrementScore();
            } // If the users answer was not correct:
        } else {
            answerButtons[i].classList.add("wrong-answer");
            if (answer !== correctAnswer) {
                incrementWrongAnswer();
            }
        }
    }
    nextQuestionButton.classList.remove("hide");
    questionsAnswered += 1;
    if (questionsAnswered === 5) {
        questionsSection.classList.add("hide");
        finishedSection.classList.remove("hide");
    }
}


/**
 * Get the current score from the dom and increment it by 1
 */
function incrementScore() {
    oldScore = parseInt(document.getElementById("correct-score-amount").innerText);
    document.getElementById("correct-score-amount").innerText = ++oldScore;
    finishedScoreText.innerText = `You got ${oldScore} out of 5!`
}


/**
 * Get the current wrong score from the dom and increment it by 1
 */
function incrementWrongAnswer() {
    oldWrongScore = parseInt(document.getElementById("wrong-score-amount").innerText);
    document.getElementById("wrong-score-amount").innerText = ++oldWrongScore;
}



/**
 * Resets the quiz, adds the Hide element to the next button and
 * removes the classes to the buttons for the next question.
 */
function resetQuiz() {
    nextQuestionButton.classList.add("hide");
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].classList.remove("correct-answer", "wrong-answer");
    }
}