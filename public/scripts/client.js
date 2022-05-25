/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

    console.log('client-js-ready');

    const $newTweetForm = $('#create-new-tweet');
    const $inputElement = $('#tweet-text');
    const $counterElement = $(`[data-counter='charCounter']`);

    $newTweetForm.on('submit', function (event) {
        //? Prevent broswer default.
        event.preventDefault();
        //? Encode a set of form elements as a string for submission.
        const queryStringText = $(this).serialize();
        let inputText = $inputElement.val();
        let textLength = $inputElement.val().trim().length;
        if (textLength === 0 || inputText === null || inputText === '') {
            return alert('Input cannot be empty.');
        }
        if (textLength >=140 ) {
            return alert('Input exceeds limit.');
        }

        $.post("/tweets/", queryStringText)
            .done(function () {
                //todo  -   Fectch tweets again after creating new tweet.
                $inputElement.val('');
                $counterElement.val('140');
                loadTweets();
            })
            .fail(function () {
                //todo  -   If failed, alert user.
                alert("error");
            });
    })

    function loadTweets() {
        $('#tweets-container').html('');
        $.get("/tweets").done(function (data) {
            renderTweets(data);
        });
    }

    function createTweetElement(tweetObj) {
        let day = timeago.format(tweetObj['created_at']);
        const tweetElement = `<article class="tweet-content">
          <header>
            <p id="tweet-content-name-img">
              <img src="${tweetObj['user']['avatars']}"/>
              <span>${tweetObj['user']['name']}</span>
            </p>
            <p id="tweet-content-name">${tweetObj['user']['handle']}</p>
          </header>
          <p class="tweet-text">
            ${tweetObj['content']['text']}
          </p>
          <footer>
            <time id="dates" class="timeago">${day}</time>
            <div id="icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>`

        $('#tweets-container').append(tweetElement);
        return tweetElement;
    }

    function renderTweets(tweetArr) {
        tweetArr.forEach(element => {
            createTweetElement(element)
        });
    }



    //todo  -   Load all tweets everytime.
    loadTweets();

})

