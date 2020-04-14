const express = require('express');

const Reviews = require('../Models/reviewsModel');
const api = require('../api');

const router = express.Router();

router.get('/list/:locationID', async (req, res) => {
  const reviews = await api.getReviews(req.params.locationID);

  for (let i = 0; i < reviews.length; i++) {
    await Reviews.updateOne(
      { name: { $eq: reviews[i].name } },
      reviews[i],
      { upsert: true },
      err => {
        if (err) console.log(err);
      },
    );
  }
  res.json(reviews);
});

router.post('/reply', async (req, res) => {
  console.log(req.body, res);
  const reply = await api.sendreviewReply(req.body.review, req.body.reviewID);
  console.log(reply);
});

module.exports = router;
