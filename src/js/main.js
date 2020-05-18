// @ts-check
/**
 * UI logic for drumBOT on lepik.se
 * Written by Andreas Lepik
 */
import * as Audio from "./audio-control.js";


// Global variables

const numberOfRows =    1;
const numberOfCols =    8;

const tempoInput =      document.getElementById("input-tempo");
const playButton =      document.getElementById("play");
const output =          document.getElementById("outputText");
const row0 = [ // TODO - FIX THIS GET MESS
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

playButton.addEventListener('click', Audio.hatzzz);
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
    // 1 to 8
    if (keyVal >= 49 && keyVal <= 56) {
        const i = keyVal - 49;
        row0[i].focus();
        row0[i].click();
    }
}

function changeTempo() {
    const tempo = tempoInput.value;
    if (tempo == undefined) {
        writeToOutput("Can't groove without a tempo, brother.");
        return;
    }
    const t = Audio.setTempo(tempo);
    if (t != -1) 
        writeToOutput("New tempo: " + t + " bpm.");
    else
        writeToOutput("Invalid tempo " + tempo + "!");
    if (tempo.length == 0)
        tempoInput.value = '175';
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