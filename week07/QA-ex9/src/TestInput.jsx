import { useState } from "react";

function TestInput(props) {

    const [name, setName] = useState('');

    function updateName(event) {
        setName(event.target.value)
    }

    return <>
    Name: <input value={name} onChange={updateName}></input>
    </>
}

export {TestInput}