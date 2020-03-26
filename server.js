const express = require("express");
const app = express();
const gaxios = require("gaxios");
const token = require("./lib/token");
const oauth2 = require("./lib/oauth2");
const api = require("./lib/api");
const mongoose = require("mongoose");
const accounts = require("./lib/Models/accountsModel");
const accountsRouter = require("./lib/Controllers/accountsControl");
const locationRouter = require("./lib/Controllers/locationControls");
const reviewsRouter = require("./lib/Controllers/reviewsControls");
const jsn = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/accounts", accountsRouter);
app.use("/locations", locationRouter);
app.use("/reviews", reviewsRouter);
app.listen(5000);
mongoose
  .connect("mongodb://localhost:27017/GMB", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  })
  .then(() => console.log(`Database is connected`))
  .catch(err => console.log(err));

const x = async () => {
  // oauth2.tokenInfo = await oauth2.getToken();
  //  var acclist = await api.listAccounts();
  // console.log(acclist);
  /*for (let i = 0; i < jsn.length; i++) {
    accounts.updateOne(
      { name: { $eq: jsn[i].name } },
      jsn[i],
      {
        upsert: true
      },
      (err, raw) => {
        if (err) console.log(err);
      }
    );
  }*/
  /*
  accounts.updateMany(
    { name: { $eq: "accounts/116309423562799564884" } },
    jsn,
    {
      upsert: true
    },
    (err, raw) => {
      if (err) console.log(err);
    }
  );
  */
};
x();
