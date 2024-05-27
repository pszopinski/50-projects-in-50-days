const emojiList = document.getElementById("emojiList");
const sentenceList = document.getElementById("sentenceList");

function createSentenceElement(other) {
  const li = document.createElement("li");
  li.className = "sentence";
  if (other === this.dataset.consumes) {
    li.classList.add("correct");
  }

  const randomAngle = () => 5 * (Math.random() - 0.5);
  const blank = (text) =>
    `<span class="blank" style="rotate: ${randomAngle()}deg">${text}</span>`;
  li.innerHTML = this.dataset.sentenceTemplate
    .replace(":self:", blank(this.dataset.name))
    .replace(":other:", blank(other));

  return li;
}

function createEmoji({
  emoji,
  name,
  draggable,
  sentenceTemplate = null,
  consumes = null,
}) {
  const div = document.createElement("div");
  div.className = "emoji";
  div.textContent = emoji;
  div.dataset.emoji = emoji;
  div.dataset.name = name;
  div.dataset.sentenceTemplate = sentenceTemplate;
  div.dataset.consumes = consumes;
  div.draggable = draggable;

  if (sentenceTemplate && consumes) {
    div.createSentenceElement = createSentenceElement.bind(div);
  }
  return div;
}

function setUp() {
  const sun = { emoji: "☀️", name: "sun", draggable: false };
  let organisms = [
    {
      emoji: "☘️",
      name: "plants",
      draggable: true,
      sentenceTemplate: ":self: need :other: to grow",
      consumes: "sun",
    },
    {
      emoji: "🐛",
      name: "caterpillars",
      draggable: true,
      sentenceTemplate: ":self: eat :other:",
      consumes: "plants",
    },
    {
      emoji: "🐦️",
      name: "birds",
      draggable: true,
      sentenceTemplate: ":self: eat :other:",
      consumes: "caterpillars",
    },
    {
      emoji: "🦊",
      name: "foxes",
      draggable: true,
      sentenceTemplate: ":self: hunt :other:",
      consumes: "birds",
    },
    {
      emoji: "🐺",
      name: "wolves",
      draggable: true,
      sentenceTemplate: ":self: hunt :other:",
      consumes: "foxes",
    },
    {
      emoji: "🦠",
      name: "bacteria",
      draggable: true,
      sentenceTemplate: ":self: decompose :other:",
      consumes: "wolves",
    },
  ];
  organisms.sort(() => Math.random() - 0.5);

  for (const item of [sun, ...organisms]) {
    const box = document.createElement("li");
    box.className = "box";
    if (item.draggable) {
      box.classList.add("interactive");
    }
    box.appendChild(createEmoji(item));
    emojiList.appendChild(box);
  }
}

function updateSentences() {
  while (sentenceList.firstChild) {
    sentenceList.removeChild(sentenceList.lastChild);
  }

  const emojis = Array.from(document.querySelectorAll(".emoji"));
  emojis.reduce((prevEmoji, currEmoji) => {
    console.log(currEmoji, currEmoji.createSentenceElement);
    if (currEmoji.createSentenceElement) {
      const sentence = currEmoji.createSentenceElement(prevEmoji.dataset.name);
      sentenceList.appendChild(sentence);
    }
    return currEmoji;
  });

  document.body.classList.toggle(
    "game-over",
    !document.querySelector(".sentence:not(.correct)")
  );
}

function onDragstart(e) {
  e.dataTransfer.setData("text/plain", e.target.dataset.name);
}

function dropIsAllowed(e, emoji) {
  // Dropping into the current slot is not allowed
  return e.dataTransfer.getData("text/plain") != emoji.dataset.name;
}

function getEmojiByName(name) {
  return document.querySelector(`.emoji[data-name="${name}"]`);
}

function swapIcons(emojiA, emojiB) {
  if (emojiA.textContent == emojiA.dataset.emoji) {
    emojiA.textContent = emojiB.dataset.emoji;
  }

  if (emojiB.textContent == emojiB.dataset.emoji) {
    emojiB.textContent = emojiA.dataset.emoji;
  }
}

function resetIcon(emoji) {
  emoji.textContent = emoji.dataset.emoji;
}

function swapEmojis(a, b) {
  for (key in a.dataset) {
    [a.dataset[key], b.dataset[key]] = [b.dataset[key], a.dataset[key]];
  }
}

function onDragenter(e, emoji) {
  if (!dropIsAllowed(e, emoji)) {
    return;
  }

  e.preventDefault();
  const sourceEmoji = getEmojiByName(e.dataTransfer.getData("text/plain"));

  emoji.parentElement.classList.add("being-swapped");
  sourceEmoji.parentElement.classList.add("being-swapped");
  swapIcons(emoji, sourceEmoji);

  console.log(
    "dragenter",
    emoji.dataset.name,
    "received",
    e.dataTransfer.getData("text/plain")
  );
}

function onDragover(e, emoji) {
  if (dropIsAllowed(e, emoji)) {
    e.preventDefault();
  }
}

function onDragleave(e, emoji) {
  const sourceEmoji = getEmojiByName(e.dataTransfer.getData("text/plain"));

  emoji.parentElement.classList.remove("being-swapped");
  sourceEmoji.parentElement.classList.remove("being-swapped");

  resetIcon(emoji);
  resetIcon(sourceEmoji);
}

function onDrop(e, emoji) {
  const sourceEmoji = getEmojiByName(e.dataTransfer.getData("text/plain"));
  swapEmojis(emoji, sourceEmoji);
  onDragleave(e, sourceEmoji); // cleanup
  updateSentences();
}

function configureDragAndDrop() {
  document.querySelectorAll(".emoji[draggable='true']").forEach((emoji) => {
    const box = emoji.parentElement;

    emoji.addEventListener("dragstart", onDragstart);
    box.addEventListener("dragenter", (e) => onDragenter(e, emoji));
    box.addEventListener("dragover", (e) => onDragenter(e, emoji));
    box.addEventListener("dragleave", (e) => onDragleave(e, emoji));
    box.addEventListener("drop", (e) => onDrop(e, emoji));
  });
}

setUp();
updateSentences();
configureDragAndDrop();
