import Notiflix from 'notiflix';

const form = document.querySelector(".form");

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

function submitHandler(event) {
  event.preventDefault();
  let delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay);
    delay = delay + step;
  }
}

form.addEventListener("submit", submitHandler);