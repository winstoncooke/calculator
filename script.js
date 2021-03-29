let result = 0;
let currentInputArray = [];
let runningInputArray = [];
let equationArray = [];
let displayArray = [];
let acCounter = 0;
let equalState = 'addition';
isEqualStateActive = false;

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
const zeroButton = document.getElementById('0').addEventListener('click', (e) => {inputValue(0)});
const oneButton = document.getElementById('1').addEventListener('click', (e) => {inputValue(1)});
const twoButton = document.getElementById('2').addEventListener('click', (e) => {inputValue(2)});
const threeButton = document.getElementById('3').addEventListener('click', (e) => {inputValue(3)});
const fourButton = document.getElementById('4').addEventListener('click', (e) => {inputValue(4)});
const fiveButton = document.getElementById('5').addEventListener('click', (e) => {inputValue(5)});
const sixButton = document.getElementById('6').addEventListener('click', (e) => {inputValue(6)});
const sevenButton = document.getElementById('7').addEventListener('click', (e) => {inputValue(7)});
const eightButton = document.getElementById('8').addEventListener('click', (e) => {inputValue(8)});
const nineButton = document.getElementById('9').addEventListener('click', (e) => {inputValue(9)});

function inputValue(num) {
    if(isEqualStateActive === false) {
        currentInputArray.push(num);
        runningInputArray.push(currentInputArray.join(''));
        equationArray = runningInputArray;
        displayArray = runningInputArray.join('').toString();
        resultDisplay.textContent = displayArray;
        clear.textContent = 'C';
        currentInputArray = [];
        //runningInputArray = [];
        resetACCounter();
    }
    // Clears the display when a new number is inputted after selecting an equation
    // sign
    else if(isEqualStateActive === true) {
        currentInputArray.push(num);
        runningInputArray.push(currentInputArray.join(''));
        equationArray = runningInputArray;
        displayArray = runningInputArray.join('').toString();
        resultDisplay.textContent = displayArray;
        clear.textContent = 'C';
        currentInputArray = [];
        resetACCounter();
    }
}

function calculateResult(equalState) {
    if(equalState === 'addition') {
        for(let i = 0; i < equationArray.length; i++) {
            result += equationArray[i];
        }
        resultDisplay.textContent = result.toString();
        console.log(result);
    }
    else if(equalState === 'subtraction') {

    }
    else if(equalState === 'multiplication') {

    }
    else if(equalState === 'division') {

    }
}

function add() {
    // highlight + button
    setEqualState('addition');
    //Unhighlight + button
}

function subtract() {
    // highlight + button
    setEqualState('subtraction');
    //Unhighlight + button
}

function multiply() {
    // highlight + button
    setEqualState('multiplication');
    //Unhighlight + button
}

function divide() {
    // highlight + button
    setEqualState('division');
    //Unhighlight + button
}

function setEqualState(state) {
    equalState = state;
    isEqualStateActive = true;
    runningInputArray = [];
}

function clearResult() {
    if(acCounter === 1) {
        result = [];
        equationArray = [];
        resultDisplay.textContent = '0';
        resetACCounter();

    } else if(acCounter === 0) {
        currentInputArray = [];
        equationArray = [];
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
