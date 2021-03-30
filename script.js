let result = null;
let currentValue = 0;
let memoryValue = 0;
let displayArray = [];
let acCounter = 0;
let equalState = '';
let isEqualStateActive = false;

const resultDisplay = document.getElementById('result');
const clear = document.getElementById('clear');
clear.addEventListener('click', clearResult);
const positiveNegative = document.getElementById('positive-negative').addEventListener('click', negateValue);
const percent = document.getElementById('percent').addEventListener('click', returnPercent);
const division = document.getElementById('divide').addEventListener('click', divide);
const multiplier = document.getElementById('multiply').addEventListener('click', multiply);
const subtraction = document.getElementById('subtract').addEventListener('click', subtract);
const addition = document.getElementById('add').addEventListener('click', add);
const equal = document.getElementById('equal').addEventListener('click', operate);
const decimal = document.getElementById('decimal').addEventListener('click', addDecimal);
const zeroButton = document.getElementById('zero').addEventListener('click', (e) => {inputValue(0)});
const oneButton = document.getElementById('one').addEventListener('click', (e) => {inputValue(1)});
const twoButton = document.getElementById('two').addEventListener('click', (e) => {inputValue(2)});
const threeButton = document.getElementById('three').addEventListener('click', (e) => {inputValue(3)});
const fourButton = document.getElementById('four').addEventListener('click', (e) => {inputValue(4)});
const fiveButton = document.getElementById('five').addEventListener('click', (e) => {inputValue(5)});
const sixButton = document.getElementById('six').addEventListener('click', (e) => {inputValue(6)});
const sevenButton = document.getElementById('seven').addEventListener('click', (e) => {inputValue(7)});
const eightButton = document.getElementById('eight').addEventListener('click', (e) => {inputValue(8)});
const nineButton = document.getElementById('nine').addEventListener('click', (e) => {inputValue(9)});

console.log(displayArray.length);

function inputValue(num) {
    // Allow for new calculations after a previous calculation when not selecting
    // an operator
    currentValue = num;
    console.log(`cur: ${currentValue}`);
    updateDisplay(currentValue);
}

function updateDisplay(value) {
    // if(value === '.') {
    //     value = '0.';
    // }
    
    if(displayArray.length !== 0 || Math.abs(value) > 0) {
        displayArray.push(value);
        resultDisplay.textContent = displayArray.join('');
        clear.textContent = 'C';
    }
}

function operate() {
    currentValue = Number(displayArray.join(''));
        
    if(equalState === 'addition') {
        result = memoryValue + currentValue;
        connectResultToUpdateDisplay(result);
    }
    else if(equalState === 'subtraction') {           
        result = memoryValue.splice((a, b) => a + b, 0);
        connectResultToUpdateDisplay(result);
    }
    else if(equalState === 'multiplication') {
        result = memoryValue.reduce((a, b) => a * b, 0);
        connectResultToUpdateDisplay(result);
    }
    else if(equalState === 'division') {
        result = memoryValue.reduce((a, b) => a / b, 0);
        connectResultToUpdateDisplay(result);
    }
    console.log(`mem: ${memoryValue}`);
    console.log(`res ${result}`)
}

function connectResultToUpdateDisplay(result) {
    memoryValue = result;
    displayArray = [];
    updateDisplay(result);
    displayArray = [];
    currentValue = null;
    equalState = '';
    isEqualStateActive = false;
}

function add() {
    // highlight + button
    operator('addition');
    // Unhighlight + button
}

function subtract() {
    // highlight + button
    operator('subtraction');
    // Unhighlight + button
}

function multiply() {
    // highlight + button
    operator('multiplication');
    // Unhighlight + button
}

function divide() {
    // highlight + button
    operator('division');
    // Unhighlight + button
}

// Prepares for an equation following an operator and passes first number into
// memoryValue
function operator(state) {
    if(currentValue !== null) {
        console.log(currentValue);
        memoryValue = Number(displayArray.join(''));
    }
    else {
        memoryValue = result;
    }
    currentValue = [];
    displayArray = [];
    equalState = state;
    isEqualStateActive = true;
}

function clearResult() {
    resultDisplay.textContent = 0;
    result = null;
    currentValue = 0;
    memoryValue = 0;
    displayArray = [];
    clear.textContent = 'AC';
    equalState = '';
    isEqualStateActive = false;
}

function resetACCounter() {
    acCounter = 0;
}

function negateValue() {
    currentValue *= -1;
    displayArray = [];
    updateDisplay(currentValue);
}

function returnPercent() {
    return;
}

function addDecimal() {
    inputValue('.');
}
