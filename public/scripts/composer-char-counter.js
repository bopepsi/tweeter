$(document).ready(function () {
    const textAreaElement = document.querySelector('.new-tweet textarea');
    const counterOutput = document.querySelector('[data-counter="charCounter"]');
    const $limitWarningElement = $('#limit-warning');
    const $emptyWarningElement = $('#empty-warning');
    const $newTweetSection = $(`[data-sec="new-tweet-sec"]`);

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 100) {
            return $(".scroll-btn").css("display", "block");
        } else if (scroll == 0) {
            return $(".scroll-btn").css("display", "none");
        }
    });

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
        const maxLength = 140;
        let inputLength = event.target.value.length;
        if (inputLength > 0) {
            $emptyWarningElement.slideUp();
        }
        console.log(event.target.value);
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
