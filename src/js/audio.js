/**
 * Module responsible for playing audio and sequencer logic in drumBOT at lepik.se
 * Powered by ToneJS
 * Written by Andreas Lepik
 */
export { playMatrix, togglePlay, setLoop, setBox, setTempo }

const soundPlayers = [];
const soundLinks = ["sounds/hihat.wav", "sounds/snare.wav", "sounds/kick.wav"];
const sequences = [];


window.addEventListener('load', init, false);


// Runs on startup.
function init() {
    loadSounds(soundLinks);
    createSequences(soundPlayers);
    Tone.Transport.bpm.value = 175;
}


/**
 * Initializes a Player for each sample.
 * @param {Object} links is an array of strings describing the sample locations. 
 */
function loadSounds(links) {
    links.forEach(
        (link, index) => soundPlayers[index] = new Tone.Player(link).toMaster());
}


/**
 * Initializes Sequences, one for each instrument.
 * @param {Object} players is the array of Players.
 */
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


/**
 * playMatrix evaluates all checkboxes before starting/ stopping the sequence.
 * @param {Object} timeMatrix is a two-dimensional array describing which notes should be triggered in each sequence.
 */
function playMatrix(timeMatrix) {
    for (var i = 0; i < timeMatrix.length; i++) {
        for (var j = 0; j < timeMatrix[i].length; j++) {
            sequences[i].at(j, timeMatrix[i][j]);
        }
    }
    
    togglePlay();
}


// togglePlay starts/ stops the sequence depending on its current state.
function togglePlay() {
    if (sequences[0].loop) {
        Tone.Transport.toggle();
    } else {
        if (Tone.Transport.state == 'stopped' || Number(Tone.Transport.position[0]) >= 2) {
            Tone.Transport.stop();
            Tone.Transport.start();
        } else {
            Tone.Transport.stop();
        }
    }
}


/**
 * setLoop activates/ deactivates the loop functionality.
 * @param {Boolean} bool decides wheter the sequence should loop or not.
 */
function setLoop(bool) {
    if (!sequences[0].loop && Number(Tone.Transport.position[0]) >= 2) {
        Tone.Transport.stop();
    }
    sequences.forEach(
        seq => seq.loop = bool
    );
}


/**
 * setBox changes the value of a specific step in a sequence.
 * @param {Number} i is the index of the row.
 * @param {Number} j is the index of the column.
 * @param {Boolean} bool is the new value of the step.
 */
function setBox(i, j, bool) {
    console.log("setBox: " + i + j);
    sequences[i].at(j, bool);
}

/**
 * setTempo is used to set a new tempo.
 * @param {Number} tempo is the new tempo in bpm.
 */
function setTempo(tempo) {
    if (tempo >= 50 && tempo <= 300) {
        Tone.Transport.bpm.value = tempo;
    }
}
