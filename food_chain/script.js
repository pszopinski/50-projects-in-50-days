const emojiList = document.getElementById("emojiList");
const sentenceList = document.getElementById("sentenceList");

function createSentenceElement(sentenceTemplate, name, consumes, other) {
  const li = document.createElement("li");
  li.className = "sentence";
  if (other === consumes) {
    li.classList.add("correct");
  }

  const randomAngle = () => 5 * (Math.random() - 0.5);
  const blank = (text) =>
    `<span class="blank" style="rotate: ${randomAngle()}deg">${text}</span>`;
  li.innerHTML = sentenceTemplate
    .replace(":self:", blank(name))
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
  div.dataset.name = name;
  div.draggable = draggable;

  if (sentenceTemplate && consumes) {
    div.createSentenceElement = createSentenceElement.bind(
      null,
      sentenceTemplate,
      name,
      consumes
    );
  }
  return div;
}

function setUp() {
  const foodChain = [
    { emoji: "☀️", name: "sun", draggable: false },
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

  for (const item of foodChain) {
    const box = document.createElement("li");
    box.className = "box";
    box.appendChild(createEmoji(item));
    emojiList.appendChild(box);
  }
}

function updateSentences() {
  const emojis = Array.from(document.querySelectorAll(".emoji"));
  emojis.reduce((prevEmoji, currEmoji) => {
    console.log(currEmoji, currEmoji.createSentenceElement);
    if (currEmoji.createSentenceElement) {
      const sentence = currEmoji.createSentenceElement(prevEmoji.dataset.name);
      sentenceList.appendChild(sentence);
    }
    return currEmoji;
  });
}

setUp();
updateSentences();
