/**
 * Module responsible for the audio playing in drumBOT at lepik.se
 * Powered by ToneJS
 * Written by Andreas Lepik
 */
export { playMatrix, togglePlay, setBox }

const soundPlayers = [];
const soundLinks = ["sounds/hihat.wav", "sounds/snare.wav", "sounds/kick.wav"];
const sequences = [];


window.addEventListener('load', init, false);

function init() {
    loadSounds(soundLinks);
    createSequences(soundPlayers);
    Tone.Transport.bpm.value = 175;
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

    // Create function to be used by a sequencer to trigger a player
    function curriedTriggerNote(player) {
        return function(time, note) {
            if (note) {
                player.start(time);
            }
        }
    }    

    players.forEach(
        (player, index) => sequences[index] = createSequence(player)
    );
}

function playMatrix(timeMatrix) {
    for (var i = 0; i < timeMatrix.length; i++) {
        for (var j = 0; j < timeMatrix[i].length; j++) {
            sequences[i].at(j, timeMatrix[i][j]);
        }
    }
     
    Tone.Transport.toggle();
}

function togglePlay() {
    Tone.Transport.toggle();
}

function setBox(i, j, bool) {
    soundPlayers[i].get(i, bool);
}
