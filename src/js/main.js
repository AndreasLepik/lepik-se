/**
 * UI logic and keboard shortcuts for drumBOT at lepik.se
 * Written by Andreas Lepik
 */
import * as Audio from "./audio.js";

// Global variables

const numberOfRows =    3;
const numberOfCols =    8;

const tempoInput =      document.getElementById("input-tempo");
const playButton =      document.getElementById("button-play");
const loopBox =         document.getElementById("box-loop");
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
        checkBoxMatrix[i][j].addEventListener('change', toggleBox);
    }
}


// Variables used for keyboard control

var lastActiveElement = document.activeElement;
var lastActiveRow =     row0;
var lastActiveIndex =   "00";
var lastKeyVal =        49;


// Link elements to functions

playButton.addEventListener('click', togglePlay);
tempoInput.addEventListener('change', changeTempo);
loopBox.addEventListener('change', setLoop);
document.addEventListener('keyup', keyboardShortcuts);
window.addEventListener('load', init, false);


// Function definitions

/**
 * Eventlistener function for the checkboxes.
 * toggleBox is used to communicate to the sequencers when a checkbox is ticked.
 * This enables changing of the sequence while the loop is playing.
 * @param {Event} event is the Event containing the ticked checkbox.
 */
function toggleBox(event) {
    const ij = event.target.id.replace("box", "");
    const i = Number(ij[0]);
    const j = Number(ij[1]);

    const bool = checkBoxMatrix[i][j].checked;
    Audio.setBox(i, j, bool);
}


// Eventlistener function for the loop checkbox
function setLoop() {
    Audio.setLoop(loopBox.checked);
}


/**
 * Eventlistener function for document keyup.
 * keyboardShortcuts is used to handle app control with keyboard input.
 * It uses the last* variables to handle multiple key input sequences.
 * @param {Event} event is the Event containing the key.
 */
function keyboardShortcuts(event) {
    const keyVal = event.which;
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
                // D - divide, control sub pattern
                case 68:
                    rowIndex = 'sub';
                    colIndex = currentNum;
                    triggerCheckBox(rowIndex, colIndex);
                    // Don't change lastKeyVal
                    break;

                // R - change row
                case 82:
                    if (currentNum < numberOfRows) {
                        rowIndex = currentNum;
                        colIndex = parseInt(lastActiveIndex[1]);
                        triggerCheckBox(rowIndex, colIndex);    
                    } else {
                        console.log("Invalid row: " + (currentNum + 1));
                    }
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
            tempoInput.select()
            break;

        // P - play
        case 80:
            togglePlay();
            lastKeyVal = keyVal;
            break;

        // L - toggle loop
        case 76:
            loopBox.click();
            lastKeyVal = keyVal;
            break;

        // R, D, Enter - await next number
        case 82:
        case 68:
        case 13:
            lastKeyVal = keyVal;
            break;
    }
}


/**
 * triggerCheckBox is used by keyboardShortcuts to tick the matrix checkboxes.
 * @param {Number} row is the row index of the box to be triggered.
 * @param {Number} col is the column index of the box to be triggered.
 */
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


/**
 * Eventlistener function for window focus.
 * changedFocus is used to give a visual indicator about which row is on focus.
 */
function changedFocus() {
    const e = document.activeElement;
    lastActiveRow.style.setProperty('--row-focus', 'none');
    if (e.type == 'checkbox') {
        lastActiveRow = e.parentNode;
        lastActiveIndex = e.id.replace("box", "");
    }
    e.parentNode.style.setProperty('--row-focus', '2px solid white');
}


/**
 * Eventlistener function for play button.
 * togglePlay starts/ stops the drum machine.
 */
function togglePlay() {
    const tickedBoxes = checkBoxMatrix.map(
        row => row.map(
            cb => cb.checked
        )
    );
    Audio.playMatrix(tickedBoxes);
}


/**
 * Eventlistener function for the tempo input.
 * changeTempo changes the global tempo of the drum machine.
 */
function changeTempo() {
    const tempo = tempoInput.value;
    if (tempo == undefined) {
        console.log("Can't groove without a tempo, brother.");
        return;
    }
    if (tempo.length == 0)
        tempoInput.value = '175';
    Audio.setTempo(Number(tempo));
}
