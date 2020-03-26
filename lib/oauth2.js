"use strict";
const keys = require("../json/keys.json");
const { request } = require("gaxios");
const express = require("express");
const app = express();
const url = require("url");
const querystring = require("querystring");
const destroy = require("server-destroy");
const open = require("open");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var tokenInfo = {};
var createAuthURL = function() {
  const opts = {
    client_id: keys.web.client_id,
    response_type: "code",
    redirect_uri: keys.web.redirect_uris[0],
    scope: "https://www.googleapis.com/auth/business.manage",
    access_type: "offline",
    include_granted_scopes: "true",
    prompt: "none",
    login_hint: "bekir@rimoi.com"
  };
  let authUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    querystring.stringify(opts);
  return authUrl;
};

var getCode = async function() {
  var server = app.listen(
    3000,
    open(createAuthURL(), { wait: true }).then(cp => cp.unref())
  );

  return new Promise((resolve, reject) => {
    try {
      app.get("/oauth2callback*", async (req, res) => {
        const qs = new url.URL(req.url, "http://localhost:3000/oauth2callback")
          .searchParams;
        var code = qs.get("code");
        console.log("code :", code);
        res.end("res end");
        resolve(code);
      });
    } catch (e) {
      reject(e);
    }
  });

  server.close();
};

var getToken = async function() {
  const values = {
    code: await getCode(),
    client_id: keys.web.client_id,
    client_secret: keys.web.client_secret,
    redirect_uri: keys.web.redirect_uris[0],
    grant_type: "authorization_code",
    code_verifier: ""
  };
  console.log(querystring.stringify(values));
  const url = "https://oauth2.googleapis.com/token";
  var res = await request({
    method: "POST",
    url,
    data: querystring.stringify(values),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    responseType: "json"
  });

  console.log("got token", res.data);
  var token = res.data;
  if (res.data && res.data.expires_in) {
    token.expiry_date = new Date().getTime() + res.data.expires_in * 1000;
    delete token.expires_in;
  }

  return token;
};
let checkToken = async () => {
  if (
    tokenInfo &&
    tokenInfo.expiry_date >= new Date().getTime() &&
    tokenInfo.expiry_date
  ) {
    console.log("token valid");
    return tokenInfo;
  } else {
    tokenInfo = await getToken();
    return tokenInfo;
  }
};

module.exports = { getToken, tokenInfo, checkToken };
