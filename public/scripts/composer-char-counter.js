$(document).ready(function () {
    // --- our code goes here ---
    console.log('Ready');
    const textAreaElement = document.querySelector('.new-tweet textarea');
    const counterOutput = document.querySelector('[data-counter="charCounter"]');
    console.log(counterOutput.dataset.counter);
    console.log(textAreaElement.nodeName);

    textAreaElement.addEventListener('input', (event) => {
        const maxLength = 140;
        let inputLength = event.target.value.length;
        console.log(event.target.value);
        let limit = maxLength - inputLength;
        counterOutput.textContent = limit;
        if (limit < 0) {
            counterOutput.classList.add('warning')
        }else{
            counterOutput.classList.remove('warning')
        }
    })

});
