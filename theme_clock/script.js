const toggleDarkModeBtn = document.getElementById("toggleDarkMode");

let darkMode = false;
function toggleDarkMode(force) {
  darkMode = document.body.classList.toggle("dark-mode", force);
  toggleDarkModeBtn.textContent = darkMode ? "Dark mode" : "Light mode";
}

toggleDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    toggleDarkMode(e.matches);
  });
toggleDarkModeBtn.addEventListener("click", () => {
  toggleDarkMode();
});
