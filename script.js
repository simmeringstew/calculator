// selects the elements on the page that will be used
const calculator = document.querySelector(".calculator-body");
let screen = document.querySelector(".calculator-screen").textContent;

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

// placeholder function
function clickedNumber() {
    console.log(this.id);
}

// placeholder function
function clickedOperator() {
    console.log(this.id);
}