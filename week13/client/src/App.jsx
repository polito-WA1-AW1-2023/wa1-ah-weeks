import { Container, Navbar } from 'react-bootstrap';
import { BrowserRouter, Link, Outlet, Route, Routes, useParams } from 'react-router-dom';
import { Answer, Question } from "./qa";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect, useState } from "react";
import { AddAnswer } from "./AddAnswer";
import { AnswersList } from "./AnwersList";
import { EditAnswer } from "./EditAnswer";
import { PageNotFound } from "./PageNotFound";
import { QuestionList } from "./QuestionList";
import { listQuestions, checkLogin, doLogout } from './API';
import UserContext from './UserContext';
import { LoginForm } from './Login';



function App() {

  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState({}) ;

  const validateLogin = async (username, password) => {
      const user = await checkLogin(username, password) ;
      setUser(user) ;
  }

  const handleLogout = async () => {
    await doLogout() ;
    setUser({});
  }

  useEffect(() => {
    // load the list of questions from the API server
    listQuestions().then((list) => {
      setQuestions(list);
    })
  }, []);

  // if(questions.length==0)
  // return "Loading..."

  return <UserContext.Provider value={user}>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout handleLogout={handleLogout} />}>
          <Route index element={<QuestionList questions={questions} />} />
          <Route path='/login' element={<LoginForm validateLogin={validateLogin}/>}/>
          <Route path='/answers/:idQuestion'
            element={<AnswersList questions={questions} />} />
          <Route path='/addAnswer/:idQuestion'
            element={<AddAnswer />} />
          <Route path='/editAnswer/:idQuestion/:idAnswer'
            element={<EditAnswer questions={questions} />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </UserContext.Provider>;

}

function MainLayout(props) {
  const { idQuestion } = useParams();
  const user = useContext(UserContext) ;
  console.log(user) ;
  return <>
    <header>
      <Navbar sticky="top" variant='dark' bg="primary" expand="lg" className='mb-3'>
        <Container>
          <Navbar.Brand><Link to='/' style={{ color: 'white', textDecoration: 'none' }}>HeapOverrun</Link> {idQuestion && <span>- Question {idQuestion}</span>} </Navbar.Brand>
          <Navbar.Text>
            {user.id ? <span>{user.name} <Link onClick={props.handleLogout}>Logout</Link></span>: <Link to='/login'>Login</Link>}
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
