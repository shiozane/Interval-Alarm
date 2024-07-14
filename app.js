let time1, time2, currentTimer, currentAudio, timerInterval;
let isRunning = false;
let isPaused = false;
let currentInterval = 1; // 1 for time1, 2 for time2
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const restartButton = document.getElementById('restart');
const hour1Input = document.getElementById('hour1');
const minute1Input = document.getElementById('minute1');
const hour2Input = document.getElementById('hour2');
const minute2Input = document.getElementById('minute2');
const gear1 = document.getElementById('gear1');
const gear2 = document.getElementById('gear2');
const audio1Input = document.getElementById('audio1');
const audio2Input = document.getElementById('audio2');
const playAudio1Button = document.getElementById('playAudio1');
const playAudio2Button = document.getElementById('playAudio2');

gear1.addEventListener('click', () => audio1Input.click());
gear2.addEventListener('click', () => audio2Input.click());

audio1Input.addEventListener('change', () => {
    if (audio1Input.files.length > 0) {
        playAudio1Button.addEventListener('click', () => {
            const audio = new Audio(URL.createObjectURL(audio1Input.files[0]));
            audio.play();
        });
    }
});

audio2Input.addEventListener('change', () => {
    if (audio2Input.files.length > 0) {
        playAudio2Button.addEventListener('click', () => {
            const audio = new Audio(URL.createObjectURL(audio2Input.files[0]));
            audio.play();
        });
    }
});

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
restartButton.addEventListener('click', restartTimer);

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    if (!isPaused) {
        setTimers();
        currentTimer = (currentInterval === 1) ? time1 : time2;
        currentAudio = getCurrentAudio();
        setDisplayColor();
    }
    isPaused = false;
    timerInterval = setInterval(countdown, 1000);
    displayTime(currentTimer);
}

function pauseTimer() {
    isRunning = false;
    isPaused = true;
    clearInterval(timerInterval);
}

function restartTimer() {
    isRunning = false;
    isPaused = false;
    clearInterval(timerInterval);
    setTimers();
    currentInterval = 1; // Reset to first interval
    currentTimer = time1;
    currentAudio = audio1Input.files.length > 0 ? new Audio(URL.createObjectURL(audio1Input.files[0])) : null;
    timeDisplay.style.color = 'orange';
    displayTime(currentTimer);
    startTimer(); // Automatically start timer after restart
}

function setTimers() {
    time1 = parseInt(hour1Input.value) * 60 + parseInt(minute1Input.value);
    time2 = parseInt(hour2Input.value) * 60 + parseInt(minute2Input.value);
}

function countdown() {
    if (currentTimer <= 1) {
        if (currentAudio) currentAudio.play();
        switchInterval();
    } else {
        currentTimer--;
        displayTime(currentTimer);
    }
}

function switchInterval() {
    if (currentInterval === 1) {
        if (time2 > 0) {
            currentInterval = 2;
            currentTimer = time2;
            currentAudio = audio2Input.files.length > 0 ? new Audio(URL.createObjectURL(audio2Input.files[0])) : null;
            timeDisplay.style.color = 'green';
        } else {
            currentTimer = time1;
            currentAudio = audio1Input.files.length > 0 ? new Audio(URL.createObjectURL(audio1Input.files[0])) : null;
            timeDisplay.style.color = 'orange';
        }
    } else {
        currentInterval = 1;
        currentTimer = time1;
        currentAudio = audio1Input.files.length > 0 ? new Audio(URL.createObjectURL(audio1Input.files[0])) : null;
        timeDisplay.style.color = 'orange';
    }
    displayTime(currentTimer);
}

function getCurrentAudio() {
    if (currentInterval === 1) {
        return audio1Input.files.length > 0 ? new Audio(URL.createObjectURL(audio1Input.files[0])) : null;
    } else {
        return audio2Input.files.length > 0 ? new Audio(URL.createObjectURL(audio2Input.files[0])) : null;
    }
}

function setDisplayColor() {
    if (currentInterval === 1) {
        timeDisplay.style.color = 'orange';
    } else {
        timeDisplay.style.color = 'green';
    }
}

function displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timeDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
