// const textarea = document.querySelector("textarea");
// const choiceList = document.querySelector(".choice-list");
// const results = document.querySelector(".results");
// const resetBtn = results.querySelector("button");

// textarea.addEventListener("keyup", updateChoices);

// textarea.addEventListener("keydown", (e) => {
//   if (e.key == "Enter") {
//     e.preventDefault();
//     choose();
//   }
// });

// textarea.addEventListener("click", () => {
//   console.log(textarea.readOnly);
//   if (textarea.readOnly) {
//     reset();
//   }
// });

// resetBtn.addEventListener("click", reset);

// // There might already be some content when the page loads
// if (textarea.value) {
//   updateChoices();
// }

// function updateChoices() {
//   choiceList.innerHTML = textarea.value
//     .split(",")
//     .filter((choice) => choice.trim())
//     .map((choice) => `<li class="tag">${choice}</li>`)
//     .join("");
// }

// function choose() {
//   textarea.readOnly = true;

//   const ourChoiceIdx = Math.floor(Math.random() * choiceList.childElementCount);
//   const duration = spinTheWheel(ourChoiceIdx);

//   setTimeout(() => {
//     resetBtn.focus();
//     results.classList.remove("hide");
//   }, duration + 200);
// }

// function spinTheWheel(ourChoiceIdx) {
//   const choices = choiceList.children;

//   // Select every element in a spinning wheel fasion
//   const iterationCount =
//     Math.floor(20 / choices.length) * choices.length + ourChoiceIdx;
//   let delay = 200;
//   let duration = 100;
//   for (let i = 0; i < iterationCount; ++i) {
//     selectChoiceTemporarily(i % choices.length, duration, delay);
//     delay += duration;
//     duration += 10; // spinning wheel slows down
//   }

//   setTimeout(() => {
//     const ourChoice = choices[ourChoiceIdx];
//     ourChoice.classList.add("selected");
//     chosenTag.textContent = ourChoice.textContent;
//     results.classList.remove("hide");
//   }, delay);

//   return delay;
// }

// function selectChoiceTemporarily(idx, duration, delay) {
//   const choice = choiceList.children[idx];
//   setTimeout(() => {
//     choice.classList.add("selected");
//   }, delay);
//   setTimeout(() => choice.classList.remove("selected"), delay + duration);
// }

// function reset() {
//   results.classList.add("hide");
//   updateChoices();
//   textarea.readOnly = false;
//   textarea.select();
// }
