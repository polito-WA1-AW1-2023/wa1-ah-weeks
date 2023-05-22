import { Container, Navbar } from 'react-bootstrap';
import { BrowserRouter, Link, Outlet, Route, Routes, useParams } from 'react-router-dom';
import { Answer, Question } from "./qa";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { AddAnswer } from "./AddAnswer";
import { AnswersList } from "./AnwersList";
import { EditAnswer } from "./EditAnswer";
import { PageNotFound } from "./PageNotFound";
import { QuestionList } from "./QuestionList";
import { listQuestions } from './API';



function App() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // load the list of questions from the API server
    listQuestions().then((list) => {
      setQuestions(list);
    })
  }, []);

  return <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<QuestionList questions={questions} />} />
        <Route path='/answers/:idQuestion'
          element={<AnswersList questions={questions}  />} />
        <Route path='/addAnswer/:idQuestion'
          element={<AddAnswer/>} />
        <Route path='/editAnswer/:idQuestion/:idAnswer'
          element={<EditAnswer questions={questions} />} />
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
