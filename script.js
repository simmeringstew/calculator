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

// placeholder function
function clickedNumber() {
    if (isNaN(this.id) === false) {
        previousSolution = this.id;
        calculatorScreen.textContent = previousSolution;
    }
    else if (this.id === "decimal") {
        decimal();
    }
    else if (this.id === "plus-minus") {
        plusMinus();
    }
}

// placeholder function
function clickedOperator() {
    if (this.id === "clear") {
        previousSolution = undefined;
        currentNumber = undefined;
        equation = [];
        calculatorScreen.textContent = "";
    }
}

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