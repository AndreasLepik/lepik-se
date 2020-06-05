/**
 * Module responsible for the audio playing in drumBOT at lepik.se
 * Written by Andreas Lepik
 */
export { playSounds }

const audioContext = new AudioContext();
const soundBuffers = [];
const soundLinks = ["sounds/hihat.wav", "sounds/snare.wav", "sounds/kick.wav"];
const soundNames = new Map([["hihat", 0], ["snare", 1], ["kick", 2]]);

window.addEventListener('load', init, false);

function init() {
    loadSounds(soundLinks);
}

function loadSounds(links) {
    links.forEach(
        (link, index) => loadSound(link, index));
}

function loadSound(link, bufferIndex) {
    var request = new XMLHttpRequest();
    request.open('GET', link, true);
    request.responseType = 'arraybuffer';

    request.onload = () => {
        audioContext.decodeAudioData(
            request.response, 
            (buffer) => soundBuffers[bufferIndex] = buffer, 
            (error) => console.error(error));
    }
    request.send();
}

function playSounds(timeMatrix) {
    const current = audioContext.currentTime;
    for (var i = 0; i < timeMatrix.length; i++) {
        timeMatrix[i].forEach(
            time => playSound(i, current + time)
        );
    }
}

function playSound(index, time) {
    var source = audioContext.createBufferSource();
    source.buffer = soundBuffers[index];
    source.connect(audioContext.destination);
    source.start(time);
}