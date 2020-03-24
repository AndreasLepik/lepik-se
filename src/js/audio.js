
var audioContext;
var soundBuffer;

window.addEventListener('load', init, false);
document.getElementById("drawButton").addEventListener('click', hatzzz);

function init() {
        audioContext = new AudioContext();
        loadSound("hihat.wav");
}

function hatzzz() {
    // finishedLoading(soundBuffer);
    playSound(soundBuffer);
    // loadSound("hihat.wav");

}

function loadSound(link) {
    var request = new XMLHttpRequest();
    request.open('GET', link, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
        audioContext.decodeAudioData(request.response, function(buffer) {
            soundBuffer = buffer;
        }, onError);
    }
    request.send();
    // soundBuffer = new BufferLoader(
    //     audioContext,
    //     [link],
    //     finishedLoading
    // );
    // soundBuffer.load();
}

function onError() {
    console.error("")
}

function finishedLoading(bufferList) {
    var source = audioContext.createBufferSource();
    source.buffer = bufferList[0];
    source.connect(audioContext.destination);
    source.start(0);
}

function playSound(buffer) {
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
}

