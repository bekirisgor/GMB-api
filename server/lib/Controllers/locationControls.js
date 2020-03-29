const express = require('express');

const Locations = require('../Models/locationsModel');

const router = express.Router();
const api = require('../api');

router.get('/list/:accountID', async (req, res) => {
  const locationlist = await Locations.find({
    name: { $regex: req.params.accountID, $options: 'i' },
  });
  console.log(typeof locationlist);
  console.log(req.params.accountID);

  if (Object.keys(locationlist).length === 0) {
    console.log(req.params.accountID);
    const loc = await api.listLocations(req.params.accountID);
    console.log(loc.length);

    for (let i = 0; i < loc.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await Locations.updateOne(
        { name: { $eq: loc[i].name } },
        loc[i],
        {
          upsert: true,
        },
        err => {
          if (err) console.log(err);
        },
      );
    }
    res.send(loc);
  } else {
    console.log('no api', locationlist);
    res.send(locationlist);
  }
});

module.exports = router;
