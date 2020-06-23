/**
 * Module responsible for the audio playing in drumBOT at lepik.se
 * Powered by ToneJS
 * Written by Andreas Lepik
 */
export { playSounds }

const audioContext = new AudioContext();
const soundPlayers = [];
const soundLinks = ["sounds/hihat.wav", "sounds/snare.wav", "sounds/kick.wav"];
const soundNames = new Map([["hihat", 0], ["snare", 1], ["kick", 2]]);
const sequences = [];
var seq;
var hat;
var snr;
var kik;
const synth = new Tone.Synth().toMaster();


window.addEventListener('load', init, false);

function init() {
    loadSounds(soundLinks);

    // seq = new Tone.Sequence(curriedTriggerNote(soundPlayers[0]), [true, true, false, [true, true]], "4n");
    // seq.start(0);
    // seq.loop = true;
    // seq.loopEnd = "2m";

    createSequences(soundPlayers);

    Tone.Transport.bpm.value = 175;
}

function curriedTriggerNote(player) {
    return function(time, note) {
        if (note) {
            player.start(time);
        }
    }
}

function loadSounds(links) {
    // Set up new Player
    function loadSound(link, bufferIndex) {
        soundPlayers[bufferIndex] = new Tone.Player(link).toMaster();
    }

    links.forEach(
        (link, index) => loadSound(link, index));
}

function createSequences(players) {
    // Set up new sequence with desired configuration
    function createSequence(player) {
        const seq = new Tone.Sequence(curriedTriggerNote(player), [true, false]);
        seq.start(0);
        seq.loop = true;
        seq.loopEnd = "2m";
        return seq;
    }

    players.forEach(
        (player, index) => sequences[index] = createSequence(player)
    );
}

function playSounds(timeMatrix) {
    // const current = audioContext.currentTime;
    // for (var i = 0; i < timeMatrix.length; i++) {
    //     timeMatrix[i].forEach(
    //         time => playSound(i, current + time)
    //     );
    // }
    for (var i = 0; i < timeMatrix.length; i++) {
        for (var j = 0; j < timeMatrix[i].length; j++) {
            sequences[i].at(j, timeMatrix[i][j]);
        }
    }
     
    Tone.Transport.toggle();
}

function playSound(index, time) {
    soundPlayers[index].start(time);
}