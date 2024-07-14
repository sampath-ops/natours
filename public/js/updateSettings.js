import axios from 'axios';
import { showAlert } from './alerts';
// type is either password or data
export const updateSetttings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'https://natours-sampath.vercel.app/api/v1/users/updatePassword'
        : 'https://natours-sampath.vercel.app/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully`);
    }
  } catch (err) {
    // error we defined in our api
    showAlert('error', err.response.data.message);
  }
};
