import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const FEEDBACK = 'feedback-form-state';

const formData = localStorage.getItem(FEEDBACK) ? JSON.parse(localStorage.getItem(FEEDBACK)) : {};

Object.keys(formData).forEach(item => (form.elements[item].value = formData[item]));

function saveFormData(event) {
    formData[event.target.name] = event.target.value;

    localStorage.setItem(FEEDBACK, JSON.stringify(formData));
}

function sendFeedback(event) {
    event.preventDefault();
    const formInputNames = Object.keys(event.currentTarget.elements).filter(item => isNaN(item));
    if (!formInputNames.every(item => event.currentTarget.elements[item].value)) {
        alert('Все поля формы должны быть заполнены!');
        return;
    }
    form.reset();
    console.log(JSON.parse(localStorage.getItem(FEEDBACK)));
    localStorage.removeItem(FEEDBACK);
}

form.addEventListener('submit', sendFeedback);
form.addEventListener('input', throttle(saveFormData, 500));