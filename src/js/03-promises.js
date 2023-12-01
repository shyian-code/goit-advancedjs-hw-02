import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');

  const delay = parseInt(delayInput.value, 10);
  const step = parseInt(stepInput.value, 10);
  const amount = parseInt(amountInput.value, 10);

  if (isNaN(delay) || isNaN(step) || isNaN(amount)) {
    iziToast.error({
      title: "Error",
      message: "Please enter valid numeric values.",
    });
    return;
  }

  createPromises({ delay, step, amount });
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function createPromises({ delay, step, amount }) {
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay + (i - 1) * step)
      .then(({ position, delay }) => {
        iziToast.success({
          title: "Fulfilled",
          message: `Promise ${position} fulfilled in ${delay}ms`,
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          title: "Rejected",
          message: `Promise ${position} rejected in ${delay}ms`,
        });
      });
  }
}
