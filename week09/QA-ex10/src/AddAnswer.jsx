import { useNavigate, useParams } from "react-router-dom";

function AddAnswer() {
    const { questionId } = useParams() ;
    const navigate = useNavigate() ;

    const handleAdd = (event) => {
        // do the real add....
        navigate(`/answers/${questionId}`)
    }

    const handleCancel = (event) => {
        navigate(`/answers/${questionId}`)
    }

    return <div><p>ADD ANSWER TO QUESTION {questionId}</p>
    <p><button onClick={handleAdd}>ADD</button> <button onClick={handleCancel}>CANCEL</button></p>
    </div>
}

export {AddAnswer} ;