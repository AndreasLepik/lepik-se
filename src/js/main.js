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
const rows =            [row0, row1, row2];

var subBoxes =          [];
for (var i = 0; i < 4; i++) {
    subBoxes[i] = document.getElementById("box-sub" + i);
}

var checkBoxMatrix =    [];
for (var i = 0; i < numberOfRows; i++) {
    checkBoxMatrix[i] = [];
    for (var j = 0; j < numberOfCols; j++) {
        checkBoxMatrix[i][j] = document.getElementById("box" + i + j);
    }
}


var lastActiveElement = document.activeElement;
var lastActiveRow =     row0;
var lastActiveIndex =   "00";
var lastKeyVal =        49;


// Link elements to functions

playButton.addEventListener('click', playOnce);
tempoInput.addEventListener('change', changeTempo);
document.addEventListener('keyup', keyboardShortcuts);
window.addEventListener('focus', changedFocus, true);
window.addEventListener('load', init, false);


// Function definitions

function init() {
    rows.forEach(
        r => r.style.setProperty('--row-focus', 'none')
    );
}

function keyboardShortcuts(e) {
    const keyVal = e.which;
    // check if focus is on a number input
    if (document.activeElement.type == 'number') {
        // blur the input on Enter, to reenable number navigation
        if (keyVal == 13) {
            document.activeElement.blur();
        }
        return;
    }

    switch (keyVal) {
        // 1 to 8 - navigate checkboxes
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
            const currentNum = keyVal - 49;
            var rowIndex;
            var colIndex;
            switch (lastKeyVal) {
                // P - control sub pattern
                case 80:
                    rowIndex = 'sub';
                    colIndex = currentNum;
                    triggerCheckBox(rowIndex, colIndex);
                    // Don't change lastKeyVal
                    break;

                // R - change row
                case 82:
                    rowIndex = currentNum;
                    colIndex = parseInt(lastActiveIndex[1]);
                    triggerCheckBox(rowIndex, colIndex);
                    lastKeyVal = keyVal;
                    break;

                // change coloumn
                default:
                    colIndex = currentNum;
                    rowIndex = rows.indexOf(lastActiveRow);
                    triggerCheckBox(rowIndex, colIndex);
                    lastKeyVal = keyVal;
                    break;
            }
            break;
        
        // T - focus on tempoInput
        case 84:
            tempoInput.focus();
            break;
        
        // R, P, Enter - await next number
        case 82:
        case 80:
        case 13:
            lastKeyVal = keyVal;
            break;
    }
}

function triggerCheckBox(row, col) {
    switch (row) {
        case 'sub':
            subBoxes[col].click();
            break;
        default:
            // add check
            const current = checkBoxMatrix[row][col];
            if (current == lastActiveElement) {
                current.click();
            } else {
                current.focus();
                lastActiveElement = current;
                lastActiveRow =     rows[row];
                lastActiveIndex = "" + row + col;
            }
            break;
    }
}

function changedFocus() {
    const e = document.activeElement;
    lastActiveRow.style.setProperty('--row-focus', 'none');
    if (e.type == 'checkbox') {
        lastActiveRow = e.parentNode;
        lastActiveIndex = e.id.replace("box", "");
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