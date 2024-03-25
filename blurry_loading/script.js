const loader = document.querySelector(".loader");
let progress = 0;

let timeoutId;

function incrementProgress() {
  const increment = Math.random() / 20;
  progress = Math.min(progress + increment, 1);
  loader.style.setProperty("--progress", progress);
  loader.textContent = `${Math.floor(progress * 100)}%`;
  if (progress >= 1) {
    clearInterval(timeoutId);
  }
}

setTimeout(() => {
  timeoutId = setInterval(incrementProgress, 100);
}, 2000);
