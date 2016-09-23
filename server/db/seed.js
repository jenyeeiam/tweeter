"use strict";
const moment      = require('moment');
var today = moment((new Date()).getTime()).format('MMMM DD YYYY');
console.log(today)


require('dotenv').config();
const db     = require('../lib/db'),
      tweets = require("./tweets");

db.connect((db) => {
  console.log('Clearing all tweets (truncating collection) ...');
  //remove all tweets {}
  db.collection("tweets").remove({}, false, (err, results) => {
    if (err) throw err;

    console.log(`Inserting ${tweets.length} tweets ...`);

    db.collection("tweets").insertMany(tweets, (err, results) => {
      if (err) throw err;

      //changes the date to real dates
      results.ops.forEach(function(tweetObj) {
        var date = tweetObj.created_at;
        db.collection("tweets").update({created_at: date}, {$set: {created_at: moment((new Date(date)).getTime()).format('MMMM DD YYYY')}}, function(){
          console.log("im updating");
        });
        return;
      });

      db.collection("tweets").count({}, (err, results) => {
        if (err) throw err;

        console.log('tweets in collection "tweets": ', results);

        console.log('Disconnecting from mongodb!');
        db.close();
      });

    });
  });
});
