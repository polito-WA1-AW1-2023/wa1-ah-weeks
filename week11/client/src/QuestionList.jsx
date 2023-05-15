import { Link } from "react-router-dom";
import { Card, CardGroup } from 'react-bootstrap';

function QuestionList(props) {
    return <CardGroup>
        {props.questions.map((q) => (
            <Card key={q.id}>
                <Card.Body>
                    <Card.Title>{q.text}</Card.Title>
                    <Card.Subtitle>{q.author}</Card.Subtitle>
                </Card.Body>
                <Card.Footer><Link to={`/answers/${q.id}`}>details...</Link></Card.Footer>

            </Card>
        ))}
    </CardGroup>
}

export { QuestionList };

        // <li><Link to={`/answers/${q.id}`}>This is question number {q.id}: {q.text}</Link></li>))}
