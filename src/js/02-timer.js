// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import { updateTimerFace, convertMs } from './functions';
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (Date.now() > selectedDate) {
      Notiflix.Notify.failure('Please choose a date in the future.', {
        position: 'center-center',
      });
      return;
    } else {
      refs.btnStart.removeAttribute('disabled', true);
    }
    // console.log(selectedDates[0]);
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

refs.btnStart.addEventListener('click', onClickBtnStart);

function onClickBtnStart() {
  const date = Date.now();
  if (Date.now() > selectedDate) {
    Notiflix.Notify.failure('Please choose a date in the future.');
    refs.btnStart.setAttribute('disabled', true);
    return;
  } else {
    refs.btnStart.setAttribute('disabled', true);
    fp._input.setAttribute('disabled', true);
    timer.start();
  }
}

const timer = {
  intervalId: null,
  isActive: false,

  start() {
    if (this.isActive) {
      return;
    }
    const finalTime = selectedDate;
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = finalTime - currentTime;
      if (deltaTime > 0) {
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        updateTimerFace({ days, hours, minutes, seconds }, refs);
      } else {
        Notiflix.Notify.success('Timer finish!');
        this.stop();
        refs.datetime.removeAttribute('disabled', true);
        fp._input.removeAttribute('disabled', true);
      }
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  },
};
