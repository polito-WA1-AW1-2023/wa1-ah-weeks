import { QuestionWithAnswers } from "./Components";
import { Question, Answer } from "./qa";
import { Container, Navbar } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

// FAKE DATA
const myquestion = new Question(1, 'Is JavaScript better than Python?', 'Luigi De Russis', '2023-01-01');
myquestion.add(new Answer(1, 'Yes', 'Luca Mannella', -10, '2023-02-15'));
myquestion.add(new Answer(2, 'Both have their pros and cons', 'Mario Rossi', 0, '2023-03-04'));


function App() {

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
        <QuestionWithAnswers question={myquestion} />
      </Container>
    </main>
  </>

}

export default App
