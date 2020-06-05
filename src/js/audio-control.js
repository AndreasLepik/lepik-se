/**
 * Controls when and how audio is triggered in DrumBOT at lepik.se
 * Written by Andreas Lepik
 */
import * as AudioModule from "./audio.js";
export { setTempo, playMatrix }

var bpm = 175;
var beatLength = 60.0 / bpm;

var currentPatterns = [
    [true],
    [true],
    [true],
    [true],
    [true],
    [true],
    [true],
    [true]
]

function playMatrix(checkBoxMatrix) {
    const activeTimes = checkBoxMatrix.map(row => generateSequence(row));
    AudioModule.playSounds(activeTimes);
}

function generateSequence(checkedBoxes) {
    var res = [];
    for (var i = 0; i < checkedBoxes.length; i++) {
        if (checkedBoxes[i]) {
            res = res.concat(
                renderRatioPattern(currentPatterns[i])
                .map(e => beatLength * (e + i)));
        }
    }
    return res;
}

function renderRatioPattern(pattern) {
    const n = pattern.length;
    var res = [];
    for (var i = 0; i < n; i++) {
        if (pattern[i]) {
            res.push(i / n);
        }
    }
    return res;
}

function setTempo(tempo) {
    const t = Number(tempo);
    if (t >= 50 && t <= 300) {
        bpm = t;
        beatLength = 60.0 / t;
        return t;
    } else {
        return -1;
    }
}