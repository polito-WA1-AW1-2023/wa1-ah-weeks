import { useState } from 'react'
import './App.css'

function App() {

  const [language, setLanguage] = useState('EN');
  const [count, setCount] = useState(0) ;

  function toggle_language() {
    if (language === 'IT')
      setLanguage('EN');
    else
      setLanguage('IT');

    setCount( (old_count)=>(old_count+1) ) ;
  }

  return (
    <div className="App">
      <p><button onClick={toggle_language}>{language === 'IT' ? "Italiano" : "English"}</button></p>

      {language === 'IT' ?
        <button onClick={()=>{setLanguage('EN')}}>Italiano</button> :
        <button onClick={()=>{setLanguage('IT')}}>English</button>}

      <Message language={language} count={count}/>
      <MyButton language={language} toggleLanguage={toggle_language}/>
    </div >
  )
}

function Message(props) {

  // const [msgLang, setMsgLang] = useState(props.language) ;

  return <p>{props.language === 'IT' ? "Buongiorno" : "Hello, world"} {props.count}</p>
  ;
}

function MyButton(props) {
  return <>{props.language === 'IT' ?
  <button onClick={props.toggleLanguage}>Italiano</button> :
  <button onClick={props.toggleLanguage}>English</button>}</> ;

}

export default App
