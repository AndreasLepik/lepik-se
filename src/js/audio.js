/**
 * Module responsible for the audio playing in drumBOT at lepik.se
 * Powered by ToneJS
 * Written by Andreas Lepik
 */
export { playSounds }

const audioContext = new AudioContext();
var soundBuffers = [];
const soundLinks = ["sounds/hihat.wav", "sounds/snare.wav", "sounds/kick.wav"];
const soundNames = new Map([["hihat", 0], ["snare", 1], ["kick", 2]]);
var loop;
var hat;
var snr;
var kik;
const synth = new Tone.Synth().toMaster();


window.addEventListener('load', init, false);

function init() {
    // loadSounds(soundLinks);

    loop = new Tone.Loop(function(time){
        //triggered every eighth note. 
        synth.triggerAttackRelease("C6", "8n");
    }, "2n").start(0);
    loop.iterations = 4;
    Tone.Transport.bpm.value = 175;

    hat = new Tone.Player(soundLinks[0]).toMaster();
    snr = new Tone.Player(soundLinks[1]).toMaster();
    kik = new Tone.Player(soundLinks[2]).toMaster();
    soundBuffers = [hat, snr, kik];
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
    // Tone.Transport.toggle();
}

function playSound(index, time) {
    soundBuffers[index].start(time);
}