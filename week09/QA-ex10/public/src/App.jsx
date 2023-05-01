import { QuestionWithAnswers } from "./Components";
import { Question, Answer } from "./qa";
import { Container, Navbar } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

// FAKE DATA
const myquestion = new Question(1, 'Is JavaScript better than Python?', 'Luigi De Russis', '2023-01-01');
myquestion.add(new Answer(1, 'Yes', 'Luca Mannella', -10, '2023-02-15'));
myquestion.add(new Answer(2, 'Both have their pros and cons', 'Mario Rossi', 0, '2023-03-04'));
myquestion.add(new Answer(3, 'Hiiii', 'Dumb boy', -5, '2023-03-04'));


function App() {

  const [question, setQuestion] = useState({ id: myquestion.id, text: myquestion.text, author: myquestion.author, date: myquestion.date });
  const [answers, setAnswers] = useState([...myquestion.answers]);

  const deleteAnswer = (id) => {
    setAnswers((oldAnswers) => (oldAnswers.filter((ans) => (ans.id !== id))));
  }

  const upVoteAnswer = (id) => {
    setAnswers((oldAnswers) => (
      oldAnswers.map((ans) => (
        ans.id === id ? new Answer(ans.id, ans.text, ans.author, ans.score + 1, ans.date) : ans
      ))
    ));
  }

  const addAnswer = (date, text, author) => {
    setAnswers((oldAnswers) => {
      const newId = Math.max(...oldAnswers.map(a => a.id)) + 1;
      const newAns = new Answer(newId, text, author, 0, date);
      return [...oldAnswers, newAns];
    });
  }

  const editAnswer = (id, date, text, author) => {
    setAnswers((oldAnswers) => (
      oldAnswers.map((ans) => (
        ans.id === id ? new Answer(ans.id, text, author, ans.score, date) : ans
      ))
    ));
  }

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
          deleteAnswer={deleteAnswer} upVoteAnswer={upVoteAnswer} 
          addAnswer={addAnswer} editAnswer={editAnswer} />
      </Container>
    </main>
  </>

}

export default App
