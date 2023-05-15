import { Container, Navbar } from 'react-bootstrap';
import { BrowserRouter, Link, Outlet, Route, Routes, useParams } from 'react-router-dom';
import { Answer, Question } from "./qa";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { AddAnswer } from "./AddAnswer";
import { AnswersList } from "./AnwersList";
import { EditAnswer } from "./EditAnswer";
import { PageNotFound } from "./PageNotFound";
import { QuestionList } from "./QuestionList";

// FAKE DATA
const myquestion = new Question(1, 'Is JavaScript better than Python?', 'Luigi De Russis', '2023-01-01');
myquestion.add(new Answer(1, 'Yes', 'Luca Mannella', -10, '2023-02-15'));
myquestion.add(new Answer(2, 'Both have their pros and cons', 'Mario Rossi', 0, '2023-03-04'));
myquestion.add(new Answer(3, 'Hiiii', 'Dumb boy', -5, '2023-03-04'));
const secondquestion = new Question(2, 'What is the hardest web technology to learn?', 'Fulvio Corno', '2023-05-01');
secondquestion.add(new Answer(4, 'CSS', 'Everyone', 10, '2023-05-01'));
secondquestion.add(new Answer(5, 'HTML', 'Dumb boy', -5, '2023-05-02'));


function App() {

  const [questions, setQuestions] = useState([{ id: myquestion.id, text: myquestion.text, author: myquestion.author, date: myquestion.date }, { id: secondquestion.id, text: secondquestion.text, author: secondquestion.author, date: secondquestion.date }]);
  const [answers, setAnswers] = useState([...myquestion.answers, ...secondquestion.answers]);

  const deleteAnswer = (id) => {
    setAnswers((oldAnswers) => (oldAnswers.filter((ans) => (ans.id !== id))));
  }

  const upVoteAnswer = (id) => {
    console.log(`upvote ${id}`)
    setAnswers((oldAnswers) => (
      oldAnswers.map((ans) => (
        ans.id === id ? {...ans, score: ans.score+1} : ans
      ))
    ));
  }

  const addAnswer = (date, text, author, questionId) => {
    setAnswers((oldAnswers) => {
      const newId = Math.max(...oldAnswers.map(a => a.id)) + 1;
      let newAns = new Answer(newId, text, author, 0, date);
      newAns.questionId = questionId ;
      return [...oldAnswers, newAns];
    });
  }

  const editAnswer = (id, date, text, author, questionId) => {
    setAnswers((oldAnswers) => (
      oldAnswers.map((ans) => (
        ans.id === id ? {...(new Answer(ans.id, text, author, ans.score, date)), questionId: questionId} : ans
      ))
    ));
  }




  return <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<QuestionList questions={questions} />} />
        <Route path='/answers/:idQuestion'
          element={<AnswersList questions={questions} answers={answers} deleteAnswer={deleteAnswer} upVoteAnswer={upVoteAnswer}/>} />
        <Route path='/addAnswer/:idQuestion'
          element={<AddAnswer addAnswer={addAnswer}/>} />
        <Route path='/editAnswer/:idQuestion/:idAnswer'
          element={<EditAnswer questions={questions} answers={answers} editAnswer={editAnswer} />} />
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>;

}

function MainLayout() {
  const { idQuestion } = useParams();
  return <>
    <header>
      <Navbar sticky="top" variant='dark' bg="primary" expand="lg" className='mb-3'>
        <Container>
          <Navbar.Brand><Link to='/' style={{ color: 'white', textDecoration: 'none' }}>HeapOverrun</Link> {idQuestion && <span>- Question {idQuestion}</span>} </Navbar.Brand>
          <Navbar.Text>
            Signed in as: Tom
          </Navbar.Text>
        </Container>
      </Navbar>
    </header>
    <main>
      <Container>
        <Outlet />
      </Container>
    </main>

  </>
}

export default App
