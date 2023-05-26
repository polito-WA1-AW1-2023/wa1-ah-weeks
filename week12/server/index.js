'use strict';

const PORT = 3000;

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dao = require('./qa-dao');
const { Question, Answer } = require('./qa');

function delay(req, res, next) {
    setTimeout(() => { next() }, 1000);
}

const app = express();
app.use(morgan('combined'));
app.use(express.json());
app.use(cors());
// app.use(delay) ; // if you want to add an extra latency (ONLY FOR DEBUG!!)


// POST /api/questions
// Create a new question
app.post('/api/questions', (req, res) => {
    const question = new Question(null, req.body.text, req.body.author, req.body.date);
    dao.createQuestion(question).then((result) => {
        res.end();
    }).catch((error) => {
        res.status(500).send(error.message);
    });
});

// GET /api/questions
// List all questions
app.get('/api/questions', (req, res) => {
    dao.listQuestions().then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).send(error.message);
    });
});

// GET /api/questions/:questionId/answers
// List all answers to a specific question
app.get('/api/questions/:questionId/answers', async (req, res) => {
    const questionId = req.params.questionId;

    try {
        const answers = await dao.listAnswers(questionId);
        res.json(answers);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// POST /api/questions/:questionId/answers
// Create a new answer to a specific question
// Returns the ID of the new answer (simple text in the body)
app.post('/api/questions/:questionId/answers', async (req, res) => {
    const questionId = req.params.questionId;

    const bodyanswer = req.body;
    const answer = new Answer(undefined, bodyanswer.text, bodyanswer.author, undefined, bodyanswer.date, questionId);

    try {
        let id = await dao.createAnswer(questionId, answer);
        console.log(id) ;
        res.send(String(id));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// DELETE /api/answers/:answerId
// Delete a specific answer
app.delete('/api/answers/:answerId', async (req, res) => {
    const answerId = req.params.answerId;

    try {
        await dao.deleteAnswer(answerId);
        res.end();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// PUT /api/answers/:answerId
// Replace an existing answer with new values (score is forced to 0, id is unchanged)
app.put('/api/answers/:answerId', async (req, res) => {
    const answerId = req.params.answerId;

    const bodyanswer = req.body;

    // The answer ID is unchanged
    // The answer score is reset to ZERO
    const answer = new Answer(answerId, bodyanswer.text, bodyanswer.author, 0, bodyanswer.date);  // questionId is undefined

    try {
        await dao.updateAnswer(answerId, answer);
        res.end();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// POST /api/answers/:answerId/vote
// Increase (+1) the score of an answer
app.post('/api/answers/:answerId/vote', async (req, res) => {
    const answerId = req.params.answerId;

    const vote = req.body.vote;

    if (vote === "up") {
        await dao.upVoteAnswer(answerId);
        const my_ans = await dao.readAnswer(answerId);

        res.json({ score: my_ans });
    } else {
        res.status(403).send("Invalid command");
    }
});


app.listen(PORT,
    () => { console.log(`Server started on http://localhost:${PORT}/`) });