const toastContainer = document.getElementById("toastContainer");
const addToastBtn = document.getElementById("addToastBtn");
const addStickyToastBtn = document.getElementById("addStickyToastBtn");

class Toast {
  #parentElement = toastContainer;
  #text;
  #isSticky;
  #element;

  constructor({ text, sticky = false }) {
    this.#text = `${++Toast.number}. ${text}`;
    this.#isSticky = sticky;
    this.#element = this._createElement();
  }

  _createElement() {
    const toast = document.createElement("div");

    toast.className = "box";
    toast.textContent = this.#text;

    if (this.#isSticky) {
      toast.classList.add("sticky");
      toast.addEventListener("click", () => this._destroy());
    }

    return toast;
  }

  _destroy() {
    this.#element.remove();
  }

  show() {
    this.#parentElement.appendChild(this.#element);

    if (!this.#isSticky) {
      setInterval(() => this._destroy(), 2000);
    }
  }
}

Toast.number = 0;

addToastBtn.addEventListener("click", () => {
  const toast = new Toast({ text: "I'm a toast." });
  toast.show();
});

addStickyToastBtn.addEventListener("click", () => {
  const toast = new Toast({ sticky: true, text: "I am sticky!" });
  toast.show();
});
