var express = require("express");
var app = express();
var Accounts = require("../Models/accountsModel");
var router = express.Router();
var api = require("../api");
const mongoose = require("mongoose");

router.get("/list", async (req, res) => {
  var accountslist = await Accounts.find({})
    .then(list => res.json(list))
    .catch(err => res.status(404).json(err));
});

router.post("/", async (req, res) => {});

module.exports = router;
