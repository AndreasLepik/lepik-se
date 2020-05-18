/**
 * Module responsible for the audio playing in drumBOT at lepik.se
 * Written by Andreas Lepik
 */
export { playSounds }

var audioContext;
var soundBuffers = [];
var soundLinks = ["sounds/hihat.wav"];

window.addEventListener('load', init, false);

function init() {
    audioContext = new AudioContext();
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

function playSounds(index, times) {
    const current = audioContext.currentTime;
    times.forEach(
        t => playSound(index, current + t));
}

function playSound(index, time) {
    var source = audioContext.createBufferSource();
    source.buffer = soundBuffers[index];
    source.connect(audioContext.destination);
    source.start(time);
}