import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51J7vboSIWNeZM8WlSts18kDB2JaNNV9siBhtvIeBNeMKCMzmJ2LSMAoOxxh4DEQLuZqr490VdXOT3I6gebrKEEaB00MGpp4pDV'
  );
  try {
    //1. Get checkout session from API
    const session = await axios(
      `https://natours-sampath.vercel.app/api/v1/bookings/checkout-session/${tourId}`
    );
    // console.log(session);
    //2. create checkout form and charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
