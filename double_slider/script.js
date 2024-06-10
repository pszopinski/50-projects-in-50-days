const portraitOrientation = window.matchMedia("(orientation: portrait)");

const imgPane = document.getElementById("imgPane");
const textPane = document.getElementById("textPane");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const itemCount = imgPane.childElementCount;
let currentItemIdx = 0;

function previousItem() {
  currentItemIdx = (itemCount + --currentItemIdx) % itemCount;
  animate(updateSliders);
}

function nextItem() {
  currentItemIdx = ++currentItemIdx % itemCount;
  animate(updateSliders);
}

function animate(callback) {
  document.body.classList.add("animate");
  callback();
  setTimeout(() => {
    document.body.classList.remove("animate");
  }, 300);
}

function updateSliders() {
  textPane.style.transform = portraitOrientation.matches
    ? `translateX(-${currentItemIdx}00dvw)`
    : `translateY(-${currentItemIdx}00dvh)`;

  imgPane.style.transform = portraitOrientation.matches
    ? `translateX(${currentItemIdx}00dvw)`
    : `translateY(${currentItemIdx}00dvh)`;
}

nextBtn.addEventListener("click", nextItem);
prevBtn.addEventListener("click", previousItem);
portraitOrientation.addEventListener("change", updateSliders);
updateSliders();
