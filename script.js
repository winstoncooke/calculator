const root = document.querySelector(':root');
const resultDisplay = document.getElementById('result');
const clear = document.getElementById('clear');
clear.addEventListener('click', clearResult);
const calcKeys = document.querySelector('.btn-container');
const positiveNegative = document.getElementById('positive-negative').addEventListener('click', returnNegateValue);
const percent = document.getElementById('percent').addEventListener('click', returnPercent);
const division = document.getElementById('divide');
division.addEventListener('click', divide);
const multiplier = document.getElementById('multiply');
multiplier.addEventListener('click', multiply);
const subtraction = document.getElementById('minus');
subtraction.addEventListener('click', subtract);
const addition = document.getElementById('plus');
addition.addEventListener('click', add);
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
let equalState = '';
let isEqualStateActive = false;
let equalCounter = 0;
let percentValue;
let negateValue;
let sz = resultDisplay.style.fontSize;
let size;

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
        case ('–'):
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
    // a storeValue    
    currentValue = num;
    updateDisplay(currentValue);
    if(resultDisplay.textContent.length === 1) {
        updateSize(3);
    }
}

function updateDisplay(value) {   
    if(isEqualStateActive || resultDisplay.textContent === '0') resetDisplay();
    if(resultDisplay.textContent.length < 32) {
        resultDisplay.textContent += value;
        clear.textContent = 'C';
        reduceFontSize();
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
    if(resultDisplay.textContent.length === 20) {
        return resizeFontDown();
    }
    else if(resultDisplay.textContent.length === 13) {
        return resizeFontDown();
    }
    else if(resultDisplay.textContent.length === 10) {
        return resizeFontDown();
    }
    else if(resultDisplay.textContent.length === 8) {
        return resizeFontDown();
    }
    else if(resultDisplay.textContent.length === 6) {
        return resizeFontDown();
    } else return;
}

function reduceResultFontSize() {   
    if(resultDisplay.textContent.length >= 20) {
        return updateSize(0.5);
    }
    else if(resultDisplay.textContent.length >= 13) {
        return updateSize(1);
    }
    else if(resultDisplay.textContent.length >= 10) {
        return updateSize(1.5);
    }
    else if(resultDisplay.textContent.length >= 8) {
        return updateSize(2);
    }
    else if(resultDisplay.textContent.length >= 6) {
        return updateSize(2.5);
    } else return updateSize(3);
}

function increaseFontSize() {
    if(resultDisplay.textContent.length === 5) {
        return resizeFontUp();
    }
    else if(resultDisplay.textContent.length === 7) {
        return resizeFontUp();
    }
    else if(resultDisplay.textContent.length === 9) {
        return resizeFontUp();
    }
    else if(resultDisplay.textContent.length === 12) {
        return resizeFontUp();
    }
    else if(resultDisplay.textContent.length === 19) {
        return resizeFontUp();
    } else return;
}

function updateSize(newSz) {
    sz = newSz;
    size = parseFloat(sz) + 'em';
    resultDisplay.style.fontSize = size;
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
        addition.style.setProperty('border', '1px var(--calculator-background) solid');
    }
    else if(equalState === 'subtraction') {           
        result = round((memoryValue - currentValue), 4);
        connectResultToUpdateDisplay(result);
        subtraction.style.setProperty('border', '1px var(--calculator-background) solid');
    }
    else if(equalState === 'multiplication') {
        result = round((memoryValue * currentValue), 4);
        connectResultToUpdateDisplay(result);
        multiplier.style.setProperty('border', '1px var(--calculator-background) solid');
    }
    else if(equalState === 'division') {
        if(currentValue === 0) {
            resultDisplay.textContent = 'Not a number';
        } else {
            result = round((memoryValue / currentValue), 4);
            connectResultToUpdateDisplay(result);
            division.style.setProperty('border', '1px var(--calculator-background) solid');
        }
    }
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }

function connectResultToUpdateDisplay(result) {
    memoryValue = result;
    isEqualStateActive = true;
    resultDisplay.textContent = result;
    reduceResultFontSize();
    isEqualStateActive = true;
    currentValue = null;
    equalState = '';
    equalCounter--;
}

function add() {
    addition.style.setProperty('border', '1px var(--border) solid');
    checkToOperate('addition');
}

function subtract() {
    subtraction.style.setProperty('border', '1px var(--border) solid');
    checkToOperate('subtraction');
}

function multiply() {
    multiplier.style.setProperty('border', '1px var(--border) solid');
    checkToOperate('multiplication');
}

function divide() {
    division.style.setProperty('border', '1px var(--border) solid');
    checkToOperate('division');
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
    equalState = state;
    isEqualStateActive = true;
    equalCounter++;
}

function clearResult() {
    result = null;
    currentValue = 0;
    memoryValue = 0;
    equalState = '';
    isEqualStateActive = false;
    equalCounter = 0;
    resultDisplay.textContent = 0;
    resultDisplay.style.fontSize = '3em';
    clear.textContent = 'AC';
    addition.style.setProperty('border', '1px var(--calculator-background) solid');
    subtraction.style.setProperty('border', '1px var(--calculator-background) solid');
    multiplier.style.setProperty('border', '1px var(--calculator-background) solid');
    division.style.setProperty('border', '1px var(--calculator-background) solid');
}

function deleteNumber() {
    if(currentValue != null && resultDisplay.textContent.length > 1) {
        resultDisplay.textContent = resultDisplay.textContent.toString().slice(0, -1);
        increaseFontSize();
    }
    else if (currentValue != null) {
        resultDisplay.textContent = 0;
    }
}

function returnNegateValue() {
    if(Math.abs(resultDisplay.textContent) > 0) {
        if(currentValue === null) {
            memoryValue *= -1;
            negateValue = memoryValue;
        }
        else {
            negateValue = resultDisplay.textContent;
            negateValue *= -1;
        }
        
        isEqualStateActive = true;
        inputValue(negateValue);
    }
}

function returnPercent() {
    if(currentValue === null) {
        percentValue = round(memoryValue * .01, 4);
        memoryValue = percentValue;
    }
    else if (Math.abs(currentValue) > 0) {
        percentValue = resultDisplay.textContent;
        percentValue = round(percentValue * .01, 4);
        memoryValue = percentValue;
    }
    else return;
    isEqualStateActive = true;
    inputValue(percentValue);
}
