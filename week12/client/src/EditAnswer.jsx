import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AddOrEditAnswer } from "./AnswerForm";
import { Answer } from "./qa";

function EditAnswer(props) {
    const navigate = useNavigate() ;
    const { idQuestion, idAnswer } = useParams() ;

    const location = useLocation() ;
    console.log(location) ;

    let editedAnswer = undefined ;
    if(location.state) {
        editedAnswer = location.state ;
        editedAnswer = new Answer(editedAnswer.id, editedAnswer.text, editedAnswer.author, editedAnswer.score, editedAnswer.date) ;
    }
    console.log(editedAnswer) ;

    const handleCancel = () => {
        navigate(`/answers/${idQuestion}`)
    }

    const handleSave = (id, date, text, author) => {
        // call API!!
        navigate(`/answers/${idQuestion}`)
    }

    return <AddOrEditAnswer mode='edit' handleCancel={handleCancel} handleSave={handleSave} initialValue={editedAnswer}/>

}

export { EditAnswer };