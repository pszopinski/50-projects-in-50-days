const loader = document.getElementById("loader");
const numberOfSides = document.getElementById("numberOfSides");
const animationDuration = document.getElementById("animationDuration");

let n = numberOfSides.value;
let duration = animationDuration.value;

/* Create an n-sided loader element */
function createLoader() {
  const loader = createDiv(
    "loader",
    ["--n", n],
    ["--duration", `${duration}ms`]
  );

  for (let sideIdx = 0; sideIdx < n; ++sideIdx) {
    const side = createSide(sideIdx, n);
    loader.appendChild(side);
  }

  return loader;
}

function createSide(sideIdx, n) {
  const side = createDiv("side", ["--side", sideIdx]);
  side.appendChild(createBallContainer(sideIdx, n));
  return side;
}

function createBallContainer(sideIdx, n) {
  const ballContainer = createDiv("ball-container");

  ballContainer.animate = () => {
    ballContainer.classList.add("animate");
    setTimeout(() => ballContainer.classList.remove("animate"), duration);
  };
  setUpAnimation(ballContainer, sideIdx, n);

  const initialDelay = sideIdx * duration;
  const animationCycle = n * duration;
  setTimeout(() => {
    ballContainer.animate();
    setInterval(ballContainer.animate, animationCycle);
  }, initialDelay);

  return ballContainer;
}

function setUpAnimation(element, idx, n) {
  const initialDelay = idx * duration;
  const animationCycle = n * duration;
  setTimeout(() => {
    element.animate();
    setInterval(element.animate, animationCycle);
  }, initialDelay);
}

function createDiv(className, ...cssProperties) {
  const div = document.createElement("div");
  div.className = className;

  for (let [name, value] of cssProperties) {
    div.style.setProperty(name, value);
  }

  return div;
}

numberOfSides.addEventListener("change", update);
animationDuration.addEventListener("change", update);

function update() {
  n = numberOfSides.value;
  duration = animationDuration.value;

  if (loader.firstElementChild) {
    loader.removeChild(loader.firstElementChild);
  }
  loader.appendChild(createLoader());
}

update();
