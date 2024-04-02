window.addEventListener("keydown", (e)=>{
  document.getElementById("key").textContent = e.key;
  document.getElementById("keyCode").textContent = e.keyCode;
  document.getElementById("code").textContent = e.code;
  document.getElementById("container").classList.remove("initial-state");
})