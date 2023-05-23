import { Answer } from "./qa";

const APIURL = 'http://localhost:3000/api'

async function listQuestions() {
    try {
        const response = await fetch(APIURL + '/questions');
        if (response.ok) {
            const questions = await response.json();
            return questions;
        } else {
            // if response is not OK
            const message = await response.text();
            throw new Error("Application error: " + message);
        }
    } catch (error) {
        throw new Error("Network error: " + error.message)
    }
}

async function listAnswers(questionId) {
    try {
        const response = await fetch(APIURL + `/questions/${questionId}/answers`);
        if (response.ok) {
            const answers = await response.json();
            return answers.map(a => new Answer(a.id, a.text, a.author, a.score, a.date));
        } else {
            // if response is not OK
            const message = await response.text();
            throw new Error("Application error: " + message);
        }
    } catch (error) {
        throw new Error("Network error: " + error.message)
    }
}

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
            throw new Error("Application error: " + message);
        }
    } catch (error) {
        throw new Error("Network error: " + error.message)
    }
}

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
            const message = response.text();
            throw new Error("Application error: " + message);
        }
    } catch (err) {
        throw new Error("Network error: " + err.message);
    }
}

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
            return true;
        } else {
            const message = response.text();
            throw new Error("Application error: " + message);
        }
    } catch (err) {
        throw new Error("Network error: " + err.message);
    }

}

export { listQuestions, listAnswers, deleteAnswer, upVote, addAnswer };