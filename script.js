// selects the elements on the page that will be used
const calculator = document.querySelector(".calculator-body");
let calculatorScreen = document.querySelector(".screen-text");

const numbers = document.querySelectorAll(".number");
numbers.forEach(number => {
    number.addEventListener("click", clickedNumber);
});

const operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
    operator.addEventListener("click", clickedOperator);
});

const lightDarkToggle = document.querySelector(".toggle");
lightDarkToggle.addEventListener("click", toggleLightDarkMode);

// toggles between dark and light mode when the toggle switch is pressed
function toggleLightDarkMode() {
    if (calculator.classList.contains("light-calculator")) {
        calculator.classList.remove("light-calculator");
        numbers.forEach(number => {
            number.classList.remove("light-number");
        });
        operators.forEach(operator => {
            operator.classList.remove("light-operator");
        });
    }
    else {
        calculator.classList.add("light-calculator");
        numbers.forEach(number => {
            number.classList.add("light-number");
        });
        operators.forEach(operator => {
            operator.classList.add("light-operator");
        });
    }
}

let previousSolution = undefined;
let currentNumber = undefined;
let equation = [];

// need an encomposing if len equation = 0 or 1 to see if things need to be replaced
// function for if a number is clicked
function clickedNumber() {

    if (calculatorScreen.textContent === "+" || calculatorScreen.textContent === "-" || calculatorScreen.textContent === "x" || calculatorScreen.textContent === "\u00F7") {
        calculatorScreen.textContent = "";
    }

    if (this.id === "decimal") {
        decimal();
    }
    else if (this.id === "plus-minus") {
        plusMinus();
    }
    else if (calculatorScreen.textContent === "" || calculatorScreen.textContent.length < 9) {
        addNumber(this.id);
    }
}

// function for if an operator is clicked
function clickedOperator() {
    if (this.id === "clear") {
        clearCalculator();
    }
    else if (this.id === "equals") {
        checkEquation();
    }
    else {
        addOperator(this.id);
    }
}

// Extra Functions for clickedNumber

// adds a decimal point if there is room remaining on the screen
function decimal() {
    if (calculatorScreen.textContent.includes(".")) {
        return;
    }
    else if (calculatorScreen.textContent.length <= 7) {
        const temp = calculatorScreen.textContent.concat(".");
        calculatorScreen.textContent = temp;
    }
    else {
        return;
    }
}

// adds or removes the negative symbol
function plusMinus() {
    if (calculatorScreen.textContent === "") {
        return;
    }
    else if (calculatorScreen.textContent.includes("-")) {
        const temp = calculatorScreen.textContent.replace("-", "");
        calculatorScreen.textContent = temp;
    }
    else {
        const minus = "-";
        const temp = minus.concat(calculatorScreen.textContent);
        calculatorScreen.textContent = temp;
    }
}

function addNumber(number) {
    if (calculatorScreen.textContent === "") {
        calculatorScreen.textContent = number;
    }
    else {
        calculatorScreen.textContent = "" + calculatorScreen.textContent + number;
    }
}

// Extra functions for clickedOperator

// resets the calculator app
function clearCalculator() {
    previousSolution = undefined;
    currentNumber = undefined;
    equation = [];
    calculatorScreen.textContent = "";
}

// checks to see if the equation is ready to be evaluated and if it is passes on to do that
function checkEquation() {
    if (equation.length === 2) {
        const hasNumber = /\d/.test(calculatorScreen.textContent);
        if (hasNumber === true) {
            equation.push(calculatorScreen.textContent);
            evaluateEquation();
        }
        else {
            return;
        }
    }
}

// evaluates the equation
function evaluateEquation() {
    let answer = undefined;
    if (equation[1] === "+") {
        answer = equation[0] + equation[2];
    }
    else if (equation[1] === "-") {
        answer = equation[0] - equation[2];
    }
    else if (equation[1] === "x") {
        answer = equation[0] * equation[2];
    }
    else {
        answer = equation[0] / equation[2]; // need to add a check for divide by zero
    }
    calculatorScreen.textContent = answer;
    previousSolution = answer;
    currentNumber = undefined;
    equation = [previousSolution];
    // need to check if number is bigger than certain amount and need to check if there are decimals
}

// adds the operator the the equation array
function addOperator(operator) {
    if (equation.length === 0) {
        equation.push(calculatorScreen.textContent);
        equation.push(operator);
        calculatorScreen.textContent = operator;
    }
    else if (equation.length === 1) {
        equation.push(operator);
        calculatorScreen.textContent = operator;
    }
}