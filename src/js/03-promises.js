import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

function createPromise(position, timeDelay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, timeDelay });
      } else {
        reject({ position, timeDelay });
      }
      // console.log(position, timeDelay);
    }, timeDelay);
  })
    .then(({ position, timeDelay }) => {
      Notiflix.Notify.success(
        `✅ Fulfilled promise ${position} in ${timeDelay}ms`
      );
    })
    .catch(({ position, timeDelay }) => {
      Notiflix.Notify.failure(
        `❌ Rejected promise ${position} in ${timeDelay}ms`
      );
    });
}

const refs = {
  form: document.querySelector('form.form'),
  // delay: document.querySelector('input.delay'),
  // step: document.querySelector('input.step'),
  // amount: document.querySelector('input.amount'),
};
refs.form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  for (let i = 1; i <= amount.value; i += 1) {
    const promiseDelay = Number(delay.value) + Number(step.value) * i;
    createPromise(i, promiseDelay);
  }
}
