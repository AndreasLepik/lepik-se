/**
 * Module responsible for playing audio and audio logic in drumBOT at lepik.se
 * Powered by ToneJS
 * Written by Andreas Lepik
 */
export { playMatrix, togglePlay, toggleLoop, setBox }

const soundPlayers = [];
const soundLinks = ["sounds/hihat.wav", "sounds/snare.wav", "sounds/kick.wav"];
const sequences = [];


window.addEventListener('load', init, false);

function init() {
    loadSounds(soundLinks);
    createSequences(soundPlayers);
    Tone.Transport.stop("2m");
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
        seq.loop = false;
        seq.loopStart = 0;
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
    if (sequences[0].loop) {
        Tone.Transport.toggle();
    } else {
        // Tone.Transport.position = 0;
        Tone.Transport.toggle();
    }
}

function toggleLoop(bool) {
    var loopVar;
    if (bool) {
        loopVar = true;
    } else {
        loopVar = 1;
    }
    sequences.forEach(
        seq => seq.loop = bool
    );
}

function setBox(i, j, bool) {
    console.log("setBox: " + i + j);
    sequences[i].at(j, bool);
}


