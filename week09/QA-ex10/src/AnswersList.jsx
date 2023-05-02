import { Link, useParams } from "react-router-dom";

function AnswersList() {
    // const params = useParams() ;
    // console.log(params) ;

    const {questionId} = useParams() ;

    return <div>
    <p>ANSWERS LIST TO QUESTION NUMBER {questionId}</p>
    <ul>
        <li>Answer one - DELETE VOTE <Link to={`/editAnswer/${questionId}/1`}>EDIT</Link></li>
        <li>Answer two - DELETE VOTE <Link to={`/editAnswer/${questionId}/2`}>EDIT</Link></li>
        <li>Answer three - DELETE VOTE <Link to={`/editAnswer/${questionId}/3`}>EDIT</Link></li>
    </ul>
    <p><Link to={`/addAnswer/${questionId}`}>ADD</Link></p>
    <p><Link to='/'>BACK</Link></p>
    <p><a href='/'>BACK_LINK</a></p>

    </div> ;
}

export {AnswersList} ;