/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function(){

  $('#compose').on('click', function(){
    $('.new-tweet').slideToggle();
    $('textarea').focus();
  });


  $('form').on('submit', function(event){
    event.preventDefault();
    //check for bad tweets
    if ($('textarea').val().length === 0) {
      alert("Fill in tweet box");
    } else if ($('textarea').val().length > 140) {
      alert("Tweet too long");
    } else {
      ajaxPost();
    }

    // var successHandler = function(data){
    //   var html = createTweetElement(data.tweetObj);
    //   console.log("making html");
    //   $('.all-tweets').prepend(html);
    // };
    //make post request
    function ajaxPost(){
      $.ajax({
        type: "POST",
        url: '/',
        data: $('form').serialize(),
        dataType: 'json',
        success: function(data){
          var html = createTweetElement(data.tweetObj);
          console.log("making html");
          $('.all-tweets').prepend(html);
        }
      });
    }

  });


  function loadTweets(){
    $.ajax({
        url: '/tweets',
        method: 'GET',
        success: function (tweets) {
          console.log("Successfully loaded tweetDB");
          renderTweets(tweets);
        }
    });
  }
  //loadTweets()


//takes in dataArray
  function renderTweets(tweets) {
    tweets.forEach(function(value){
      var htmlTweet = createTweetElement(value);
      $('.all-tweets').append(htmlTweet);
    });
  }

//construct html
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



});


