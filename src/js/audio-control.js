/**
 * Controls when and how audio is triggered in DrumBOT at lepik.se
 * Written by Andreas Lepik
 */
import * as AudioModule from "./audio.js";
export { hatzzz, setTempo }

var bpm = 175;
var beatLength = 60.0 / bpm;

function hatzzz() {
    const times = [
        0,
        beatLength,
        beatLength * 1.66,
        beatLength * 2,
        beatLength * 3,
        beatLength * 3.66,
        beatLength * 4,
        beatLength * 4.66,
        beatLength * 5,
        beatLength * 6
    ]
    AudioModule.playSounds(0, times);
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