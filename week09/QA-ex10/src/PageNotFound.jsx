import { Link } from "react-router-dom";

function PageNotFound() {
    return <>
    <p>PAGE NOT FOUND</p>
    <p><Link to='/'>Back to the home page</Link></p>
    </>
}

export {PageNotFound};