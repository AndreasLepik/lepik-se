
var audioContext;
var soundBuffers = [];
var soundLinks = ["sounds/hihat.wav"];
var bpm = 175;
var beatLength = 60.0 / bpm;

window.addEventListener('load', init, false);

function init() {
    audioContext = new AudioContext();
    loadSounds(soundLinks);
}

function hatzzz() {
    var time = audioContext.currentTime;
    playSound(soundBuffers[0], time);
    playSound(soundBuffers[0], time + beatLength);
    playSound(soundBuffers[0], time + beatLength * 1.66);
    playSound(soundBuffers[0], time + beatLength * 2);
    playSound(soundBuffers[0], time + beatLength * 3);
    playSound(soundBuffers[0], time + beatLength * 3.66);
    playSound(soundBuffers[0], time + beatLength * 4);
    playSound(soundBuffers[0], time + beatLength * 4.66);
    playSound(soundBuffers[0], time + beatLength * 5);
    playSound(soundBuffers[0], time + beatLength * 6);
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

function playSound(buffer, time) {
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(time);
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
