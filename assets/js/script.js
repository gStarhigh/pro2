// Variabels

const startBtn = document.getElementById("start-btn");
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





// Focus on the username box when the page is loaded
document.getElementById("username").focus();


// Adds the hide class to all sections except the welcome section
difficultySection.classList.add("hide");
questionsSection.classList.add("hide");
finishedSection.classList.add("hide");
rulesSection.classList.add("hide");

//Removes the hide class from the welcome section
welcomeSection.classList.remove("hide");


/**
 * Listens after a click from the user on the start button, then removes the hide
 * element from the difficulty section and adds it to the welcome section
 */
startBtn.addEventListener("click", function (event) {
    event.preventDefault();

    welcomeSection.classList.add("hide");
    difficultySection.classList.remove("hide");
});