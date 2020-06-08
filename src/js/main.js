// @ts-check
/**
 * UI logic for drumBOT at lepik.se
 * Written by Andreas Lepik
 */
import * as Audio from "./audio-control.js";


// Global variables

const numberOfRows =    3;
const numberOfCols =    8;

const tempoInput =      document.getElementById("input-tempo");
const playButton =      document.getElementById("play");
const output =          document.getElementById("outputText");
const row0 =            document.getElementById("row0");
const row1 =            document.getElementById("row1");
const row2 =            document.getElementById("row2");
var checkBoxMatrix = [];
for (var i = 0; i < numberOfRows; i++) {
    checkBoxMatrix[i] = [];
    for (var j = 0; j < numberOfCols; j++) {
        checkBoxMatrix[i][j] = document.getElementById("box" + i + j);
    }
}

var lastActiveElement = document.activeElement;
var lastActiveRow =     row0;

// Link elements to functions

playButton.addEventListener('click', playOnce);
tempoInput.addEventListener('change', changeTempo);
document.addEventListener('keyup', keyboardShortcuts);
window.addEventListener('focus', changedFocus, true);

// checkBoxMatrix.forEach(
    // row => row.forEach(
        // cb => cb.addEventListener('focus', changedFocus)
    // )
// );


// Function definitions

function keyboardShortcuts(e) {
    if (document.activeElement == tempoInput)
        return;
    const keyVal = e.which;
    // 1 to 8
    if (keyVal >= 49 && keyVal <= 56) {
        const i = keyVal - 49;
        if (checkBoxMatrix[0][i] == document.activeElement)
            checkBoxMatrix[0][i].click();
        else
            checkBoxMatrix[0][i].focus();
    }
}

function changedFocus() {
    const e = document.activeElement;
    lastActiveRow.style.setProperty('--row-focus', 'none');
    if (e.type == 'checkbox') {
        lastActiveRow = e.parentNode;
    }
    e.parentNode.style.setProperty('--row-focus', '2px solid white');
}

function playOnce() {
    const tickedBoxes = checkBoxMatrix.map(
        row => row.map(
            cb => cb.checked
        )
    );
    Audio.playMatrix(tickedBoxes);
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