var cards = [];
cards[0] = 'K♦';
cards[1] = 'E♥';
cards[2] = '2♣';
cards[3] = '3♠';

var treasuryArray = [0, 1, 2, 3];
var handArray = [];
var trashArray = [];

var actions = ['draw', 'discard', 'help', 'restart'];
var action;

document.getElementById("button1").addEventListener("click", clickHandler);

function clickHandler() {
  var currentInput = document.getElementById('input1').value.toLowerCase();
  action = actions.indexOf(currentInput);
  switch (action) {
    case 0:
      if (drawHandler()) {
        output.innerHTML = 'Last action: draw.';
      } else {
        output.innerHTML = 'Action draw failed.';
      }
      break;
    case 1:
      if (discardHandler()) {
        output.innerHTML = 'Last action: discard.';
      } else {
        output.innerHTML = 'Action discard failed.';
      }
      break;
    case 2:
      output.innerHTML = helpHandler();
      break;
    case -1:
      output.innerHTML = "I don't understand what " + currentInput + ' means.';
      break;
    default:
      output.innerHTML = 'Stop breaking my game, plis D:< ' + currentInput;
  }
  updateParagraphs();
}

function drawHandler() {
  if (treasuryArray.length > 0) {
    handArray = handArray.concat(treasuryArray.pop());
    return true;
  } else {
    return false;
  }
}

function discardHandler() {
  if (handArray.length > 0) {
    trashArray = trashArray.concat(handArray.pop());
    return true;
  } else {
    return false;
  }
}

// Sends help meassege to output
function helpHandler() {
  var res = 'Available actions: ';
  var current;
  for (current in actions) {
    res = res.concat(actions[current], ', ');
  }
  res = res.slice(0, res.length - 2);
  res = res.concat('.');
  return res;
}

function updateParagraphs() {
  treasury.innerHTML = updateHelper('Treasury: ', treasuryArray);
  hand.innerHTML = updateHelper('Hand: ', handArray);
  trash.innerHTML = updateHelper('Trash: ', trashArray);
}

function updateHelper(start, array) {
  var res = start;
  var i;
  for (i of array) {
    res = res.concat(cards[i], ', ');
  }
  if (array.length > 0) {
    res = res.slice(0, res.length - 2);
    res = res.concat('.');
  }
  return res;
}

document.getElementById('input1').addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    clickHandler();
  }
});

// Input and output fields, whatever that means
// var output = document.querySelector("#output");
// var input = document.querySelector("#output");

// var button = document.querySelector("button");
// button.style.cursor = "pointer";
// button.addEventListener("click", clickHandler, false);

// output.innerHTML = cards[hand];
