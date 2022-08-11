// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import convertMs from './convertMs.js';
let selectedDate;
let intervalId = null;
let isTimerFinish = false;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const date = Date.now();
    selectedDate = selectedDates[0];

    if (selectedDate - date < 0) {
      Notiflix.Notify.failure('Please choose a date in the future.');
      return;
    } else {
      refs.btnStart.removeAttribute('disabled', true);
    }
    console.log(selectedDates[0]);
  },
};

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  datetime: document.querySelector('#datetime-picker'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes'),
  seconds: document.querySelector('span[data-seconds]'),
};

const fp = flatpickr('#datetime-picker', options);

refs.btnStart.setAttribute('disabled', true);

// if (isTimerFinish) {
//   clearInterval(timerId);
// }
refs.btnStart.addEventListener('click', onClickBtnStart);

function onClickBtnStart() {
  refs.btnStart.setAttribute('disabled', true);
  fp._input.setAttribute('disabled', true);
  intervalId = setInterval(dateRender, 1000);
}
function dateRender() {
  if (isTimerFinish) {
    clearInterval(intervalId);
    isTimerFinish = false;
    return;
  } else {
    const date = Date.now();
    const timer = selectedDate - date;
    if (timer > 0) {
      console.log(convertMs(timer));
      const { days, hours, minutes, seconds } = convertMs(timer);

      refs.days.textContent = days;
      refs.hours.textContent = addLeadingZero(hours.toString());
      refs.minutes.textContent = addLeadingZero(minutes.toString());
      refs.seconds.textContent = addLeadingZero(seconds.toString());
    } else {
      isTimerFinish = true;
      Notiflix.Notify.success('Timer finish!');
      refs.datetime.removeAttribute('disabled', true);
      fp._input.removeAttribute('disabled', true);
    }
  }
}
function addLeadingZero(value) {
  return value.padStart(2, '0');
}
