import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const start = document.querySelector("[data-start]");
const input = document.querySelector("#datetime-picker");
const timerWrapper = document.querySelector(".timer");
const fields = document.querySelectorAll(".field");
const values = document.querySelectorAll(".value");
const labels = document.querySelectorAll(".label");
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");

let timer;
let selectedDate;

start.disabled = true;

timerWrapper.style.display = "flex";
timerWrapper.style.gap = "1em";
timerWrapper.style.marginTop = "10px";

for (const field of fields) {
    field.style.display = "flex";
    field.style.flexDirection = "column";
    field.style.alignItems = "center";
    field.style.marginLeft = "3px";
}

for (const label of labels) {
    label.style.fontSize = "11px";
    label.style.textTransform = "uppercase";    
    label.style.fontWeight = "700";
}

for (const value of values) {
    value.style.fontSize = "30px";    
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const currentDate = new Date();
      if (currentDate > selectedDates[0]) {
          Notiflix.Notify.failure("Please choose a date in the future");
          return;
      } else {
          start.disabled = false;
          return (selectedDate = selectedDates[0]);
      }          
  },
};

flatpickr(input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function countdown() {
    let seconds;
    let minutes;
    let hours;
    let days;
    const currentDate = new Date();
    let timeDifference = selectedDate - currentDate;
    if (timeDifference <= 0) {
        Notiflix.Notify.success("The countdown is over!")
        clearInterval(timer);
        return;
    }
    seconds = convertMs(timeDifference).seconds;
    minutes = convertMs(timeDifference).minutes;
    hours = convertMs(timeDifference).hours;
    days = convertMs(timeDifference).days;
    timeDisplay(days, minutes, hours, seconds);
}

function addLeadingZero(value) {
    value = value.toString();
    return value.padStart(2, "0");
}

function timeDisplay(days, minutes, hours, seconds) {
    dataDays.innerText = addLeadingZero(days);
    dataHours.innerText = addLeadingZero(hours);
    dataMinutes.innerText = addLeadingZero(minutes);
    dataSeconds.innerText = addLeadingZero(seconds);
}

start.addEventListener("click", () => {
    start.disabled = true;
    countdown();
    timer = setInterval(countdown, 1000)
});