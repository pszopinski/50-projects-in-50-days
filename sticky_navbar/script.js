function updateHeaderSize() {
  // Shrink the header once the user has scrolled past 50vh
  const header = document.getElementById("header");

  const threshold = window.innerHeight * 0.5;
  const scrollPosition = -document.body.getBoundingClientRect().top;
  header.classList.toggle("small", scrollPosition > threshold);
}

window.addEventListener("scroll", updateHeaderSize);
window.addEventListener("resize", updateHeaderSize);
