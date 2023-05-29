import { useNavigate, useParams } from "react-router-dom";
import { Button, Row, Col, Badge, Table, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { deleteAnswer, listAnswers, upVote } from "./API";

function AnswersList(props) {
    const { idQuestion } = useParams();
    const navigate = useNavigate();

    const [answers, setAnswers] = useState([]);
    const [waiting, setWaiting] = useState(true);
    const [errorMsg, setErrorMsg] = useState('') ;

    useEffect(() => {
        listAnswers(idQuestion).then(list => {
            setAnswers(list);
            setWaiting(false);
        })
    }, [idQuestion]);

    // auto-delete the error message after 2 seconds
    useEffect(()=>{
        if(errorMsg) {
            setTimeout(()=>{setErrorMsg('')}, 2000);
        }
    }, [errorMsg]);


    const myQuestion = props.questions.filter((q) => (q.id == idQuestion))[0];

    const handleAdd = () => {
        navigate(`/addAnswer/${idQuestion}`);
    }

    const handleClose = () => {
        navigate('/');
    }

    const handleDelete = async (id) => {
        setWaiting(true);
        await deleteAnswer(id);
        const list = await listAnswers(idQuestion);
        setAnswers(list);
        setWaiting(false);
    }

    const handleEdit = (id) => {
        let myAnswer = answers.filter(a=>a.id==id)[0] ;
        myAnswer = {...myAnswer, date: myAnswer.date.toISOString()};
        navigate(`/editAnswer/${idQuestion}/${id}`, {state: myAnswer});
    }

    const handleVote = async (id) => {

        try {
            setWaiting(true);

            // advance the result ( optimistic update )
            setAnswers((old)=>old.map(a => (a.id===id ? {...a, score:a.score+1} : a )))

            // call the API for increasing the score
            await upVote(id)


        } catch (error) {
            // console.log(error);
            setErrorMsg(error.message);
            setWaiting(false);
        } finally {
            // update the value shown in the component
            const list = await listAnswers(idQuestion);
            setAnswers(list);
            setWaiting(false);

        }
    }

    return <div>
        <QuestionDetails question={myQuestion} />
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        <AnswerDetails answers={answers} deleteAnswer={handleDelete} upVoteAnswer={handleVote} handleEdit={handleEdit} waiting={waiting}/>

        <p><Button disabled={waiting} onClick={handleAdd}>ADD</Button> <Button disabled={waiting} onClick={handleClose}>CLOSE</Button></p>
    </div>
}

function QuestionDetails(props) {
    return <div>
        <Row>
            <Col md={8}>
                <p className='lead'>{props.question ? props.question.text : "Loading..."}</p>
            </Col>
            <Col md={4} className='text-end'>
                Asked by <Badge pill bg='secondary'>{props.question ? props.question.author : "Loading..."}</Badge>
            </Col>
        </Row>

    </div>
}

function AnswerDetails(props) {

    const [sorted, setSorted] = useState('none');

    // LOCAL COMPUTATION
    let sortedAnswers = [...props.answers]
    let sortIcon = '↕'
    if (sorted === 'up') {
        sortedAnswers.sort((a, b) => (a.score - b.score));
        sortIcon = '↑'
    } else if (sorted === 'down') {
        sortedAnswers.sort((a, b) => -(a.score - b.score));
        sortIcon = '↓'
    }

    function sortByScore() {
        if (sorted === 'none')
            setSorted('up')
        else if (sorted === 'up')
            setSorted('down')
        else if (sorted === 'down')
            setSorted('none')
    }

    return <>
        <h2>Answers:</h2>
        <Table hover>
            <thead >
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Text</th>
                    <th scope="col">Author</th>
                    <th scope="col" onClick={sortByScore}>Score {sortIcon}</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {sortedAnswers.map(a => <AnswerRow key={a.id} answer={a} deleteAnswer={props.deleteAnswer} upVoteAnswer={props.upVoteAnswer} handleEdit={props.handleEdit} waiting={props.waiting}/>)}
            </tbody>
        </Table>
    </>
}

function AnswerRow(props) {
    return <tr>
        <td>{props.answer.date.format('DD/MM/YYYY')}</td>
        <td>{props.answer.text}</td>
        <td>{props.answer.author}</td>
        <td>{props.answer.score}</td>
        <td><Button disabled={props.waiting} variant='secondary' onClick={() => { props.upVoteAnswer(props.answer.id) }}>VOTE</Button>{' '}
            <Button disabled={props.waiting} variant='warning' onClick={() => { props.deleteAnswer(props.answer.id) }}>DELETE</Button>{' '}
            <Button disabled={props.waiting} variant='success' onClick={() => { props.handleEdit(props.answer.id) }}>EDIT</Button>
        </td>
    </tr>
}


export { AnswersList };