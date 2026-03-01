import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector("button[data-start]");
toggleDisabled(startBtn, true);

const inputDateTime = document.querySelector("#datetime-picker");
const timerFields = document.querySelectorAll(".value");


let userSelectedDate = null;
let intervalId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0].getTime();
        if (userSelectedDate > Date.now()) {
            iziToast.destroy();
            toggleDisabled(startBtn, false);
        } else {
            iziToast.show({
                // close: false,
                icon: 'cancel-circle',
                iconColor: '#fff',
                message: 'Please choose a date in the future',
                messageColor: '#fff',
                backgroundColor: '#ef4040',
                position: 'topRight',
                timeout: '6000',
            });
            return toggleDisabled(startBtn, true);  
        }
    },
};


flatpickr(inputDateTime, options);
startBtn.addEventListener("click", startBtnClick);


function toggleDisabled(element, state) {
     return element.disabled = state;
}

function startBtnClick() {
    toggleDisabled(inputDateTime, true);
    toggleDisabled(startBtn, true);
    intervalId = setInterval(() => {
        const currentDate = Date.now();
        const elapsedTime = userSelectedDate - currentDate;
        if (elapsedTime <= 0) {
            toggleDisabled(inputDateTime, false);
            clearInterval(intervalId);
            updateTimer({ days: "00", hours: "00", minutes: "00", seconds: "00" });
            return;
        };
        const countDown = convertMs(elapsedTime);
        updateTimer(countDown);

    }, 1000);
};


function updateTimer(obj){
    const values = Object.values(obj);
    timerFields.forEach((item, index) => item.textContent = values[index]);
}


function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}
