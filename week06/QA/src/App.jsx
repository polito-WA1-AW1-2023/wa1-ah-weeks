import { QuestionWithAnswers } from "./Components";
import { Question, Answer } from "./qa";

// FAKE DATA
const myquestion = new Question('Is JavaScript better than Python?', 'Luigi De Russis', '2023-01-01');
myquestion.add(new Answer('Yes', 'Luca Mannella', -10, '2023-02-15'));
myquestion.add(new Answer('Both have their pros and cons', 'Mario Rossi', 0, '2023-03-04'));


function App() {
  return <QuestionWithAnswers question={myquestion}/>;
}

export default App
