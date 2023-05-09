Create a new question

    POST /questions
    body: Question object

Get the list of all questions (with full details)

    GET /questions

    Response: list of Question objects

(Get the list of ID of the questions)
(Get the full details of a question, given the ID)

Get the list of all answers (with full details) to a specific question

    GET /questions/:questionId/answers

    Response body: list of Anwser objects

Create a new answer and add it to a specific question

    POST /questions/:questionId/answers
    Request body: a single Answer object

Delete an answer from a question

    DELETE /answers/:answerId

    DELETE /questions/:questionId/answers/:answerId  -- overkill

Update the content of an existing answer (keeping it in the same question)

    PUT /answers/:answerId
    Request body: an Answer object
    (id, score, question id will not be modified)

Vote an anwer

    NO: CREATES A RACE CONDITION if we have >=2 concurrent clients
    PUT /answers/:answerId/score
    Request body: object containing new score

    PUT /answers/:answerId/vote
    Request body: "up" (or "down")

TYPES OF ENTITIES (in JSON)
Question

{ id, text, author, date }
(id is a number, text, and author are strings)
(on creation, id should not be provided)
(date is a ISO-formatted string)

Answer

{ id, text, author, score, date }
(...see above...)