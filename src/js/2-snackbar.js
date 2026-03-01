import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const delay = Number(event.target.elements.delay.value);
    const state = event.target.elements.state.value;
    console.log(state);
    

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            state === "fulfilled" ? resolve (delay) : reject (delay);
        }, delay);
    });

    promise
        .then(value => {
            iziToast.show({
                message: `✅ Fulfilled promise in ${value}ms`,
                messageColor: '#fff',
                color: "#59a10d",
                position: 'topRight',
                timeout: '6000',
            });
        })
        .catch(value => {
            iziToast.show({
                message: `❌ Rejected promise in ${value}ms`,
                messageColor: '#fff',
                color: "#ef4040",
                position: 'topRight',
                timeout: '6000',
            });
        });
}
