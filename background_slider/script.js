const slides = document.querySelectorAll(".slide");
const left = document.querySelector("#left");
const right = document.querySelector("#right");

left.addEventListener("click", prevSlide);
right.addEventListener("click", nextSlide);

let activeSlideIdx = 0;

function prevSlide() {
  activeSlideIdx = (activeSlideIdx - 1 + slides.length) % slides.length;
  showSlide(activeSlideIdx);
}

function nextSlide() {
  activeSlideIdx = (activeSlideIdx + 1) % slides.length;
  showSlide(activeSlideIdx);
}

function showSlide(slideIdx) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[slideIdx].classList.add("active");
  document.body.style.backgroundImage = slides[slideIdx].style.backgroundImage;
}
