var express = require("express");
var app = express();
var Locations = require("../Models/locationsModel");

var router = express.Router();
var api = require("../api");

const mongoose = require("mongoose");
const querystring = require("querystring");

router.get("/list/:accountID", async (req, res) => {
  var locationlist = await Locations.find({
    name: { $regex: req.params.accountID, $options: "i" }
  });
  console.log(typeof locationlist);
  console.log(req.params.accountID);

  if (Object.keys(locationlist).length === 0) {
    console.log(req.params.accountID);
    var loc = await api.listLocations(req.params.accountID);
    console.log(loc.length);

    for (let i = 0; i < loc.length; i++) {
      await Locations.updateOne(
        { name: { $eq: loc[i].name } },
        loc[i],
        {
          upsert: true
        },
        (err, raw) => {
          if (err) console.log(err);
        }
      );
    }
    res.send(loc);
  } else {
    console.log("no api", locationlist);
    res.send(locationlist);
  }
});

module.exports = router;
