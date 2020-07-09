const express = require('express');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const accountsRouter = require('./lib/Controllers/accountsControl');
const locationRouter = require('./lib/Controllers/locationControls');
const reviewsRouter = require('./lib/Controllers/reviewsControls');
const api = require('./lib/api');

const oauth2Code = require('./lib/oauth2').router;

app.use(cors());
app.use(bodyParser.json()); /*  */
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/accounts', accountsRouter);
app.use('/locations', locationRouter);
app.use('/reviews', reviewsRouter);
app.use('/oauth2callback', oauth2Code);

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
app.listen(process.env.PORT || 5000);

/* mongoose
  .connect('mongodb://localhost:27017/GMB', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log(`Database is connected`))
  .catch(err => console.log(err)); */

const x = async () => {
  console.log('runnign at PORT', process.env.PORT);
  // oauth2.tokenInfo = await oauth2.hergetToken();
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
    {s
      upsert: true
    },
    (err, raw) => {
      if (err) console.log(err);
    }
  );
  */
  /* 
  console.log(JSON.stringify(await api.listRecommendedLocations('accounts/115207451364315737681')));
   console.log(
    await api.findMatches('accounts/115207451364315737681/locations/13569812792942138409'),
  ); */
};

x();
