function addEventListener() {
  window.addEventListener("keydown", (e) => {
    document.getElementById("key").textContent = e.key;
    document.getElementById("keyCode").textContent = e.keyCode;
    document.getElementById("code").textContent = e.code;
    document.getElementById("container").classList.remove("initial-state");
  });
}

function clientIsSupported() {
  return window.matchMedia("(hover: hover) and (pointer:fine)").matches;
}

function main() {
  if (!clientIsSupported()) {
    alert("Client not supported");
    return;
  }

  addEventListener();
}

main();
