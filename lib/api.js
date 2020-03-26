"use strict";
const { request } = require("gaxios");
const querystring = require("querystring");
const oauth2 = require("./oauth2");

const express = require("express");
const app = express();

var listAccounts = async function() {
  const tokeninfo = await oauth2.checkToken();

  const url = "https://mybusiness.googleapis.com/v4/accounts";
  let req = await request({
    method: "GET",
    url,
    headers: {
      Authorization: "Bearer " + tokeninfo.access_token
    }
  });

  let accounts = req.data.accounts;
  if (req.data.nextPageToken) {
    do {
      req = await request({
        method: "GET",
        url,
        params: { pageToken: req.data.nextPageToken }
      });
      accounts.push(...req.data.accounts);
    } while (req.data.nextPageToken);
  }

  return accounts;
};

var listRecommendedLocations = async function(name = "") {
  oauth2.checkToken;
  const url =
    "https://mybusiness.googleapis.com/v4/" +
    name +
    ":recommendGoogleLocations";

  let req = await request({
    method: "GET",
    url
  });
  let googleLocations = req.data.googleLocations;
  if (req.data.nextPageToken) {
    do {
      req = await request({
        method: "GET",
        url,
        params: { pageToken: req.data.nextPageToken }
      });
      googleLocations.push(...req.data.googleLocations);
    } while (req.data.nextPageToken);
  }
};

var listLocations = async function(name = "") {
  const tokeninfo = await oauth2.checkToken();

  console.log("x", tokeninfo);
  const url = "https://mybusiness.googleapis.com/v4/" + name + "/locations";
  console.log(url);
  let req = await request({
    url,
    method: "GET",
    headers: {
      Authorization: "Bearer " + tokeninfo.access_token
    }
  });
  let locations = req.data.locations;

  if (req.data.nextPageToken) {
    do {
      req = await request({
        method: "GET",
        url,
        params: { pageToken: req.data.nextPageToken },
        headers: {
          Authorization: "Bearer " + tokeninfo.access_token
        }
      });
      locations.push(...req.data.locations);
    } while (req.data.nextPageToken);
  }
  return locations;
};

var getReviews = async function(location = "") {
  const tokeninfo = await oauth2.checkToken();
  const url = "https://mybusiness.googleapis.com/v4/" + location + "/reviews";

  let req = await request({
    method: "GET",
    url,
    pageSize: "20",
    headers: {
      Authorization: "Bearer " + tokeninfo.access_token
    }
  });
  let locationReviews = req.data.reviews;

  if (req.data.nextPageToken) {
    do {
      req = await request({
        method: "GET",
        url,
        pageSize: "20",
        headers: {
          Authorization: "Bearer " + tokeninfo.access_token
        },
        pageToken: req.data.nextPageToken
      });
      locationReviews.push(...req.data.reviews);
    } while (req.data.nextPageToken);
  }
  console.log("revxx", typeof req.data.reviews[0].reviewId);
  return locationReviews;
};

const sendreviewReply = async (reply = "", reviewID = "") => {
  const tokeninfo = await oauth2.checkToken();
  const url = "https://mybusiness.googleapis.com/v4/" + reviewID + "/reply";
  console.log("reply", reply);
  let req = await request({
    method: "PUT",
    url,
    headers: {
      Authorization: "Bearer " + tokeninfo.access_token,
      "Content-Type": "application/json"
    },
    data: {
      comment: reply
    }
  })
    .then(req => console.log(req))
    .catch(e => console.log(e));
};

var batchGetReviews = async function(name = "") {
  const url =
    "https://mybusiness.googleapis.com/v4/" +
    name +
    "/locations:batchGetReviews";

  let req = await request({
    method: "POST",
    url,
    data: { locationNames: [] }
  });
};

module.exports = {
  listAccounts,
  listLocations,
  listRecommendedLocations,
  batchGetReviews,
  getReviews,
  sendreviewReply
};
