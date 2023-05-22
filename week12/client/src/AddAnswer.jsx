import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AddOrEditAnswer } from "./AnswerForm";

function AddAnswer(props) {

    const {idQuestion} = useParams() ;
    const navigate = useNavigate() ;

    const handleCancel = () => {
        navigate(`/answers/${idQuestion}`);
    }

    const handleAdd = (date, text, author) => {
        props.addAnswer(date, text, author, idQuestion) ;
        navigate(`/answers/${idQuestion}`);
    }

    return <div>
        <p>ADD A NEW ANSWER FOR QUESTION {idQuestion}</p>
        <AddOrEditAnswer mode='add' handleCancel={handleCancel} handleAdd={handleAdd}/>
    </div>

}

export {AddAnswer} ;