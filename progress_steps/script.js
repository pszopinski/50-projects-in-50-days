const progressBar = document.querySelector(".progress-bar");
const steps = document.querySelectorAll(".step");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let activeStep = 1;

nextBtn.addEventListener("click", () => {
  activeStep = Math.min(activeStep + 1, steps.length);
  update();
});

prevBtn.addEventListener("click", () => {
  activeStep = Math.max(activeStep - 1, 1);
  update();
});

function update() {
  updateSteps();
  updateProgressBar();
  updateButtons();
}

function updateSteps() {
  steps.forEach((step, i) => {
    if (i < activeStep) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
}

function updateProgressBar() {
  // There are one less segments than the steps
  const progress = (activeStep - 1) / (steps.length - 1);
  progressBar.style.width = `${100 * progress}%`;
}

function updateButtons() {
  prevBtn.disabled = activeStep <= 1;
  nextBtn.disabled = activeStep >= steps.length;
}
