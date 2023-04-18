import dayjs from 'dayjs';
import { useState } from 'react';
import {Form, Button} from 'react-bootstrap';

function AddOrEditAnswer(props) {

    const [date, setDate] = useState(
        props.mode==='edit' ? props.initialValue.date.format('YYYY-MM-DD') :
        dayjs().format('YYYY-MM-DD')) ;
    const [text, setText] = useState(
        props.mode==='edit' ? props.initialValue.text : '') ;
    const [author, setAuthor] = useState(
        props.mode==='edit' ? props.initialValue.author :'') ;

    const [err, setErr] = useState('')

    function handleAdd() {
        if(text!=='' && author!=='') {
            props.handleAdd(date, text, author);
        } else {
            setErr('Some data are missing') ;
        }
    }

    function handleSave() {
        if(text!=='' && author!=='') {
            props.handleSave(props.initialValue.id, date, text, author);
        } else {
            setErr('Some data are missing') ;
        }
    }

    return <div>
        {err && <p>{err}</p>}

            <Form.Group controlId="answerDate">
            <Form.Label className='fw-light'>Date</Form.Label>
            <Form.Control value={date} onChange={(ev)=>{setDate(ev.target.value)}} type="date" name="date" placeholder="Enter date" />
        </Form.Group>

        <Form.Group controlId="answerText">
            <Form.Label className='fw-light'>Answer text</Form.Label>
            <Form.Control value={text} onChange={(ev)=>{setText(ev.target.value)}} type="text" name="text" placeholder="Enter Answer" />
        </Form.Group>

        <Form.Group controlId="answerAuthor">
            <Form.Label className='fw-light'>Author</Form.Label>
            <Form.Control value={author} onChange={(ev)=>{setAuthor(ev.target.value)}}type="text" name="author" placeholder="Author's name" />
        </Form.Group>

        <Form.Group controlId="addButton">
            <Form.Label className='fw-light'>&nbsp;</Form.Label><br />
            {props.mode==='add' && <Button variant='success' id="addbutton" onClick={handleAdd}>ADD</Button>}
            {props.mode==='edit' && <Button variant='success' id="addbutton" onClick={handleSave}>SAVE</Button>}
            {' '}<Button variant='secondary' id="addbutton" onClick={props.handleCancel}>CANCEL</Button>
        </Form.Group>
    </div>
}

export {AddOrEditAnswer}


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
            <Form.Label className='fw-light'>&nbsp;</Form.Label><br />
            <Button variant='success' id="addbutton">ADD</Button>
        </Form.Group>
        </td>
    </tr>;
}
