import '@babel/polyfill';
import { signup } from "./signup";
import { login, logout } from './login.js';
import { displayMap } from './mapbox.js';
import { updateSetttings } from './updateSettings';
import { bookTour } from './stripe';
// DOM elements
const mapBox = document.getElementById('map');
const signupForm = document.querySelector(".form--signup");
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-settings');
const bookBtn = document.getElementById('book-tour');

// DELEGATION
if (loginForm) {
  document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    signup(name, email, password, passwordConfirm);
  });
}

if (mapBox) {
  const locations = JSON.parse(document.getElementById('map').dataset.location);
  displayMap(locations);
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);
    updateSetttings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.save--password').innerHTML = 'upating...';

    const password = document.getElementById('password-current').value;
    const newPassword = document.getElementById('password').value;
    const confirmPassword = document.getElementById('password-confirm').value;
    await updateSetttings(
      { password, newPassword, confirmPassword },
      'password'
    );
    // reset value to empty
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
    document.querySelector('.save--password ').innerHTML = 'save password';
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.innerHTML = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}

const alertMessage = document.querySelector("body").dataset.alert;
if (alertMessage) showAlert("success", alertMessage, 20);