import { Answer } from "./qa";

const APIURL = 'http://localhost:3000/api'

/**
 * Get the full list of questions from the server
 * @returns (A Promise resolving to) an Array of questions.
 */
async function listQuestions() {
    try {
        const response = await fetch(APIURL + '/questions');
        if (response.ok) {
            const questions = await response.json();
            return questions;
        } else {
            // if response is not OK
            const message = await response.text();
            throw new Error(response.statusText +" "+ message);
        }
    } catch (error) {
        throw new Error(error.message, {cause: error})
    }
}

/**
 * Gets all the answers to a given question
 * @param {int} questionId ID of the question for which we need answers
 * @returns The list of answers (`Answer  objects)
 */
async function listAnswers(questionId) {
    try {
        const response = await fetch(APIURL + `/questions/${questionId}/answers`);
        if (response.ok) {
            const answers = await response.json();
            return answers.map(a => new Answer(a.id, a.text, a.author, a.score, a.date));
        } else {
            // if response is not OK
            const message = await response.text();
            throw new Error(response.statusText +" "+ message);
        }
    } catch (error) {
        throw new Error(error.message, {cause: error}) ;
    }
}

/**
 * Delete a given answer
 * @param {int} answerId 
 * @returns true if ok
 */
async function deleteAnswer(answerId) {
    try {
        const response = await fetch(APIURL + `/answers/${answerId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            return true;
        } else {
            // if response is not OK
            const message = await response.text();
            throw new Error(response.statusText +" "+ message);
        }
    } catch (error) {
        throw new Error(error.message, {cause:error})
    }
}

/**
 * Increases the score of the specific answer
 * @param {int} answerId 
 * @returns true if ok
 */
async function upVote(answerId) {
    try {
        const response = await fetch(APIURL + `/answers/${answerId}/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ "vote": "up" })
        });

        if (response.ok) {
            return true;
        } else {
            const message = await response.text();
            throw new Error(response.statusText +" "+ message);
        }
    
    } catch (error) {
        throw new Error(error.message, {cause:error});
    }

}

/**
 * Add a new answer to an existing question. The score is set to 0 and the ID will be auto-generated.
 * @param {string} date 
 * @param {string} text 
 * @param {string} author 
 * @param {int} idQuestion 
 * @returns {int} the ID of the new question
 */
async function addAnswer(date, text, author, idQuestion) {
    try {
        const response = await fetch(APIURL + `/questions/${idQuestion}/answers`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "text": text,
                "author": author,
                "date": date
            })
        });
        if (response.ok) {
            const id = Number(await response.text());
            return id;
        } else {
            const message = await response.text();
            throw new Error(response.statusText +" "+ message);
        }
    } catch (error) {
        throw new Error(error.message, {cause:error});
    }
}


async function updateAnswer(date, text, author, idAnswer) {
    try {
        const response = await fetch(APIURL + `/answers/${idAnswer}`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "text": text,
                "author": author,
                "date": date
            })
        });
        if (response.ok) {
            return true;
        } else {
            const message = response.text();
            throw new Error(response.statusText +" "+ message);
        }
    } catch (error) {
        throw new Error(error.message, {cause:error});
    }
}


export { listQuestions, listAnswers, deleteAnswer, upVote, addAnswer, updateAnswer };