for (const article of document.querySelectorAll("article")) {
  article.addEventListener("click", (e) => {
    console.log("article handler");

    if (!article.classList.contains("active")) {
      article.classList.add("active");
    }
  });
  article.querySelector("button").addEventListener("click", (e) => {
    console.log("button handler");
    article.classList.remove("active");
    e.stopPropagation();
  });
}
