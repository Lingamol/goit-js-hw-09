// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import convertMs from './convertMs.js';
let selectedDate;
let timerId;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const date = new Date();
    selectedDate = selectedDates[0];
    // timer = selectedDates[0] - date;
    if (selectedDate - date < 0) {
      Notiflix.Notify.failure('Please choose a date in the future.');
      return;
    } else {
      refs.btnStart.removeAttribute('disabled', true);
      //   console.log(convertMs(timer));
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

refs.btnStart.addEventListener('click', () => {
  //   Notiflix.Notify.success('Sol lucet omnibus');
  timerId = setInterval(dateRender, 1000, timerId);
  refs.btnStart.setAttribute('disabled', true);
  refs.datetime.setAttribute('disabled', true);
  console.log(selectedDate);
});
function dateRender(id) {
  const date = new Date();
  const timer = selectedDate - date;
  if (timer > 0) {
    console.log(convertMs(timer));
    const { days, hours, minutes, seconds } = convertMs(timer);
    //   console.log(seconds);
    refs.days.textContent = days;
    refs.hours.textContent = addLeadingZero(hours.toString());
    refs.minutes.textContent = addLeadingZero(minutes.toString());
    refs.seconds.textContent = addLeadingZero(seconds.toString());
  } else {
    clearInterval(id);
    Notiflix.Notify.success('Timer finish!');
    refs.datetime.removeAttribute('disabled', true);
    return;
  }
}
function addLeadingZero(value) {
  return value.padStart(2, '0');
}
