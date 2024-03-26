const blockquotes = document.querySelectorAll("blockquote");

function updateBlockquoteVisibility() {
  blockquotes.forEach((blockquote) => {
    const threshold = window.innerHeight * 0.9;
    const topEdge = blockquote.getBoundingClientRect().top;
    blockquote.classList.toggle("visible", topEdge < threshold);
  });
}

updateBlockquoteVisibility();

window.addEventListener("scroll", updateBlockquoteVisibility);
