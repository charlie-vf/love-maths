// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
            let gameType = this.getAttribute("data-type");
            runGame(gameType);
            }
        })
    }

    runGame("addition");
})

/** 
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {

    // Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2)
    } else {
        alert(`Unknown game type: ${gameType}`)
        throw `Unknown game type: ${gameType}. Aborting!`
    }
}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {

    // Checks the user answer, retrieves it from the dom, 
    // checks the correct answer with calculatedAnswer
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    // isCorrect is either true or false based on the user's answer
    // vs the correct answer
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert('Hey! You got it right!');
        // tells checkAnswer function to call incrementScore function if answer is correct
        incrementScore();
    } else {
        alert(`You answered ${userAnswer} but the answer was ${calculatedAnswer[0]}.`);
        // tells checkAnswer to call incrementWrongAnswer function if answer is incorrect
        incrementWrongAnswer();
    }

    // run another game of the same type
    runGame(calculatedAnswer[1]);
}

/** Gets the operands (the numbers) and the operator (plus, minus, multiply, divide)
 * directly from the DOM, and returns the correct answer
 */
function calculateCorrectAnswer() {
    // parseInt ensures we get a whole number, rather than the default string
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    // want to get the correct answer based on the game type, which is determined by the
    // operator
    if (operator === '+') {
        return [operand1 + operand2, 'addition'];
        } else {
            alert(`Unimplemented operator ${operator}`);
            throw `Unimplemented operator ${operator}. Aborting!`;
        }
    }

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById('score').innerText);
    // now we've retrieved the score and put it in the variable oldScore
    // we write it back to the DOM - setting the score inner text to the new score
    // ++ is a compound addition operator - could've used oldScore + 1
    // if the ++ was after the variable, javaScript would get the ID of score, set the
    // inner text to oldScore and /then/ add one, so we wouldn't see the score being
    // updated as it would be written back to the DOM before being updated
    document.getElementById('score').innerText = ++oldScore;
}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion() {

}