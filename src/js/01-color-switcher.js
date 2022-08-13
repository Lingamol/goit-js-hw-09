function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};
refs.btnStop.setAttribute('disabled', true);
let timerId = null;
refs.btnStart.addEventListener('click', handleOnStartBtn);
refs.btnStop.addEventListener('click', handleOnStop);
function handleOnStartBtn() {
  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
  refs.btnStart.setAttribute('disabled', true);
  refs.btnStop.removeAttribute('disabled', true);
}
function handleOnStop() {
  refs.btnStart.removeAttribute('disabled', true);
  refs.btnStop.setAttribute('disabled', true);
  clearInterval(timerId);
}
