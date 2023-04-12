function QuestionWithAnswers(props) {

    const q = props.question;

    if (q) {
        return (<>
            <QuestionDetails author={q.author} text={q.text} />
            <AnswerDetails answers={q.answers} />
        </>)

    } else {
        return "QUESTION UNDEFINED"
    }

}

function QuestionDetails(props) {
    return <div>
        Asked by {props.author}<br />
        {props.text}
    </div>
}

function AnswerDetails(props) {
    return <>
        <h2>Answers:</h2>
        <table className="table" id="answerstable">
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
                {props.answers.map((a,i) => <AnswerRow key={i} answer={a} />)}
            </tbody>
            <tfoot>
                <NewAnswerForm />
            </tfoot>
        </table>
    </>
}

function AnswerRow(props) {
    return <tr>
        <td>{props.answer.date.format('DD/MM/YYYY')}</td>
        <td>{props.answer.text}</td>
        <td>{props.answer.author}</td>
        <td>{props.answer.score}</td>
        <td>VOTE</td>
    </tr>
}

function NewAnswerForm(props) {
    return <tr>
        <td><input type="date" name="date" /></td>
        <td><input type="text" name="text" /></td>
        <td><input type="text" name="author" /></td>
        <td></td>
        <td><button id="addbutton">ADD</button></td>
    </tr>;
}

export { QuestionWithAnswers };