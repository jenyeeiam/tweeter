//sudo mongod --config /etc/mongod.conf
"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const express     = require("express");
const bodyParser  = require("body-parser");
const app         = express();

const tweetsApi  = require('./api/tweets');
const db         = require('./lib/db');
const collectionName = "tweets";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

db.connect((dbInstance) => {
  app.post("/", (req, res) => {
    db.collection(collectionName).insert({"content":{"text": req.body.text}}, function(err){
      if (err) {
        return res.render(err);
      }
      res.redirect("/tweets/")
    });
  });

});


db.connect((dbInstance) => {
  app.use('/tweets', tweetsApi(dbInstance));
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
