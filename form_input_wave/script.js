const lables = document.querySelectorAll("label");

lables.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map((letter, idx) => {
      const initialDelayMs = 100;
      const incrementalDelayMs = 50;
      const delay = `${initialDelayMs + incrementalDelayMs * idx}ms`;
      return `<span style="transition-delay: ${delay}">${letter}</span>`;
    })
    .join("");
});
