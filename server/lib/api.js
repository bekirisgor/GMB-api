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
  oauth2.checkToken();
  const url = `https://mybusiness.googleapis.com/v4/${name}:recommendGoogleLocations`;

  let req = await request({
    method: 'GET',
    url,
  });
  const { googleLocations } = req.data;
  if (req.data.nextPageToken) {
    do {
      req = await request({
        method: 'GET',
        url,
        params: { pageToken: req.data.nextPageToken },
      });
      googleLocations.push(...req.data.googleLocations);
    } while (req.data.nextPageToken);
  }
};

const listLocations = async (name = '') => {
  const tokeninfo = await oauth2.checkToken();

  console.log('x', tokeninfo);
  const url = `https://mybusiness.googleapis.com/v4/${name}/locations`;
  console.log(url);
  let req = await request({
    url,
    method: 'GET',
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
    pageSize: '20',
    headers: {
      Authorization: `Bearer ${tokeninfo.access_token}`,
    },
  });
  console.log(req);
  const locationReviews = req.data.reviews;

  if (req.data.nextPageToken) {
    do {
      req = await request({
        method: 'GET',
        url,
        pageSize: '20',
        headers: {
          Authorization: `Bearer ${tokeninfo.access_token}`,
        },
        pageToken: req.data.nextPageToken,
      });
      locationReviews.push(...req.data.reviews);
    } while (req.data.nextPageToken);
  }
  console.log('revxx', typeof req.data.reviews[0].reviewId);
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

module.exports = {
  listAccounts,
  listLocations,
  listRecommendedLocations,
  batchGetReviews,
  getReviews,
  sendreviewReply,
};
