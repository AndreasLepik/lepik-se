// @ts-check
/**
 * UI logic for drumBOT on lepik.se
 * Written by Andreas Lepik
 */

// Global variables

const numberOfRows =    1;
const numberOfCols =    8;

const tempoInput =      document.getElementById("input-tempo");
const playButton =      document.getElementById("play");
const output =          document.getElementById("outputText");
const checkboxRow0 = [ // TODO - FIX THIS GET MESS
    document.getElementById("box00"),
    document.getElementById("box01"),
    document.getElementById("box02"),
    document.getElementById("box03"),
    document.getElementById("box04"),
    document.getElementById("box05"),
    document.getElementById("box06"),
    document.getElementById("box07")
]

// Link elements to functions

playButton.addEventListener('click', hatzzz);
tempoInput.addEventListener('change', changeTempo)
document.addEventListener('keyup', keyboardShortcuts)
// document.getElementById("inputButton").addEventListener('click', readAction);
// textBox.addEventListener('keyup', function (event) {
//     if (event.keyCode == 13) {
//         event.preventDefault();
//         document.getElementById("play").click();
//     }
// });

// Function definitions

function keyboardShortcuts(e) {
    if (document.activeElement == tempoInput)
        return;
    const keyVal = e.which;
    if (keyVal >= 49 && keyVal <= 56) {
        const i = keyVal - 49;
        checkboxRow0[i].focus();
        checkboxRow0[i].click();
    }
}

function changeTempo() {
    const tempo = tempoInput.value;
    if (tempo == undefined) {
        writeToOutput("Can't groove without a tempo, brother.");
        return;
    }
    const t = setTempo(tempo);
    if (t != -1) 
        writeToOutput("New tempo: " + t + " bpm.");
    else
        writeToOutput("Invalid tempo " + tempo + "!");
    if (tempo.length == 0)
        tempoInput.value = '120';
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