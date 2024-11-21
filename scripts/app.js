// Timer Variables
let focusTime = 25 * 60;
let shortBreakTime = 5 * 60;
let longBreakTime = 30 * 60;
let timer;
let currentMode = 'focus';
let timeLeft = focusTime;

// DOM Elements
const timerDisplay = document.getElementById('timer-display');
const focusBtn = document.querySelector('.focus');
const shortBreakBtn = document.querySelector('.short-break');
const longBreakBtn = document.querySelector('.long-break');
const startBtn = document.querySelector('.start-btn');
const timerModeText = document.getElementById('timer-mode');

// Navigation Elements
const timerLink = document.getElementById('timers');
const studyTipsLink = document.getElementById('studytips');
const techniquesLink = document.getElementById('studytech');
const timerSection = document.getElementById('timer-section');
const studyTipsSection = document.getElementById('study-tips-section');
const techniquesSection = document.getElementById('techniques-section');

// Settings Modal Elements
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const saveSettingsBtn = document.getElementById('save-settings');
const closeSettingsBtn = document.getElementById('close-settings');
const focusInput = document.getElementById('focus-time-input');
const shortBreakInput = document.getElementById('short-break-input');
const longBreakInput = document.getElementById('long-break-input');

// Music Player Elements
const audio = document.getElementById('background-music');
const playPauseBtn = document.getElementById('play-pause-btn');
const volumeControl = document.getElementById('volume-control');

// Initialize Timer Display
function updateDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
updateDisplay(focusTime);

// Start Timer
function startTimer(duration) {
    clearInterval(timer);
    timeLeft = duration;

    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up!");
            switchToNextMode();
        }
        updateDisplay(timeLeft);
        timeLeft--;
    }, 1000);
}

// Switch Modes
function switchMode(mode) {
    currentMode = mode;
    clearInterval(timer);

    if (mode === 'focus') {
        updateDisplay(focusTime);
        timeLeft = focusTime;
        timerModeText.textContent = 'Focus Timer';
    } else if (mode === 'short-break') {
        updateDisplay(shortBreakTime);
        timeLeft = shortBreakTime;
        timerModeText.textContent = 'Short Break Timer';
    } else if (mode === 'long-break') {
        updateDisplay(longBreakTime);
        timeLeft = longBreakTime;
        timerModeText.textContent = 'Long Break Timer';
    }
}

// Auto-Switch Mode
function switchToNextMode() {
    if (currentMode === 'focus') {
        switchMode('short-break');
    } else if (currentMode === 'short-break') {
        switchMode('long-break');
    } else {
        switchMode('focus');
    }
    startTimer(timeLeft);
}

// Event Listeners for Timer Buttons
focusBtn.addEventListener('click', () => switchMode('focus'));
shortBreakBtn.addEventListener('click', () => switchMode('short-break'));
longBreakBtn.addEventListener('click', () => switchMode('long-break'));
startBtn.addEventListener('click', () => startTimer(timeLeft));

// Navigation Links
function switchSection(activeSection) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    activeSection.classList.add('active');
}

timerLink.addEventListener('click', () => switchSection(timerSection));
studyTipsLink.addEventListener('click', () => switchSection(studyTipsSection));
techniquesLink.addEventListener('click', () => switchSection(techniquesSection));

// Settings Modal
settingsBtn.addEventListener('click', () => {
    settingsModal.style.display = 'flex';
    focusInput.value = focusTime / 60;
    shortBreakInput.value = shortBreakTime / 60;
    longBreakInput.value = longBreakTime / 60;
});

closeSettingsBtn.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

saveSettingsBtn.addEventListener('click', () => {
    focusTime = focusInput.value * 60;
    shortBreakTime = shortBreakInput.value * 60;
    longBreakTime = longBreakInput.value * 60;
    settingsModal.style.display = 'none';
});

// Background Music
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸️';
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶️';
    }
});

volumeControl.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Background Swapper
document.querySelectorAll('.bg-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.body.style.backgroundImage = `url(images/${button.dataset.bg}.jpg)`;
    });
});
