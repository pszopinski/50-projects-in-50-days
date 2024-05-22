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

  hourHand.style.rotate = `${hours / 12}turn`;
  minuteHand.style.rotate = `${minutes / 60}turn`;
  secondHand.style.rotate = `${seconds / 60}turn`;
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
