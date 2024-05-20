const smallCups = document.querySelectorAll("#smallCups > *");
const remainingValue = document.querySelector("#remainingValue");
const percentage = document.querySelector("#percentage");

smallCups.forEach((cup, index) => {
  cup.addEventListener("click", () => onSmallCupClicked(index));
});

let cupCount = 0;

function onSmallCupClicked(cupIndex) {
  cupCount =
    cupIndex === 0 && cupCount === 1
      ? 0 /*  deselecting the first cup to get to 0 */
      : cupIndex + 1;

  updateBigCup();
  updateSmallCups();
}

function updateBigCup() {
  const volume = 2 - cupCount * 0.25;
  remainingValue.textContent = `${volume} l`;

  const newPercentage = `${(cupCount / 8) * 100}%`;
  percentage.textContent = newPercentage;
  percentage.style.height = newPercentage;
}

function updateSmallCups() {
  smallCups.forEach((cup, index) => {
    cup.classList.toggle("full", index < cupCount);
  });
}
