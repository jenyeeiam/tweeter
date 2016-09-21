/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// json data
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];




$(document).ready(function(){

//takes in dataArray
  function renderTweets(tweets) {
    tweets.forEach(function(value, index){
      var htmlTweet = createTweetElement(value);
      $('.all-tweets').append(htmlTweet);
    });
  }



  function createTweetElement(tweetObject){
    var $tweet = $("<article></article>").addClass("tweet");
    //constructs the header
    var $tweetHeader = $("<header></header>");
    var $avatars = $("<img></img>").addClass("avatar").attr("src", tweetObject.user.avatars.small);
    var $name = $("<span></span>").addClass("header");
    var $handle = $("<span></span>").addClass("handle");
    $handle.text(tweetObject.user.handle);
    $name.text(tweetObject.user.name);
    $tweetHeader.append($avatars)
                .append($name)
                .append($handle);
    //constructs the body
    var $tweetP = $("<p></p>").text(tweetObject.content.text)
    //constructs the footer
    var $tweetFooter = $("<footer></footer>");
    var $dateCreated = $("<span></span>").addClass("date");
    $dateCreated.text(tweetObject.created_at);
    var $iconsHeart = $("<img></img>").addClass("icons").attr("src", "/images/heart.png");
    var $iconsRetweet = $("<img></img>").addClass("icons").attr("src", "/images/retweet.png");
    $tweetFooter.append($dateCreated)
                .append($iconsHeart)
                .append($iconsRetweet);
    //construct the full tweet
    $tweet.append($tweetHeader)
          .append($tweetP)
          .append($tweetFooter);
    return $tweet;

  }

  renderTweets(data);

 //hover shows the retweet and like icons
  //$('.icons').hide();
  function showIcons() {
    $('.tweet').on('mouseEnter', function(){
      $(this).
    });
  }

  $('.all-tweets').hover(function(){

    $('.icons').toggle();
  });

});


// document.createElement()