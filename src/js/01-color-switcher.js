function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId = null;

const startColorSwitching = () => {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startButton.disabled = true;
  stopButton.disabled = false;
};

const stopColorSwitching = () => {
  clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;
};

// Додавання деактивації кнопки Stop при завантаженні сторінки
stopButton.disabled = true;

startButton.addEventListener('click', startColorSwitching);
stopButton.addEventListener('click', stopColorSwitching);
