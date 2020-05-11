// @ts-check
/**
 * Script containing logic for drum machine in lepik.se
 */

// Global variables

var validActions = ['help', 'bpm'];

const numberOfRows =    1;
const numberOfCols =    8;
const swRed =           '#D00000';
const swBlue =          '#0000D0';
const swWhite =         '#D0D0D0';

const textBox =         document.getElementById("input1");
const output =          document.getElementById("outputText");
// const boxRow0 =         document.getElementsByClassName("checkbox-row")


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

function readAction() {
    const input = textBox.value.toLowerCase();
    performAction(input);
}

function performAction(input) {
    const words = input.split(' ');
    switch (validActions.indexOf(words[0])) {
        case 0: // help
            writeToOutput("Wow, I love what you've done with your hair!"); // TODO
            break;
        case -1: // Action not found
            logEcho("This should never happen");
            invalidAction(input);
            break;
        case 1: // bpm
            setTempo(words[1]);
            break;
        default:
            invalidAction(input);
            break;
    }
}

function setTempo(tempo) {
    const t = Number(tempo);
    if (t >= 50 && t <= 300) {
        bpm = t;
        writeToOutput("New tempo: " + bpm + " bpm.");
    } else {
        writeToOutput("Invalid tempo! Nothing changed.")
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