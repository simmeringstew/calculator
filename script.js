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
let calculatedEquation = false;
let lastInputOperator = false;
let equation = [];

// function for if a number is clicked
function clickedNumber() {

    if (calculatorScreen.textContent === "+" || calculatorScreen.textContent === "-" || calculatorScreen.textContent === "x" || calculatorScreen.textContent === "\u00F7") {
        calculatorScreen.textContent = "";
    }

    if (this.id === "decimal") {
        addDecimal();
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
    if (calculatorScreen.textContent === "") {
        return;
    }
    else if (this.id === "clear") {
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
function addDecimal() {
    if (calculatorScreen.textContent.includes(".") || calculatedEquation === true) {
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
    if (calculatorScreen.textContent === "" || calculatedEquation === true) {
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
    if (calculatedEquation === true && lastInputOperator === false) {
        clearCalculator();
    }
    else if (lastInputOperator === true) {
        calculatorScreen.textContent = number;
        lastInputOperator = false;
    }
    else if (calculatorScreen.textContent === "") {
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
    calculatedEquation = false;
    lastInputOperator = false;
    equation = [];
    calculatorScreen.textContent = "";
}

// checks to see if the equation is ready to be evaluated and if it is passes on to do that
function checkEquation() {
    if (equation.length === 2) {
        const hasNumber = checkNumber();
        if (hasNumber === true) {
            equation.push(calculatorScreen.textContent);
            evaluateEquation();
            lastInputOperator = false;
        }
        else {
            return;
        }
    }
}

// evaluates the equation
async function evaluateEquation() {
    let answer = undefined;
    if (equation[1] === "+") {
        answer = Number(equation[0]) + Number(equation[2]);
    }
    else if (equation[1] === "-") {
        answer = Number(equation[0]) - Number(equation[2]);
    }
    else if (equation[1] === "x") {
        answer = Number(equation[0]) * Number(equation[2]);
    }
    else {
        if (Number(equation[2]) === 0) {
            calculatorScreen.textContent = "Error";
            await sleep(1500);
            clearCalculator();
            return;
        }
        else {
            answer = Number(equation[0]) / Number(equation[2]);
        }
    }

    if (answer > 999999999 || answer < -999999999) {
        calculatorScreen.textContent = "Infinity";
        await sleep(1500);
        clearCalculator();
        return;
    }

    if (Number.isInteger(answer) === false) {
        answer = round(answer);
    }

    calculatorScreen.textContent = answer;
    previousSolution = answer;
    currentNumber = undefined;
    equation = [previousSolution];
    calculatedEquation = true;
}

// adds the operator the the equation array
function addOperator(operator) {
    if (calculatorScreen.textContent === "." || calculatorScreen.textContent === "-.") {
        return;
    }
    else if (equation.length === 0) {
        equation.push(calculatorScreen.textContent);
        equation.push(operator);
        calculatorScreen.textContent = operator;
    }
    else if (equation.length === 1) {
        equation.push(operator);
        calculatorScreen.textContent = operator;
        calculatedEquation = false;
    }
    else if (equation.length === 2) {
        calculatedEquation = false;
        const hasNumber = checkNumber();
        if (hasNumber === true) {
            equation.push(calculatorScreen.textContent);
            evaluateEquation();
            equation.push(operator);
            lastInputOperator = true;
        }
        else {
            return;
        }
    }
}

// handles rounding numbers to 2 decimal places
function round(number) {
    return +(Math.round(number + "e+2") + "e-2");
}

// function to see if there is a number in the third spot
function checkNumber() {
    return /\d/.test(calculatorScreen.textContent);
}

// sleep function for when there are errors to keep them there a bit then reset
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}