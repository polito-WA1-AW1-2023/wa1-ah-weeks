import { useNavigate, useParams } from "react-router-dom";
import { AddOrEditAnswer } from "./AnswerForm";

function EditAnswer(props) {
    const navigate = useNavigate() ;
    const { idQuestion, idAnswer } = useParams() ;

    const handleCancel = () => {
        navigate(`/answers/${idQuestion}`)
    }

    const handleSave = (id, date, text, author) => {
        props.editAnswer(id, date, text, author, idQuestion)
        navigate(`/answers/${idQuestion}`)
    }

    const editedAnswer = props.answers.filter((a)=>(a.id == idAnswer))[0] ;

    return <AddOrEditAnswer mode='edit' handleCancel={handleCancel} handleSave={handleSave} initialValue={editedAnswer}/>

}

export { EditAnswer };