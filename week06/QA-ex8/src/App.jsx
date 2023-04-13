import { QuestionWithAnswers } from "./Components";
import { Question, Answer } from "./qa";
import { Container, Navbar } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

// FAKE DATA
const myquestion = new Question(1, 'Is JavaScript better than Python?', 'Luigi De Russis', '2023-01-01');
myquestion.add(new Answer(1, 'Yes', 'Luca Mannella', -10, '2023-02-15'));
myquestion.add(new Answer(2, 'Both have their pros and cons', 'Mario Rossi', 0, '2023-03-04'));


function App() {

  const [question, setQuestion] = useState({ id: myquestion.id, text: myquestion.text, author: myquestion.author, date: myquestion.date });
  const [answers, setAnswers] = useState([...myquestion.answers]);

  const deleteAnswer = (id) => {
    //  console.log('Deleting answer '+id);    
    setAnswers((oldAnswers) => (oldAnswers.filter((ans) => (ans.id !== id))));
  }

  const upVoteAnswer = (id) => {
    console.log('Upvoting answer ' + id);
    setAnswers((oldAnswers) => (
      oldAnswers.map((ans) => (
        ans.id === id ? new Answer(ans.id, ans.text, ans.author, ans.score + 1, ans.date) : ans
      ))
    ));
  }

  const addAnswer = (date, text, author) => {
    // TODO: test/debug
    setAnswers((oldAnswers) => {
      const newId = Math.max(...oldAnswers.map(a => a.id)) + 1;
      const newAns = new Answer(newId, text, author, 0, date);
      return [...oldAnswers, newAns];
    });

  }

  // alternative: group all callback functions in one object, to minimize the number of props to pass
  const actions = { deleteAnswer: deleteAnswer, upVoteAnswer: upVoteAnswer }

  return <>
    <header>
      <Navbar sticky="top" variant='dark' bg="primary" expand="lg" className='mb-3'>
        <Container>
          <Navbar.Brand>HeapOverrun - Question 1</Navbar.Brand>
          <Navbar.Text>
            Signed in as: Tom
          </Navbar.Text>
        </Container>
      </Navbar>
    </header>
    <main>
      <Container>
        <QuestionWithAnswers question={question} answers={answers}
          deleteAnswer={deleteAnswer} upVoteAnswer={upVoteAnswer} />
      </Container>
    </main>
  </>

}

export default App
