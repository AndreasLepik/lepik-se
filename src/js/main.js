// @ts-check
/**
 * Script containing logic for drum machine in lepik.se
 */

// Global variables

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

// Function definitions

function readAction() {
    const input = textBox.value.toLowerCase();
    clearInput();
    if (input.length > 15) {
        writeToOutput("Input too long, calm down browsky!")
        return;
    }
    if (input.length < 1) {
        writeToOutput("Don't be shy. I too am an IntroBot.")
        return;
    }
    performAction(input);
}

function performAction(input) {
    const words = input.split(' ');
    switch (words[0]) {
        case 'help':
            writeToOutput("I'm a drumBot, not a helpBot! Bleep bloop."); // TODO
            break;
        case 'bpm':
            changeTempo(words[1]);
            break;
        default:
            invalidAction(input);
            break;
    }
}

function changeTempo(tempo) {
    if (tempo == undefined) {
        writeToOutput("Can't groove without a tempo, brother.");
        return;
    }
    const t = setTempo(tempo);
    if (t != -1) 
        writeToOutput("New tempo: " + t + " bpm.");
    else
        writeToOutput("Invalid tempo " + tempo + "! Nothing changed.");
}

function clearInput() {
    textBox.value = '';
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