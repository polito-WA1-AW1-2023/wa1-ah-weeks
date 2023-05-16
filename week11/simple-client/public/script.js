'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('load-button');
    const result = document.getElementById('result');

    button.addEventListener('click', async (ev) => {
        try {
            const response = await fetch('http://localhost:3000/api/questions');
            if (response.ok) {
                const questions = await response.json();
                // console.log(questions) ;
                result.innerText = questions.map(q => q.text);
            } else {
                // if response is not OK
                const error_text = await response.text();
                result.innerText = "Application Error: " + error_text;
            }
        } catch (error) {
            result.innerText = "Network Error" ;
        }
    });
});