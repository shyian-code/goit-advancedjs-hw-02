import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      // Показати повідомлення про помилку
      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
      });
    } else {
      // Активувати кнопку "Start"
      startButton.removeAttribute("disabled");
    }
  },
};


flatpickr(datetimePicker, options);


startButton.addEventListener("click", startCountdown);

function startCountdown() {
  const selectedDate = datetimePicker._flatpickr.selectedDates[0];

  if (!selectedDate || selectedDate <= new Date()) {
    // Показати повідомлення про помилку
    iziToast.error({
      title: "Error",
      message: "Please choose a date in the future",
    });
    // Деактивувати кнопку "Start"
    startButton.setAttribute("disabled", true);
    // Деактивувати інпут
    datetimePicker.setAttribute("disabled", true);
    return;
  }

  // Деактивувати інпут та кнопку "Start" після вибору дати та натискання на кнопку "Start"
  datetimePicker.setAttribute("disabled", true);
  startButton.setAttribute("disabled", true);

  const timeRemaining = selectedDate - new Date();

  countdown(timeRemaining);
}


function countdown(ms) {
  const timerFields = {
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
  };

  function updateTimer() {
    const { days, hours, minutes, seconds } = convertMs(ms);

    timerFields.days.textContent = addLeadingZero(days);
    timerFields.hours.textContent = addLeadingZero(hours);
    timerFields.minutes.textContent = addLeadingZero(minutes);
    timerFields.seconds.textContent = addLeadingZero(seconds);

    if (ms <= -1000) {
      clearInterval(interval);
      // Робимо кнопку та інпут знову активними
      startButton.removeAttribute("disabled");
      datetimePicker.removeAttribute("disabled");
    } else {
      ms -= 1000;
    }
  }

  const interval = setInterval(updateTimer, 1000);
}

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

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}
