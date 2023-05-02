import { Link } from "react-router-dom";

function QuestionsList() {

    return <div>
        <p>LIST OF QUESTIONS</p>
        <ul>
            <li><Link to='/answers/1'>Question one</Link></li>
            <li><Link to='/answers/2'>Question two</Link></li>
        </ul>
        </div>;
}

export {QuestionsList} ;