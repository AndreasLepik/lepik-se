// @ts-check
const validActions = ['a0', 'a1', 'b0', 'b1'];

const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
const textbox = document.getElementById("input1");
const output = document.getElementById("outputText");

document.getElementById('drawButton').addEventListener('click', readAction);

initDraw();

function initDraw() {
    drawGrid();
}

function drawGrid() {
    context.strokeRect(0, 0, 225, 150);
    context.strokeRect(0, 150, 225, 150);
    context.strokeRect(225, 0, 225, 150);
    context.strokeRect(225, 150, 225, 150);
}

function readAction() {
    var input = textbox.value.toLowerCase();
    if (validActions.includes(input)) {
        preformAction(input);
    } else {
        invalidAction(input);
    }
}

function preformAction(input) {
    context.fillRect(0,0,225,150);
    output.innerHTML = "Action: " + input;
}

function invalidAction(input) {
    output.innerHTML = "Invalid action: " + input;
}

function logEcho(text) {
    console.log(text);
}