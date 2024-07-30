let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCounter = 0; 

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
    }, 10);
    startStopBtn.textContent = 'Pause';
    running = true;
}

function pause() {
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
    running = false;
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.000';
    elapsedTime = 0;
    startStopBtn.textContent = 'Start';
    laps.innerHTML = '';
    lapCounter = 0;
    running = false;
}

function lap() {
    lapCounter++; 
    const lapTime = formatTime(elapsedTime);
    const lapElement = document.createElement('li');
    lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
    laps.appendChild(lapElement);
}

startStopBtn.addEventListener('click', function() {
    if (running) {
        pause();
    } else {
        start();
    }
});

resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
