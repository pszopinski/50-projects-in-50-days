class RipplePosition {
  constructor() {
    window.CSS.registerProperty({
      name: "--x",
      syntax: "<length-percentage>",
      inherits: true,
      initialValue: "50%",
    });

    window.CSS.registerProperty({
      name: "--y",
      syntax: "<length-percentage>",
      inherits: true,
      initialValue: "50%",
    });
  }

  get x() {
    return document.documentElement.style.getPropertyValue("--x");
  }

  get y() {
    return document.documentElement.style.getPropertyValue("--y");
  }

  set x(value) {
    return document.documentElement.style.setProperty("--x", value);
  }

  set y(value) {
    return document.documentElement.style.setProperty("--y", value);
  }
}

const btn = document.getElementById("btn");
btn.showRipple = function (clickEvent) {
  if (this.classList.contains("clicked")) {
    return;
  }

  const boundingRect = this.getBoundingClientRect();
  this.ripplePosition.x = clickEvent.x
    ? `${clickEvent.x - boundingRect.x}px`
    : "50%";
  this.ripplePosition.y = clickEvent.y
    ? `${clickEvent.y - boundingRect.y}px`
    : "50%";

  this.classList.add("clicked");
  setTimeout(() => {
    this.classList.remove("clicked");
  }, 1000);
};

btn.ripplePosition = new RipplePosition();
btn.addEventListener("click", btn.showRipple);
