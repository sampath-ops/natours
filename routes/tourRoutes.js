const express = require('express');
const tourController = require('../controller/tourController');
const authController = require('../controller/authController');
const reviewRouter = require('./reviewRoutes');
//const {getAllTour,createTour,getTour,updateTour} = require('../controller/tourController');

//TOUR ROUTER
const router = express.Router();

// router.param('id', tourController.checkID);

// redirecting the route to reviewRouter or mounting the route to reviewRouter
router.use('/:tourId/reviews', reviewRouter);

// TOP FIVE CHEAP TOURS
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTour, tourController.getAllTour);

// TOUR STATISTICS
router.route('/tour-stats').get(tourController.tourStats);

//  GET TOURS WITHIN RADIUS
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.toursWithin);

// GET DISTANCES FROM A POINT
router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);
// BUSIEST MONTH
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.getMonthlyPlan
  );

router
  .route('/')
  .get(tourController.getAllTour)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

// .post(tourController.checkBody, tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

// POST tours/:tourId/reviews
// GET tours/:tourId/reviews
// [VERSION 1]
// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );

module.exports = router;
