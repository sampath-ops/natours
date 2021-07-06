const express = require('express');
const viewController = require('./../controller/viewController');
const authController = require('./../controller/authController');
const bookingController = require('./../controller/bookingController');
const router = express.Router();

// middleware to check if user is loggin or not
// router.use(authController.isLoggedIn);

// OVERVIEW ROUTE
router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewController.getOverview
);

// login route
router.get('/login', authController.isLoggedIn, viewController.getLogin);

// TOUR
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);

// ACCOUNT
router.get('/me', authController.protect, viewController.getAccount);

//MY BOOKING
router.get('/my-tours', authController.protect, viewController.getMyTour);

// UPDATE USER DATA
router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
);
module.exports = router;
