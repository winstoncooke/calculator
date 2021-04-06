const root = document.querySelector(':root');
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
const decimal = document.getElementById('decimal').addEventListener('click', appendPoint);
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
let lengthCounter = 0;
let map = {};
let sz = resultDisplay.style.fontSize;
let size;

root.style.setProperty('--screen-width', window.screen.availWidth);
root.style.setProperty('--screen-height', window.screen.availHeight);

window.addEventListener('keydown', function(e) {
    if(e.defaultPrevented) {
        return;
    }

    switch(e.key) {
        case 'Escape':
            clearResult();
            break;
        case 'Backspace':
            deleteNumber(); //Add function
            break;
        // add option & minus keys together
        case ('Option' || 'Alt'):
            returnNegateValue();
            break;
        case '%':
            returnPercent();
            break;
        case '/':
            divide();
            break;
        case '*':
            multiply();
            break;
        case '-':
            subtract();
            break;
        case '+':
            add();
            break;
        case '=':
            operator();
            break;
        case 'Enter':
            operator();
            break;
        case '1':
            inputValue(1);
            break;
        case '2':
            inputValue(2);
            break;
        case '3':
            inputValue(3);
            break;
        case '4':
            inputValue(4);
            break;
        case '5':
            inputValue(5);
            break;
        case '6':
            inputValue(6);
            break;
        case '7':
            inputValue(7);
            break;
        case '8':
            inputValue(8);
            break;
        case '9':
            inputValue(9);
            break;
        case '0':
            inputValue(0);
            break;
        case '.':
            appendPoint();
            break;
        case 'p':
            // inputValue(3.141592653589793);
            inputValue(3.14159);
            break;
        default:
            return;
    }
    e.preventDefault();
}, true);

function inputValue(num) {
    // Allow for new calculations after a previous calculation when not selecting
    // an storeValue    
    if(lengthCounter === 0) {
        resultDisplay.style.fontSize = '3em';
        sz = 3;
        size = '3em';
    }
    currentValue = num;
    updateDisplay(currentValue);
}

function updateDisplay(value) {   
    if(isEqualStateActive || resultDisplay.textContent === '0') resetDisplay();
    if(resultDisplay.textContent.length < 32) {
        displayArray.push(value);
        resultDisplay.textContent += value;
        clear.textContent = 'C';
        reduceFontSize();
        lengthCounter++;
    }
}

function appendPoint() {
    if(isEqualStateActive) resetDisplay();
    if(resultDisplay.textContent === '') resultDisplay.textContent = '0';
    if(resultDisplay.textContent.includes('.')) return;
    resultDisplay.textContent += '.';
    clear.textContent = 'C';
  }

function resetDisplay() {
    resultDisplay.textContent = '';
    isEqualStateActive = false;   
}

function reduceFontSize() {   
    if(lengthCounter === 20) {
        return resizeFontDown();
    }
    else if(lengthCounter === 13) {
        return resizeFontDown();
    }
    else if(lengthCounter === 10) {
        return resizeFontDown();
    }
    else if(lengthCounter === 8) {
        return resizeFontDown();
    }
    else if(lengthCounter === 6) {
        return resizeFontDown();
    } else return;
}

function increaseFontSize() {
    if(lengthCounter === 5) {
        return resizeFontUp();
    }
    else if(lengthCounter === 7) {
        return resizeFontUp();
    }
    else if(lengthCounter === 9) {
        return resizeFontUp();
    }
    else if(lengthCounter === 12) {
        return resizeFontUp();
    }
    else if(lengthCounter === 19) {
        return resizeFontUp();
    }
}

function resizeFontUp() {
    if (sz === '') sz = 3; //default font size
  
    sz += 0.5;
    size = parseFloat(sz) + 'em';
    resultDisplay.style.fontSize = size;
  }

  function resizeFontDown() {
    if (sz === '') sz = 3; //default font size
  
    sz -= 0.5;
    size = parseFloat(sz) + 'em';
    resultDisplay.style.fontSize = size;
  }

function operator() {
    if(currentValue !== null) {
        currentValue = Number(resultDisplay.textContent);    
    } else return;
    
    if(equalState === 'addition') {
        result = round((memoryValue + currentValue), 4);
        connectResultToUpdateDisplay(result);
    }
    else if(equalState === 'subtraction') {           
        result = round((memoryValue - currentValue), 4);
        connectResultToUpdateDisplay(result);
    }
    else if(equalState === 'multiplication') {
        result = round((memoryValue * currentValue), 4);
        connectResultToUpdateDisplay(result);
    }
    else if(equalState === 'division') {
        if(currentValue === 0) {
            resultDisplay.textContent = 'Not a number';
        } else {
            result = round((memoryValue / currentValue), 4);
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
    isEqualStateActive = true;
    updateDisplay(result);
    isEqualStateActive = true;
    displayArray = [];
    currentValue = null;
    equalState = '';
    equalCounter--;
    decimalCount = 0;
    lengthCounter = 0;
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
        memoryValue = Number(resultDisplay.textContent);
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
    lengthCounter = 0;
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
    lengthCounter = 0;
    resultDisplay.textContent = 0;
    resultDisplay.style.fontSize = '3em';
    clear.textContent = 'AC';
}

function deleteNumber() {
    if(lengthCounter > 1) {
        increaseFontSize();
        resultDisplay.textContent = resultDisplay.textContent.toString().slice(0, -1);
    }
    else {
        resultDisplay.textContent = 0;
    }

    if(lengthCounter > 0) {
        lengthCounter--;
    }
}

function resetACCounter() {
    acCounter = 0;
}

function returnNegateValue() {
    if(Math.abs(currentValue) > 0) {
        if(currentValue === null) {
            memoryValue *= -1;
            negateValue = memoryValue;
        }
        else {
            negateValue = resultDisplay.textContent;
            negateValue *= -1;
        }
        lengthCounter++;
        isEqualStateActive = true;
        inputValue(negateValue);
    }
}

function returnPercent() {
    if(currentValue === null) {
        memoryValue = round(memoryValue * .01, 4);
        percentValue = memoryValue;
    }
    else if (Math.abs(currentValue > 0)) {
        percentValue = displayArray.join('');
        percentValue = round(percentValue * .01, 4);
        memoryValue = percentValue;
    }
    else return;
    isEqualStateActive = true;
    inputValue(percentValue);
}
