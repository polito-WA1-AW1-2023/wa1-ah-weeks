import { useContext } from "react";
import LanguageContext from "./LanguageContext";

function LanguageButton(props) {
    const lang = useContext(LanguageContext) ;

    if(lang=='EN')
        return <button onClick={props.toggle}>EN</button>;
    else
        return <button onClick={props.toggle}>IT</button> ;
}

export { LanguageButton };