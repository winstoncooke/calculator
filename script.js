let result = 0;
let currentInputArray = [];
let memoryArray = [];
let displayArray = [];
let acCounter = 0;
let equalState = 'addition';
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
const equal = document.getElementById('equal').addEventListener('click', calculateResult);
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

function inputValue(num) {
    // Allow for new calculations after a previous calculation when not selecting
    // an operator
    if(isEqualStateActive === false) {
        console.log(isEqualStateActive);
        memoryArray = [];
    }
    currentInputArray.push(num);
    displayArray.push(currentInputArray);
    console.log(displayArray);
    //currentInputArray = [];
    // resultDisplay.textContent = displayArray.join('').toString();
    resultDisplay.textContent = Number(currentInputArray.join(''));
    clear.textContent = 'C';
    resetACCounter();
}

function calculateResult() {
    memoryArray.push(Number(currentInputArray.join('')));
    currentInputArray = [];
    console.log(memoryArray);
    if(memoryArray.length > 1) {
        if(equalState === 'addition') {
            for(let i = 0; i < memoryArray.length; i++) {
                result = memoryArray.reduce((a, b) => a + b, 0);
            }
            resultDisplay.textContent = result;
        }
        else if(equalState === 'subtraction') {
    
        }
        else if(equalState === 'multiplication') {
    
        }
        else if(equalState === 'division') {
    
        }
    } else return;
    isEqualStateActive = false;
    console.log(isEqualStateActive);
}

function add() {
    // highlight + button
    setEqualState('addition');
    // Unhighlight + button
}

function subtract() {
    // highlight + button
    setEqualState('subtraction');
    // Unhighlight + button
}

function multiply() {
    // highlight + button
    setEqualState('multiplication');
    // Unhighlight + button
}

function divide() {
    // highlight + button
    setEqualState('division');
    // Unhighlight + button
}

// Prepares for an equation following an operator and passes first number into
// memory
function setEqualState(state) {
    equalState = state;
    isEqualStateActive = true;
    console.log(isEqualStateActive);
    memoryArray.push(Number(currentInputArray.join('')));
    currentInputArray = [];
}

function clearResult() {
    // optional part of the function that currently does nothing
    if(acCounter === 1) {
        currentInputArray = []
        memoryArray = []
        result = 0;
        resultDisplay.textContent = '0';
        resetACCounter();

    } else if(acCounter === 0) {
        currentInputArray = [];
        displayArray = [];
        
        resultDisplay.textContent = '0';
        clear.textContent = 'AC';
        if(currentInputArray !== 0){
            acCounter++;
        }
    }
}

function resetACCounter() {
    acCounter = 0;
}

function negateValue() {
    return;
}

function returnPercent() {
    return;
}

function addDecimal() {
    inputValue('.');
}
