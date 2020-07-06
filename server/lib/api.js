/* eslint-disable no-await-in-loop */
const { request } = require('gaxios');
const oauth2 = require('./oauth2');

const listAccounts = async () => {
  const tokeninfo = await oauth2.checkToken();

  const url = 'https://mybusiness.googleapis.com/v4/accounts';
  let req = await request({
    method: 'GET',
    url,
    headers: {
      Authorization: `Bearer ${tokeninfo.access_token}`,
    },
  });

  const { accounts } = req.data;
  if (req.data.nextPageToken) {
    do {
      req = await request({
        method: 'GET',
        url,
        params: { pageToken: req.data.nextPageToken },
      });
      accounts.push(...req.data.accounts);
    } while (req.data.nextPageToken);
  }

  return accounts;
};

const listRecommendedLocations = async (name = '') => {
  const tokeninfo = await oauth2.checkToken();
  const url = `https://mybusiness.googleapis.com/v4/${name}:recommendGoogleLocations`;

  let req = await request({
    method: 'GET',
    url,
    headers: {
      Authorization: `Bearer ${tokeninfo.access_token}`,
    },
  });
  const { googleLocations } = req.data;
  if (req.data.nextPageToken) {
    do {
      req = await request({
        method: 'GET',
        url,
        params: {
          pageToken: req.data.nextPageToken,
        },
        headers: {
          Authorization: `Bearer ${tokeninfo.access_token} `,
        },
      });
      googleLocations.push(...req.data.googleLocations);
    } while (req.data.nextPageToken);
  }
  return googleLocations;
};

//add langcode later
const findMatches = async (location = '') => {
  const tokeninfo = await oauth2.checkToken();
  const url = `https://mybusiness.googleapis.com/v4/${location}:findMatches`;
  let req = await request({
    url,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokeninfo.access_token}`,
      'Content-Type': 'application/json',
    },
    data: {
      languageCode: 'tr',
    },
  });
  const { matchedLocations } = req.data;
  return matchedLocations;
};

const listLocations = async (name = '') => {
  const tokeninfo = await oauth2.checkToken();

  const url = `https://mybusiness.googleapis.com/v4/${name}/locations`;
  console.log(url);
  let req = await request({
    url,
    method: 'GET',
    params: { filter: 'openInfo.status="OPEN"' },
    headers: {
      Authorization: `Bearer ${tokeninfo.access_token}`,
    },
  });
  const { locations } = req.data;

  if (req.data.nextPageToken) {
    do {
      req = await request({
        method: 'GET',
        url,
        params: { pageToken: req.data.nextPageToken },
        headers: {
          Authorization: `Bearer ${tokeninfo.access_token}`,
        },
      });
      locations.push(...req.data.locations);
    } while (req.data.nextPageToken);
  }
  return locations;
};

const getReviews = async (location = '') => {
  const tokeninfo = await oauth2.checkToken();
  const url = `https://mybusiness.googleapis.com/v4/${location}/reviews`;

  let req = await request({
    method: 'GET',
    url,
    pageSize: '200',
    headers: {
      Authorization: `Bearer ${tokeninfo.access_token}`,
    },
  });
  console.log('reviews response__', req.data.nextPageToken);
  const locationReviews = req.data.reviews;

  if (req.data.nextPageToken) {
    do {
      req = await request({
        method: 'GET',
        url,
        pageSize: '200',
        params: { pageToken: req.data.nextPageToken },
        headers: {
          Authorization: `Bearer ${tokeninfo.access_token}`,
        },
      });
      locationReviews.push(...req.data.reviews);
      console.log('asd', req);
    } while (req.data.nextPageToken);
  }

  return locationReviews;
};

const sendreviewReply = async (reply = '', reviewID = '') => {
  const tokeninfo = await oauth2.checkToken();
  const url = `https://mybusiness.googleapis.com/v4/${reviewID}/reply`;
  console.log('reply', reply);
  await request({
    method: 'PUT',
    url,
    headers: {
      Authorization: `Bearer ${tokeninfo.access_token}`,
      'Content-Type': 'application/json',
    },
    data: {
      comment: reply,
    },
  })
    .then(req => console.log(req))
    .catch(e => console.log(e));
};

const batchGetReviews = async (name = '') => {
  console.log(name);
};

const createMedia = async (locationID = '', mediaItem) => {
  //const locationID = 'accounts/106389940524012865728/locations/14907020014453369633';
  const tokeninfo = await oauth2.checkToken();
  const url = `https://mybusiness.googleapis.com/v4/${locationID}/media`;

  const req = request({
    url,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokeninfo.access_token}`,
      'Content-Type': 'application/json',
    },
    data: { ...mediaItem },
  });

  return req.data;
};

module.exports = {
  listAccounts,
  listLocations,
  listRecommendedLocations,
  batchGetReviews,
  getReviews,
  sendreviewReply,
  findMatches,
  createMedia,
};
