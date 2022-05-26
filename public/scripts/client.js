/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

    //? Prevent XSS attack.
    const escape = function (str) {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };

    const $newTweetForm = $('#create-new-tweet');
    const $inputElement = $('#tweet-text');
    const $counterElement = $(`[data-counter='charCounter']`);
    const $limitWarningElement = $('#limit-warning');
    const $emptyWarningElement = $('#empty-warning');
    const $createTweetIcon = $(`[data-func="create-tweet"]`);
    const $newTweetSection = $(`[data-sec="new-tweet-sec"]`)

    $createTweetIcon.click(function () {
        if ($newTweetSection.css('display') == 'block') {
            //? JQuery slideUp effect to hide the element, if its display => block.
            $newTweetSection.slideUp();
            return;
        }
        else if (!($newTweetSection.css('display') == 'block')) {
            //? JQuery slideUp effect to hide the element, if its display => none.
            $newTweetSection.slideDown();
            //? Also select the input element for better UX.
            $inputElement.select();
            return;
        }
    })

    $newTweetForm.on('submit', function (event) {
        //? Prevent broswer default.
        event.preventDefault();
        //? Encode a set of form elements as a string for submission.
        const queryStringText = $(this).serialize();
        let inputText = $inputElement.val();
        let textLength = $inputElement.val().trim().length;
        //? Check input text length to show proper error msg.
        if (textLength === 0 || inputText === null || inputText === '') {
            return $emptyWarningElement.slideDown();
        }
        if (textLength > 140) {
            return $limitWarningElement.slideDown();
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
              <img src="${(tweetObj['user']['avatars'])}"/>
              <span>${(tweetObj['user']['name'])}</span>
            </p>
            <p id="tweet-content-name">${(tweetObj['user']['handle'])}</p>
          </header>
          <p class="tweet-text">
             ${escape(tweetObj['content']['text'])}
          </p>
          <footer>
            <time id="dates" class="timeago">${(day)}</time>
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

