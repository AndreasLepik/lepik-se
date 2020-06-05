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
const row1 = [ // TODO - FIX THIS GET MESS
    document.getElementById("box10"),
    document.getElementById("box11"),
    document.getElementById("box12"),
    document.getElementById("box13"),
    document.getElementById("box14"),
    document.getElementById("box15"),
    document.getElementById("box16"),
    document.getElementById("box17")
]
const row2 = [ // TODO - FIX THIS GET MESS
    document.getElementById("box20"),
    document.getElementById("box21"),
    document.getElementById("box22"),
    document.getElementById("box23"),
    document.getElementById("box24"),
    document.getElementById("box25"),
    document.getElementById("box26"),
    document.getElementById("box27")
]
const checkBoxMatrix = [row0, row1, row2]

// Link elements to functions

playButton.addEventListener('click', playOnce);
tempoInput.addEventListener('change', changeTempo)
document.addEventListener('keyup', keyboardShortcuts)


// Function definitions

function keyboardShortcuts(e) {
    if (document.activeElement == tempoInput)
        return;
    const keyVal = e.which;
    // 1 to 8
    if (keyVal >= 49 && keyVal <= 56) {
        const i = keyVal - 49;
        if (row0[i] == document.activeElement)
            row0[i].click();
        else
            row0[i].focus();
    }
}

function playOnce() {
    // const tickedBoxes = row0.map(cb => cb.checked);
    // tickedBoxes.forEach(e => console.log(e))
    // Audio.hatzzz(tickedBoxes);
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