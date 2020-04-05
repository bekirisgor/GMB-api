const express = require('express');

const router = express.Router();
const api = require('../api');

router.get('/list/:accountID', async (req, res) => {
  const loc = await api.listLocations(req.params.accountID);
  console.log(loc.length);

  res.json(loc);
});

module.exports = router;
