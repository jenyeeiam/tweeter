//sudo mongod --config /etc/mongod.conf
//npm start local
"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const express     = require("express");
const bodyParser  = require("body-parser");
const moment      = require('moment');

const app         = express();

const tweetsApi  = require('./api/tweets');
const db         = require('./lib/db');
const collectionName = "tweets";


//console.log(date);

var userInfo = {
  "name": "Billy Goat",
  "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
  "handle": "@GOAT"
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

db.connect((dbInstance) => {

  app.use('/tweets', tweetsApi(dbInstance));

  app.post("/", (req, res) => {
    console.log("Tweet length: ", req.body.text.length);
    var date = moment((new Date()).getTime()).format('MMMM DD YYYY');
    dbInstance.collection(collectionName).insert({"content":req.body, "created_at": date, "user": userInfo }, function(err, tweetInfo){
      if (err) {
        return res.render(err);
      }

      res.json({
        tweetBody: req.body.text,
        tweetObj: tweetInfo.ops[0]
      });
    });
  });


});



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
