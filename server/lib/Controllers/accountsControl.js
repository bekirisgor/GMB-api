const express = require('express');
const api = require('../api');
const Accounts = require('../Models/accountsModel');

const router = express.Router();

router.get('/list', async (req, res) => {
  await api
    .listAccounts()
    .then(list => {
      res.json(list);
    })
    .catch(err => res.status(404).json(err));
});

//router.post('/', async (req, res) => console.log(req, res));

module.exports = router;
