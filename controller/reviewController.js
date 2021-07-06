const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.checkIfAuthor = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (req.user.role === 'admin') return next();
  if (review.user.id !== req.user.id) {
    return next(
      new AppError('You are not allowed to edit someOnes review', 403)
    );
  }
  next();
});

exports.createReview = factory.createOne(Review);
exports.getAllReview = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
