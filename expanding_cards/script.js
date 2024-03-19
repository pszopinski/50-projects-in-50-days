const panels = document.querySelectorAll(".panel");

panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    removeActiveCls();
    panel.classList.add("active");
  });
});

function removeActiveCls() {
  panels.forEach((panel) => panel.classList.remove("active"));
}
