import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Badge, Table } from "react-bootstrap";
import { useState } from "react";

function AnswersList(props) {
    const { idQuestion } = useParams();
    const navigate = useNavigate();

    const myQuestion = props.questions.filter((q)=>(q.id == idQuestion))[0];
    const myAnswers = props.answers.filter((a)=>(a.questionId==idQuestion)) ;
    // console.log(myAnswers)

    const handleAdd = () => {
        navigate(`/addAnswer/${idQuestion}`);
    }

    const handleClose = () => {
        navigate('/');
    }

    const handleDelete = (id) => {
        props.deleteAnswer(id);
    }

    const handleEdit = (id) => {
        navigate(`/editAnswer/${idQuestion}/${id}`) ;
    }

    const handleVote = (id) => {
        props.upVoteAnswer(id);
    }

    return <div>
       <QuestionDetails question={myQuestion}/>
       <AnswerDetails answers={myAnswers} deleteAnswer={handleDelete} upVoteAnswer={handleVote} handleEdit={handleEdit} />

        <p><Button onClick={handleAdd}>ADD</Button> <Button onClick={handleClose}>CLOSE</Button></p>
    </div>
}

function QuestionDetails(props) {
    return <div>
        <Row>
            <Col md={8}>
                <p className='lead'>{props.question.text}</p>
            </Col>
            <Col md={4} className='text-end'>
                Asked by <Badge pill bg='secondary'>{props.question.author}</Badge>
            </Col>
        </Row>

    </div>
}

function AnswerDetails(props) {

    const [sorted, setSorted] = useState('none');

    // LOCAL COMPUTATION
    let sortedAnswers = [...props.answers]
    let sortIcon = '-'
    if (sorted === 'up') {
        sortedAnswers.sort((a, b) => (a.score - b.score));
        sortIcon = '^'
    } else if (sorted === 'down') {
        sortedAnswers.sort((a, b) => -(a.score - b.score));
        sortIcon = 'v'
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
                {sortedAnswers.map(a => <AnswerRow key={a.id} answer={a} deleteAnswer={props.deleteAnswer} upVoteAnswer={props.upVoteAnswer} handleEdit={props.handleEdit} />)}
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
        <td><Button variant='secondary' onClick={() => { props.upVoteAnswer(props.answer.id) }}>VOTE</Button>{' '}
            <Button variant='warning' onClick={() => { props.deleteAnswer(props.answer.id) }}>DELETE</Button>{' '}
            <Button variant='success' onClick={() => { props.handleEdit(props.answer.id) }}>EDIT</Button>
        </td>
    </tr>
}


export { AnswersList };