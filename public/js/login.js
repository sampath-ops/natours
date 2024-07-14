import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'https://natours-sampath.vercel.app/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in Successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    // error we defined in our api
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'https://natours-sampath.vercel.app/api/v1/users/logout',
    });

    if (res.data.status === 'success') {
      location.assign('/');
      // location.reload(true);
    }
  } catch (err) {
    showAlert('error', 'Error logging out! try again');
  }
};
