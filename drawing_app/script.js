class DrawingArea {
  #ctx = undefined;
  #position = [0, 0];
  #penIsDown = false;
  #penSize;
  #penColor;

  constructor(canvasContext) {
    this.#ctx = canvasContext;
    this.#ctx.lineCap = "round";
    this.penSize = 20;
    this.penColor = "black";
  }

  set penSize(newSize) {
    const maxPenSize = 40;
    const minPenSize = 5;

    newSize =
      Math.round(newSize / this.penSizeIncrement) * this.penSizeIncrement;
    newSize = Math.min(newSize, maxPenSize);
    newSize = Math.max(newSize, minPenSize);

    this.#ctx.lineWidth = newSize;
    this.#penSize = newSize;
  }

  get penSize() {
    return this.#penSize;
  }

  get penSizeIncrement() {
    return 5;
  }

  set penColor(newColor) {
    this.#ctx.strokeStyle = newColor;
    this.#penColor = newColor;
  }

  get penColor() {
    return this.#penColor;
  }

  startDrawing() {
    this.#penIsDown = true;
    this.moveTo(...this.#position); // Ensure something is drawn
  }

  stopDrawing() {
    this.#penIsDown = false;
  }

  clear() {
    this.#ctx.clearRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height);
  }

  moveTo(x, y) {
    if (this.#penIsDown) {
      this.#drawLine(x, y);
    }
    this.#position = [x, y];
  }

  #drawLine(x, y) {
    this.#ctx.beginPath();
    this.#ctx.moveTo(...this.#position);
    this.#ctx.lineTo(x, y);
    this.#ctx.stroke();
  }
}

function setUpDrawingOnCanvas(drawingArea, canvas, penUp, penDown) {
  const isMainButton = (button) => button === 0;

  canvas.addEventListener("mousedown", (e) => {
    if (!isMainButton(e.button)) {
      return;
    }
    drawingArea.startDrawing();
    penUp.classList.add("hidden");
    penDown.classList.remove("hidden");
  });

  canvas.addEventListener("mouseup", (e) => {
    if (!isMainButton(e.button)) {
      return;
    }
    drawingArea.stopDrawing();
    penUp.classList.remove("hidden");
    penDown.classList.add("hidden");
  });

  canvas.addEventListener("mousemove", (e) => {
    const boundingRect = canvas.getBoundingClientRect();
    drawingArea.moveTo(e.clientX - boundingRect.x, e.clientY - boundingRect.y);
  });
}

function setUpSizeControls(
  drawingArea,
  size,
  decreaseSizeBtn,
  increaseSizeBtn
) {
  decreaseSizeBtn.addEventListener("click", () => {
    drawingArea.penSize -= drawingArea.penSizeIncrement;
    size.textContent = drawingArea.penSize;
  });

  increaseSizeBtn.addEventListener("click", () => {
    drawingArea.penSize += drawingArea.penSizeIncrement;
    size.textContent = drawingArea.penSize;
  });

  drawingArea.penSize = size.textContent; // Respect initial size
}

function setUpColorControls(drawingArea, color) {
  color.addEventListener("change", () => (drawingArea.penColor = color.value));
  drawingArea.penColor = color.value; // Resepect initial color
}

function setUpInteractivity(
  drawingArea,
  {
    canvas,
    color,
    penUp,
    penDown,
    size,
    decreaseSizeBtn,
    increaseSizeBtn,
    clearBtn,
  }
) {
  setUpDrawingOnCanvas(drawingArea, canvas, penUp, penDown);
  setUpSizeControls(drawingArea, size, decreaseSizeBtn, increaseSizeBtn);
  setUpColorControls(drawingArea, color);
  clearBtn.addEventListener("click", () => drawingArea.clear());
}

function setUp() {
  const canvas = document.getElementById("canvas");
  const color = document.getElementById("color");
  const size = document.getElementById("size");
  const decreaseSizeBtn = document.getElementById("decreaseSizeBtn");
  const increaseSizeBtn = document.getElementById("increaseSizeBtn");
  const clearBtn = document.getElementById("clearBtn");

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const drawingArea = new DrawingArea(ctx);

    setUpInteractivity(drawingArea, {
      canvas,
      color,
      penUp,
      penDown,
      size,
      decreaseSizeBtn,
      increaseSizeBtn,
      clearBtn,
    });
  }
}

function clientIsSupported() {
  return window.matchMedia("(hover: hover) and (pointer:fine)").matches;
}

function main() {
  if (!clientIsSupported()) {
    alert("Client not supported");
    return;
  }

  setUp();
}

main();
