const joke = document.getElementById("joke");

async function getJoke() {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });
  const json = await response.json();
  return json.joke;
}

let button = document.getElementById("refreshBtn");
button.addEventListener("click", () => {
  getJoke().then((text) => (joke.textContent = text));
});

button.click();
