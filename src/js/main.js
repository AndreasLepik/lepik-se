// @ts-check
/*
Script containing logic for the graphics page of lepik.se
*/

// Global variables

var validActions = ['help', 'a0', 'a1', 'b0', 'b1'];

const numberOfRows =    2;
const numberOfCols =    2;
const swRed =           '#D00000';
const swBlue =          '#0000D0';
const swWhite =         '#D0D0D0';

const canvas =          document.getElementById('canvas1');
const canvasPosition =  canvas.getBoundingClientRect();
const height =          canvasPosition.height;
const width =           canvasPosition.width;
const context =         canvas.getContext('2d');
const textBox =         document.getElementById("input1");
const output =          document.getElementById("outputText");


// Link elements to functions

document.getElementById("drawButton").addEventListener('click', readAction);
textBox.addEventListener('keyup', function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("drawButton").click();
    }
});


// Functions to run on start up

initDraw();


// Function definitions

function initDraw() {
    context.lineWidth = 4;
    context.fillStyle = '#202020';
    context.fillRect(0, 0, 450, 300);
    drawGrid();
}

function drawGrid() {
    context.strokeStyle = '#FFFFFF';
    context.strokeRect(2, 2, 225, 150);
    context.strokeRect(2, 150, 225, 148);
    context.strokeRect(225, 2, 223, 150);
    context.strokeRect(225, 150, 223, 148);
}

function readAction() { // Just a double check in this state
    var input = textBox.value.toLowerCase();
    if (validActions.includes(input)) {
        performAction(input);
    } else {
        invalidAction(input);
    }
}

function performAction(input) {
    switch (validActions.indexOf(input)) {
        case 0: // help
            writeToOutput("Wow, I love what you've done with your hair!"); // TODO
            break;
        case 1: case 2: case 3: case 4: // a0, a1, b0, b1
            fillCell(input);
            writeToOutput("Action: " + input);
            break;
        case -1: // Action not found
            logEcho("This should never happen");
            invalidAction(input);
            break;
        default:
            invalidAction(input);
            break;
    }
}

function fillCell(gridPos) {
    context.fillStyle = swRed;
    var pos = getGridPos(gridPos);
    context.fillRect(pos[0], pos[1], 20, 20);
    writeToOutput("Action: " + gridPos);
}

function getGridPos(gridPos) {
    var x = context.lineWidth;
    var y = context.lineWidth;
    switch (gridPos.charAt(0)) {
        case "a":
            break;
        case "b":
            x += ((width - 1.5) / numberOfCols);
            break;
        default:
            console.error("Invalid x position");
            break;
    }
    switch (gridPos.charAt(1)) {
        case "0":
            break;
        case "1":
            y += ((height - 1.5) / numberOfRows);
            break;
        default:
            console.error("Invalid y position");
            break;
    }
    return [x, y];
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