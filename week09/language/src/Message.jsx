import { useContext } from "react";
import LanguageContext from "./LanguageContext";

function Message() {

    const lang = useContext(LanguageContext) ;

    if(lang=='EN') {
        return <p>Message in English</p>
    } else {
        return <p>Messaggio in Italiano</p>
    }
    
}

export { Message };