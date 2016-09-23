$(document).ready(function(){
  const TWEET_MAX_LENGTH = 140;
  $('textarea').on('keyup', function(){
    var characters = $(this).val().length;
    var liveCount = TWEET_MAX_LENGTH - characters;
    var counterElem = $(this).siblings('.counter');
    counterElem.text(liveCount);
    //change the text color if you max out tweet length
    if (liveCount < 0) {
      counterElem.css('color', 'red');
    } else {
      counterElem.css('color', '#244751');
    }
  });

});