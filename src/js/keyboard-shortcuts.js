/**
 * Keyboard shortcuts for drumBOT at lepik.se
 * Written by Andreas Lepik
 */
import * as MainModule from "./main.js";

// Variables used for keyboard control
const numberOfRows =    3;
const numberOfCols =    8;

var lastActiveRow =     0;
var lastActiveIndex =   "00";
var lastKeyVal =        49;

document.addEventListener('keyup', keyboardShortcuts);

/**
 * Eventlistener function for document keyup.
 * keyboardShortcuts is used to handle app control with keyboard input.
 * It uses the last* variables to handle multiple key input sequences.
 * @param {Event} event is the Event containing the key.
 */
function keyboardShortcuts(event) {
    const keyVal = event.which;
    if (document.activeElement.type == 'number' && keyVal == 13) {
        // remove focus from number input, to reenable number navigation
        document.activeElement.blur();
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
                    rowIndex = lastActiveRow;
                    triggerCheckBox(rowIndex, colIndex);
                    lastKeyVal = keyVal;
                    break;
            }
            break;
        
        // T - focus on tempoInput
        case 84:
            MainModule.triggerElement('tempo', 0);
            break;

        // P - play
        case 80:
            MainModule.togglePlay();
            lastKeyVal = keyVal;
            break;

        // L - toggle loop
        case 76:
            MainModule.triggerElement('loop', 0);
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
 * triggerCheckBox is used to tick the matrix checkboxes. 
 * @param {Number, String} row is the checkbox index or an indicator for which element to interact with.
 * @param {Number} col is the column index of the box to be triggered.
 */
function triggerCheckBox(row, col) {
    const shouldClick = ""+row+col == lastActiveIndex;
    MainModule.triggerElement(row, col, shouldClick);

    if (row != 'sub') {
        lastActiveRow =     row;
        lastActiveIndex =   "" + row + col;
    }
}