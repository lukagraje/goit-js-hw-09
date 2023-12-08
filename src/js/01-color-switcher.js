const start = document.querySelector("button[data-start]");
const stop = document.querySelector("button[data-stop]");
const body = document.querySelector("body");
let timerId = null;
stop.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startColorParty() {
    body.style.backgroundColor = getRandomHexColor();
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor()
    }, 1000);
    start.disabled = true;
    stop.disabled = false;
    }

function stopColorParty() {
    clearInterval(timerId);
    start.disabled = false;
    stop.disabled = true;
}

start.addEventListener("click", startColorParty);
stop.addEventListener("click", stopColorParty);

