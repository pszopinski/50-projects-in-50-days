for (const counter of document.querySelectorAll(".counter")) {
  counter.iteration = 0;
  update(counter);
}

function update(counter) {
  const targetValue = Number(counter.dataset.targetValue);
  const iterationCount = 50;

  if (counter.iteration < iterationCount) {
    const increment = targetValue / iterationCount;
    counter.textContent = Math.round(increment * counter.iteration);
    ++counter.iteration;
    setTimeout(() => update(counter), 20);
  } else {
    counter.textContent = targetValue;
  }
}
