// @ts-check
/**
 * Script containing logic for drum machine in lepik.se
 */

// Global variables

const numberOfRows =    1;
const numberOfCols =    8;

const tempoInput =      document.getElementById("input-tempo");
const playButton =      document.getElementById("play");
const output =          document.getElementById("outputText");
const boxRow0 =         document.getElementsByClassName("checkbox-row")


// Link elements to functions

playButton.addEventListener('click', hatzzz);
tempoInput.addEventListener('change', changeTempo)
// document.getElementById("inputButton").addEventListener('click', readAction);
// textBox.addEventListener('keyup', function (event) {
//     if (event.keyCode == 13) {
//         event.preventDefault();
//         document.getElementById("play").click();
//     }
// });

// Function definitions

function changeTempo() {
    const tempo = tempoInput.value;
    if (tempo == undefined) {
        writeToOutput("Can't groove without a tempo, brother.");
        return;
    }
    const t = setTempo(tempo);
    if (t != -1) 
        writeToOutput("New tempo: " + t + " bpm.");
    else
        writeToOutput("Invalid tempo " + tempo + "!");
    if (tempo.length == 0)
        tempoInput.value = '120';
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