// @ts-check
/*
Script containing logic for the graphics page of lepik.se
*/

// Global variables

var validActions = ['a0', 'a1', 'b0', 'b1'];
const swRed = '#D00000';


const canvas =          document.getElementById('canvas1');
const canvasPosition =  canvas.getBoundingClientRect();
const height =          canvasPosition.height;
const width =           canvasPosition.width;
const context =         canvas.getContext('2d');
const textbox =         document.getElementById("input1");
const output =          document.getElementById("outputText");


// Link objects to functions

document.getElementById('drawButton').addEventListener('click', readAction);


// Functions to run on start up

initDraw();


// Function definitions

function initDraw() {
    context.fillStyle = '#202020';
    context.fillRect(0, 0, 450, 300);
    drawGrid();
}

function drawGrid() {
    context.strokeStyle = '#FFFFFF';
    context.strokeRect(0, 0, 225, 150);
    context.strokeRect(0, 150, 225, 150);
    context.strokeRect(225, 0, 225, 150);
    context.strokeRect(225, 150, 225, 150);
}

function readAction() {
    var input = textbox.value.toLowerCase();
    if (validActions.includes(input)) {
        performAction(input);
    } else {
        invalidAction(input);
    }
}

function performAction(input) {
    context.fillStyle = swRed;
    context.fillRect(1,1,223,148);
    output.innerHTML = "Action: " + input;
}

function invalidAction(input) {
    output.innerHTML = "Invalid action: " + input;
}

function logEcho(text) {
    console.log(text);
}