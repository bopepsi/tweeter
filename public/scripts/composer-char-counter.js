$(document).ready(function () {
    const textAreaElement = document.querySelector('.new-tweet textarea');
    const counterOutput = document.querySelector('[data-counter="charCounter"]');
    const $limitWarningElement = $('#limit-warning');
    const $emptyWarningElement = $('#empty-warning');
    const $newTweetSection = $(`[data-sec="new-tweet-sec"]`);

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 100) {
            //? If scroll posotion is greater than 100px starting from top, show the back-to-top btn.
            return $(".scroll-btn").css("display", "block");
        } else if (scroll == 0) {
            //? If scroll position is at 0 offset from window top, do not show the back-to-top btn.
            return $(".scroll-btn").css("display", "none");
        }
    });

    //todo Click the back-to-top btn, scroll to top then open the new-tweet-section for better UX.
    $(".scroll-btn").click(function () {
        $(window).scrollTop(0, 0);
        if (!($newTweetSection.css('display') == 'block')) {
            $('#new-tweet').click();
        }else{
            $('#tweet-text').select();
        }
        return;
    })

    textAreaElement.addEventListener('input', (event) => {
        //? If input length greater than 140, turn the counter text color to red by add a warning class to counter element.
        const maxLength = 140;
        let inputLength = event.target.value.length;
        if (inputLength > 0) {
            $emptyWarningElement.slideUp();
        }
        let limit = maxLength - inputLength;
        counterOutput.textContent = limit;
        if (limit < 0) {
            counterOutput.classList.add('warning')
        } else {
            $limitWarningElement.slideUp();
            counterOutput.classList.remove('warning')
        }
    })

});
