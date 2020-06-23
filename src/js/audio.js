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
    console.log("init");
    loadSounds(soundLinks);

    seq = new Tone.Sequence(function(time, note){
        console.log(note);
        playSound(note, time)
    //straight quater notes
    }, [2, 2, 0, 2], "4n");
    seq.start(0);


    // createSequences(soundPlayers);

    // sequences[0] = new Tone.Sequence(function(time, note) {
    //     console.log(note);
    //     playSound(note, time);
    // }, [3, 3, 0, 3]);
    // sequences[0].loopStart = 0;
    // sequences[0].loopEnd = "1m";
    // sequences[0].loop = true;
     

    Tone.Transport.bpm.value = 175;

}

function loadSounds(links) {
    links.forEach(
        (link, index) => loadSound(link, index));
}

function loadSound(link, bufferIndex) {
    soundPlayers[bufferIndex] = new Tone.Player(soundLinks[bufferIndex]).toMaster();
}

// function createSequences(players) {
    // players.forEach(
        // (player, index) => sequences[index] = new Tone.Sequence(time => player.start(time), [false, false, false, false])
    // );
    // sequences.forEach(
        // seq => seq.
    // )
// }

function playSounds(timeMatrix) {
    // const current = audioContext.currentTime;
    // for (var i = 0; i < timeMatrix.length; i++) {
    //     timeMatrix[i].forEach(
    //         time => playSound(i, current + time)
    //     );
    // }
     
    Tone.Transport.toggle();
}

function playSound(index, time) {
    soundPlayers[index].start(time);
}