const express = require('express');
const reviewController = require('./../controller/reviewController');
const authController = require('./../controller/authController');
const router = express.Router({ mergeParams: true });

// protect all routes
router.use(authController.protect);
router
  .route('/')
  .get(reviewController.getAllReview)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );
router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.checkIfAuthor,
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.checkIfAuthor,
    reviewController.deleteReview
  );
module.exports = router;
