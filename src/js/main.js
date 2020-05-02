// @ts-check
/*
Script containing logic for drum machine in lepik.se
*/

// Global variables

var validActions = ['help'];

const numberOfRows =    1;
const numberOfCols =    4;
const swRed =           '#D00000';
const swBlue =          '#0000D0';
const swWhite =         '#D0D0D0';

const textBox =         document.getElementById("input1");
const output =          document.getElementById("outputText");


// Link elements to functions

document.getElementById("inputButton").addEventListener('click', readAction);
textBox.addEventListener('keyup', function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("inputButton").click();
    }
});


// Functions to run on start up


// Function definitions

function readAction() { // Just a double check in this state
    var input = textBox.value.toLowerCase();
    if (validActions.includes(input)) {
        performAction(input);
    } else {
        invalidAction(input);
    }
}

function performAction(input) {
    switch (validActions.indexOf(input)) {
        case 0: // help
            writeToOutput("Wow, I love what you've done with your hair!"); // TODO
            break;
        case -1: // Action not found
            logEcho("This should never happen");
            invalidAction(input);
            break;
        default:
            invalidAction(input);
            break;
    }
}

function writeToOutput(text) {
    output.innerHTML = text;
}

function invalidAction(input) {
    writeToOutput("Invalid action: " + input);
}

function logEcho(text) {
    console.log(text);
}