'use strict';

// Solution for Exercise 6

// FAKE DATA
const myquestion = new Question('Is JavaScript better than Python?', 'Luigi De Russis', '2023-01-01');
myquestion.add(new Answer('Yes', 'Luca Mannella', -10, '2023-02-15'));
myquestion.add(new Answer('Both have their pros and cons', 'Mario R0ssi', 0, '2023-03-04'));

// console.log(myquestion) ;

function createAnswerRow(answer) {
    const tr = document.createElement('tr');
    // tr.innerHTML = `<td>${answer.date}</td><td>${answer.text}</td>` ;

    const tdDate = document.createElement('td');
    tdDate.innerText = answer.date.format('MM/DD/YYYY');
    tr.appendChild(tdDate);

    const tdText = document.createElement('td');
    tdText.innerText = answer.text;
    tr.appendChild(tdText);

    const tdAuthor = document.createElement('td');
    tdAuthor.innerText = answer.author;
    tr.appendChild(tdAuthor);

    const tdScore = document.createElement('td');
    tdScore.innerText = answer.score;
    tr.appendChild(tdScore);

    const tdButton = document.createElement('td');
    const voteButton = document.createElement('button');
    voteButton.innerText = 'VOTE';
    voteButton.classList.add('btn', 'btn-info');
    tdButton.appendChild(voteButton);
    tr.appendChild(tdButton);

    voteButton.addEventListener('click', (event) => {
        // const oldScore = Number(tdScore.innerText) ;
        // const newScore = oldScore+1 ;
        // tdScore.innerText = newScore ;

        const theButton = event.target;
        const scoreCell = theButton.parentNode.parentNode.childNodes[3];
        scoreCell.innerText = Number(scoreCell.innerText) + 1;

    });

    // const tdButton = document.createElement('td') ;
    // tdButton.innerHTML = `Press here: <button class="btn btn-info">VOTE</button>` ;
    // tr.appendChild(tdButton) ;

    return tr;
}

document.addEventListener('DOMContentLoaded', (event) => {

    document.querySelector('p.lead').innerText = myquestion.text;
    document.getElementById('questionauthor').innerText = myquestion.author;

    const table = document.getElementById('answerstable');
    // const tableBody = table.childNodes[1] ;
    const tableBody = table.querySelector('tbody');

    for (const answer of myquestion.answers) {
        const tr = createAnswerRow(answer);
        tableBody.appendChild(tr);
    }

    document.querySelector('#addbutton').addEventListener('click', (event) => {
        // extract content from user inputs
        const date = document.querySelector('input[name="date"]').value;
        const text = document.querySelector('input[name="text"]').value;
        const author = document.querySelector('input[name="author"]').value;

        const tdErr = document.getElementById('error-message');

        if (date && text && author) { // minimum validation: no missing date
            const answer = new Answer(text, author, 0, date);
            const tr = createAnswerRow(answer);
            tableBody.appendChild(tr);

            // hide error message
            tdErr.classList.add('invisible');
            tdErr.innerText = '';
        } else {
            // show error message
            tdErr.classList.remove('invisible');
            tdErr.innerText = "Invalid data";

            // automatically hide error message after 3 seconds
            setTimeout(() => {
                tdErr.classList.add('invisible');
                tdErr.innerText = '';
            }, 3000);
        }
    });

});