const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
  name: { type: String, index: { unique: true } },
  reviewId: String,
  reviewer: {
    profilePhotoUrl: String,
    displayName: String,
    isAnonymous: Boolean
  },
  starRating: String,
  comment: String,
  createTime: Date,
  updateTime: Date,
  reviewReply: {
    comment: String,
    updateTime: Date
  }
});

module.exports = mongoose.model('reviews', reviewsSchema);
