document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const clearButton = document.getElementById("clear");
    const calculateButton = document.getElementById("calculate");
    const numberButtons = document.querySelectorAll(".number");
    const operatorButtons = document.querySelectorAll(".operator");

    let currentInput = "";
    let currentOperator = "";
    let firstOperand = "";

    // Function to update the display screen
    function updateDisplay() {
        display.value = currentInput || "0";
    }

    // Event listener for number buttons
    numberButtons.forEach((button) => {
        button.addEventListener("click", () => {
            currentInput += button.value;
            updateDisplay();
        });
    });

    // Event listener for operator buttons
    operatorButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (currentInput !== "") {
                if (firstOperand === "") {
                    firstOperand = currentInput;
                } else {
                    // If there's already a first operand and an operator, perform the previous calculation
                    firstOperand = calculate(firstOperand, currentInput, currentOperator);
                }

                currentInput = "";
                currentOperator = button.value;
            }
        });
    });

    // Event listener for the clear button
    clearButton.addEventListener("click", () => {
        currentInput = "";
        currentOperator = "";
        firstOperand = "";
        updateDisplay();
    });

    // Event listener for the calculate button
    calculateButton.addEventListener("click", () => {
        if (currentInput !== "") {
            if (firstOperand !== "") {
                currentInput = calculate(firstOperand, currentInput, currentOperator);
                firstOperand = "";
                currentOperator = "";
                updateDisplay();
            }
        }
    });

    // Function to perform calculations
    function calculate(num1, num2, operator) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);

        switch (operator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "/":
                if (num2 === 0) {
                    return "Error";
                }
                return num1 / num2;
            default:
                return num2;
        }
    }
});
