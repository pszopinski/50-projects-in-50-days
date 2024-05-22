const toggleDarkModeBtn = document.getElementById("toggleDarkMode");
const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const secondHand = document.getElementById("secondHand");
const timeDisplay = document.getElementById("time");
const dateDisplay = document.getElementById("date");

let darkMode = false;
function toggleDarkMode(force) {
  darkMode = document.body.classList.toggle("dark-mode", force);
  toggleDarkModeBtn.textContent = darkMode ? "Dark mode" : "Light mode";
}

function updateTime() {
  const now = new Date();
  updateClockHands(now);
  updateDisplay(now);
}

function updateClockHands(date) {
  const seconds = date.getSeconds();
  const minutes = date.getMinutes() + seconds / 60;
  const hours = date.getHours() + minutes / 60;

  rotateHand(hourHand, hours / 12);
  rotateHand(minuteHand, minutes / 60);
  rotateHand(secondHand, seconds / 60);
}

function rotateHand(hand, fraction) {
  if (fraction === 0) {
    finishFullTurn(hand);
    return;
  }

  hand.style.rotate = `${fraction}turn`;
}

function finishFullTurn(hand) {
  hand.style.rotate = "1turn";

  // Disable animations and reset back to 0turn
  setTimeout(() => {
    hand.style.transition = "initial";
    hand.style.rotate = "0turn";
  }, 500);

  // Re-enable animations
  setTimeout(() => {
    hand.style.removeProperty("transition");
  }, 600);
}

function updateDisplay(date) {
  const timeStr = Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
  const dateStr = Intl.DateTimeFormat(undefined, {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

  timeDisplay.textContent = timeStr;
  dateDisplay.textContent = dateStr;
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    toggleDarkMode(e.matches);
  });
toggleDarkModeBtn.addEventListener("click", () => {
  toggleDarkMode();
});

setInterval(() => {
  updateTime();
}, 1000);

toggleDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
updateTime();
