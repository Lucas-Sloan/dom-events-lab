/*-------------------------------- Constants --------------------------------*/

//maps the operator symbols to their functions
const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
};

/*-------------------------------- Variables --------------------------------*/

let currentInput = ''; // string that stores current number
let previousInput = ''; // string that stores previous number
let operator = null; //variable to store the current operator

/*------------------------ Cached Element References ------------------------*/
const buttons = document.querySelectorAll('.button'); //represents the buttons
const calculator = document.querySelector('#calculator'); // represents the calculator
const display = document.querySelector('.display'); //represents the display

/*----------------------------- Event Listeners -----------------------------*/

/*iterates over each button element, adds a click event listener to each button.
When clicked, the handleButtonClick function is called with the text of the button as an argument. */
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
     handleButtonClick(event.target.innerText);
    });
  });
  
/*-------------------------------- Functions --------------------------------*/

//determines the type of button that was clicked and calls the appropriate handler function
function handleButtonClick(value) {
    //checks if the value is a number
    if (!isNaN(value)) {
        handleNumber(value);
    //checks if the value is the clear button
    } else if (value === 'C') {
        clearCalculator();
    //checks if the value is the equal button
    } else if (value === '='){
        calculateResult();
    } else {
        handleOperator(value);
    }
    //updates the display with the current input
    updateDisplay();
}

//turns the clicked number into currentInput
function handleNumber(number) {
    currentInput += number;
}

//manages the behavior when an operator is clicked
function handleOperator(op) {
    //if there is no input, it returns
    if (currentInput === '') {
        return;
    }
    //if there is a previous input, calculates the result
    if (previousInput !== '') {
        calculateResult();
    }
    operator = op; // sets operator to the clicked operator
    previousInput = currentInput; // moves current input to previous input
    currentInput = ''; // resets current input
}

// performs calculations based on current, previous inputs and the operator
function calculateResult() {
    //checks if any of the values are missing and returns early if they are
    if (currentInput === '' || previousInput === '' || operator === null)  {
        return;
    }
    //converts string inputs to floating numbers
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    // retrieves the appropriate operation function from operations object
    const operation = operations[operator];
    //checks if operation exists
    if (operation) {
        currentInput = operation(prev, current).toString(); //performs and stores the result in currentinput as a string
    }
    operator = null; // resets operator
    previousInput = ''; // clears the previous input
}

// resets all input values and the operator
function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = null;
}

// updates the calculator display
function updateDisplay() {
    display.innerText = currentInput || previousInput || '0';
}