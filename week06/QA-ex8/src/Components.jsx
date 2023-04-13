import { Badge, Button, Col, Form, Row, Table } from "react-bootstrap";

function QuestionWithAnswers(props) {

    const q = props.question;
    const answers = props.answers ;

    if (q) {
        return (<>
            <QuestionDetails author={q.author} text={q.text} />
            <AnswerDetails answers={answers} deleteAnswer={props.deleteAnswer} upVoteAnswer={props.upVoteAnswer} />
        </>)

    } else {
        return <div>"QUESTION UNDEFINED"</div>
    }

}

function QuestionDetails(props) {
    return <div>
        <Row>
            <Col md={8}>
                <p className='lead'>{props.text}</p>
            </Col>
            <Col md={4} className='text-end'>
                Asked by <Badge pill bg='secondary'>{props.author}</Badge>
            </Col>
        </Row>

    </div>
}

function AnswerDetails(props) {
    return <>
        <h2>Answers:</h2>
        <Table hover>
            <thead >
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Text</th>
                    <th scope="col">Author</th>
                    <th scope="col">Score</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.answers.map(a => <AnswerRow key={a.id} answer={a} deleteAnswer={props.deleteAnswer} upVoteAnswer={props.upVoteAnswer} />)}
            </tbody>
            <tfoot>
                <NewAnswerForm />
            </tfoot>
        </Table>
    </>
}

function AnswerRow(props) {
    return <tr>
        <td>{props.answer.date.format('DD/MM/YYYY')}</td>
        <td>{props.answer.text}</td>
        <td>{props.answer.author}</td>
        <td>{props.answer.score}</td>
        <td><Button variant='secondary' onClick={()=>{props.upVoteAnswer(props.answer.id)}}>VOTE</Button>{' '}
        <Button variant='warning' onClick={()=>{props.deleteAnswer(props.answer.id)}}>DELETE</Button></td>
    </tr>
}

function NewAnswerForm(props) {
    return <tr>
        <td><Form.Group controlId="answerDate">
            <Form.Label className='fw-light'>Date</Form.Label>
            <Form.Control type="date" name="date" placeholder="Enter date" />
        </Form.Group></td>

        <td><Form.Group controlId="answerText">
            <Form.Label className='fw-light'>Answer text</Form.Label>
            <Form.Control type="text" name="text" placeholder="Enter Answer" />
        </Form.Group></td>

        <td><Form.Group controlId="answerAuthor">
            <Form.Label className='fw-light'>Author</Form.Label>
            <Form.Control type="text" name="author" placeholder="Author's name" />
        </Form.Group></td>

        <td></td>
        <td><Form.Group controlId="addButton">
        <Form.Label className='fw-light'>&nbsp;</Form.Label><br/>
            <Button variant='success' id="addbutton">ADD</Button>
            </Form.Group>
            </td>
    </tr>;
}

export { QuestionWithAnswers };