const express = require('express');

const router = express.Router();
const api = require('../api');

router.get('/list/:accountID', async (req, res) => {
  const loc = await api.listLocations(req.params.accountID);
  console.log(loc.length);

  res.json(loc);
});

router.get('/findMatches/:locationID', async (req, res) => {
  console.log('paramssss', req.params);
  const matchedLocations = await api.findMatches(req.params.locationID);
  console.log(matchedLocations);
  res.json(matchedLocations);
});

router.get('/recommendedLocations/:accountID', async (req, res) => {
  const recommendedLocations = await api.listRecommendedLocations(req.params.accountID);
  console.log(recommendedLocations);
  res.json(recommendedLocations);
});

router.post('/createMedia/', async (req, res) => {
  console.log(req.body.locationID);
  const createMedia = await api.createMedia(req.body.locationID, req.body.data);

  res.json(createMedia);
});
module.exports = router;
