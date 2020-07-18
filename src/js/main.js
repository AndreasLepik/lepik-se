/**
 * UI logic and keboard shortcuts for drumBOT at lepik.se
 * Written by Andreas Lepik
 */
import * as Audio from "./audio.js";
export { triggerElement, togglePlay }

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


// Link elements to functions
playButton.addEventListener('click', togglePlay);
tempoInput.addEventListener('change', changeTempo);
loopBox.addEventListener('change', setLoop);


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


/**
 * triggerElement is used by keyboard-shortcuts.js to tick the matrix checkboxes or to focus on UI elements.
 * @param {Number, String} row is the checkbox index or an indicator for which element to interact with.
 * @param {Number} col is the column index of the box to be triggered.
 * @param {Boolean} shouldClick determines if a checkbox should be clicked or focused on.
 */
function triggerElement(row, col, shouldClick) {
    switch (row) {
        case 'sub':
            subBoxes[col].click();
            break;
        case 'tempo':
            tempoInput.select();
            break;
        case 'loop':
            loopBox.click();
            break;
        default:
            const current = checkBoxMatrix[row][col];
            if (shouldClick) {
                current.click();
            } else {
                current.focus();
            }
            break;
    }
}