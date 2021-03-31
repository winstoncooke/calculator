let result = null;
let currentValue = 0;
let memoryValue = 0;
let displayArray = [];
let acCounter = 0;
let equalState = '';
let isEqualStateActive = false;
let equalCounter = 0;
let percentValue;
let negateValue;
let decimalCount = 0;

const resultDisplay = document.getElementById('result');
const clear = document.getElementById('clear');
clear.addEventListener('click', clearResult);
const calcKeys = document.querySelector('.btn-container');
const positiveNegative = document.getElementById('positive-negative').addEventListener('click', returnNegateValue);
const percent = document.getElementById('percent').addEventListener('click', returnPercent);
const division = document.getElementById('divide').addEventListener('click', divide);
const multiplier = document.getElementById('multiply').addEventListener('click', multiply);
const subtraction = document.getElementById('subtract').addEventListener('click', subtract);
const addition = document.getElementById('add').addEventListener('click', add);
const equal = document.getElementById('equal').addEventListener('click', operator);
const decimal = document.getElementById('decimal').addEventListener('click',  (e) => {inputValue('.')});
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

function inputValue(num) {
    // Allow for new calculations after a previous calculation when not selecting
    // an storeValue
    currentValue = num;
    updateDisplay(currentValue);
}

function updateDisplay(value) {   
    if(value === '.' && decimalCount === 0 && displayArray.length === 0){
        displayArray.push('0.');
        resultDisplay.textContent = displayArray.join('');
        clear.textContent = 'C';
        decimalCount++;
    }
    else if(value === '.' && decimalCount === 0) {
        displayArray.push(value);
        resultDisplay.textContent = displayArray.join('');
        clear.textContent = 'C';
        decimalCount++;
    }
    
    else if((displayArray.length !== 0 || Math.abs(value) > 0) && displayArray.length <
        5 && value !== '.') {
        displayArray.push(value);
        resultDisplay.textContent = displayArray.join('');
        clear.textContent = 'C';

    }
}

function operator() {
    currentValue = Number(displayArray.join(''));
    if(equalState === 'addition') {
        result = round((memoryValue + currentValue), 3);
        connectResultToUpdateDisplay(result);
    }
    else if(equalState === 'subtraction') {           
        result = round((memoryValue - currentValue), 3);
        connectResultToUpdateDisplay(result);
    }
    else if(equalState === 'multiplication') {
        result = round((memoryValue * currentValue), 3);
        connectResultToUpdateDisplay(result);
    }
    else if(equalState === 'division') {
        if(currentValue === 0) {
            resultDisplay.textContent = 'Not a number';
        } else {
            result = round((memoryValue / currentValue), 3);
            connectResultToUpdateDisplay(result);
        }
    }
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }

function connectResultToUpdateDisplay(result) {
    memoryValue = result;
    displayArray = [];
    updateDisplay(result);
    displayArray = [];
    currentValue = null;
    equalState = '';
    isEqualStateActive = false;
    equalCounter--;
    decimalCount = 0;
}

function add() {
    // highlight + button
    checkToOperate('addition');
    // Unhighlight + button
}

function subtract() {
    // highlight + button
    checkToOperate('subtraction');
    // Unhighlight + button
}

function multiply() {
    // highlight + button
    checkToOperate('multiplication');
    // Unhighlight + button
}

function divide() {
    // highlight + button
    checkToOperate('division');
    // Unhighlight + button
}

// Enables operator button to serve the same function as the equal sign
function checkToOperate(state) {
    if(equalCounter === 1) {
        operator();
    }
    storeValue(state);
}

// Prepares for an equation following an storeValue and passes first number into
// memoryValue
function storeValue(state) {
    if(currentValue !== null) {
        memoryValue = Number(displayArray.join(''));
    }
    else {
        memoryValue = result;
    }
    currentValue = 0;
    displayArray = [];
    equalState = state;
    isEqualStateActive = true;
    equalCounter++;
    decimalCount = 0;
}

function clearResult() {
    result = null;
    currentValue = 0;
    memoryValue = 0;
    displayArray = [];
    acCounter = 0;
    equalState = '';
    isEqualStateActive = false;
    equalCounter = 0;
    decimalCount = 0;
    resultDisplay.textContent = 0;
    clear.textContent = 'AC';

}

function resetACCounter() {
    acCounter = 0;
}

function returnNegateValue() {
    if(currentValue === null) {
        memoryValue *= -1;
        negateValue = memoryValue;
    }
    else {
        negateValue = displayArray.join('');
        negateValue *= -1;
    }
    displayArray = [];
    inputValue(negateValue);
}

function returnPercent() {
    if(currentValue === null) {
        memoryValue *= .01;
        percentValue = memoryValue;
    }
    else {
        percentValue = displayArray.join('');
        percentValue *= .01;
    }
    displayArray = [];
    inputValue(percentValue);
}