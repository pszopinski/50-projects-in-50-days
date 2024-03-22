const container = document.querySelector(".container");
const input = document.querySelector("input");
const button = document.querySelector("button");

button.addEventListener("click", () => {
  const doFocus = container.classList.toggle("active");
  if (doFocus) {
    input.focus();
  }
});
