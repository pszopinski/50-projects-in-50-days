const card = document.getElementById("card");
const header = document.getElementById("header");
const title = document.getElementById("title");
const content = document.getElementById("content");

function loadContent() {
  card.classList.add("card--blue");
  header.innerHTML =
    '<img class="card__picture" src="https://picsum.photos/400/300" alt="Example picture">';
  title.textContent = "Card Title";
  content.innerHTML =
    '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, voluptatum tempora? Sed mollitia dolore omnis laborum iure! Repellat quo, error non a molestiae odit ratione autem est vitae! Laboriosam, minus?</p><button class="button button--blue">Click here</button>';
}

setTimeout(() => {
  loadContent();
  card.addEventListener("click", () => window.location.reload());
}, 2500);
