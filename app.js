const testWrapper = document.querySelector(".text-wrapper");
const testArea = document.querySelector("#testArea");
const originalText = document.querySelector(".text").innerHTML;
const btn = document.querySelector("#reset");
const timer = document.querySelector(".timer");

let time = [0, 0, 0, 0];
let interval;
let timeRunning = false;

// adds missing zero to time 00:00:00!
function missingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}

// create a clock
function runTimer() {
  let currentTime =
    missingZero(time[0]) +
    ":" +
    missingZero(time[1]) +
    ":" +
    missingZero(time[2]);

  timer.innerHTML = currentTime;

  time[3]++;

  // starting timer while presing the first letter
  time[0] = Math.floor(time[3] / 100 / 60);
  time[1] = Math.floor(time[3] / 100 - time[0] * 60);
  time[2] = Math.floor(time[3] - time[1] * 100 - time[0] * 6000);
}

// reset everything
function reset() {
  clearInterval(interval);
  interval = null;
  time = [0, 0, 0, 0];
  timeRunning = false;

  testArea.value = "";
  timer.innerHTML = "00:00:00";

  testWrapper.style.borderColor = "#118789";
}

// match the text with providet text
function spellCheck() {
  let textInput = testArea.value;
  let textMatch = originalText.substring(0, textInput.length);

  if (textInput === originalText) {
    testWrapper.style.borderColor = "#FF821C";
    clearInterval(interval);
  } else {
    if (textInput === textMatch) {
      testWrapper.style.borderColor = "#118789";
    } else {
      testWrapper.style.borderColor = "#F05D5E";
    }
  }
}
// Start timer function
function startApp() {
  let textInputLength = testArea.value.length;
  if (textInputLength === 0) {
    timerRunning = true;
    interval = setInterval(runTimer, 10);
  }
}

//
// Event listeners for keyboard input and reset button
testArea.addEventListener("keypress", startApp, false);
testArea.addEventListener("keyup", spellCheck, false);
btn.addEventListener("click", reset, false);
