["dangerous", "laugh", "meditation", "oh_yeah", "ooh", "snail"].forEach(
  insertButton
);

function insertButton(sound) {
  const button = document.createElement("button");
  button.textContent = sound.replaceAll("_", " ");
  addAudioFuntionalityTo(button, sound);
  document.getElementById("soundBoard").appendChild(button);
}

function addAudioFuntionalityTo(button, sound) {
  button.audio = new Audio(`audio/${sound}.wav`);
  button.audio.addEventListener("play", () => {
    button.classList.add("playing");
  });
  button.audio.addEventListener("ended", () => {
    button.classList.remove("playing");
  });
  button.addEventListener("click", (e) => {
    button.audio.play();
  });
}
