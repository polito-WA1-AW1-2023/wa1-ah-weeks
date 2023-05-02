import { useState } from 'react';
import { LanguageButton } from './LanguageButton';
import { Message } from './Message';
import LanguageContext from './LanguageContext';

function App() {

  const [lang, setLang] = useState("IT") ;

  const langToggle = () => {
    setLang( (oldLang) => {
      if(oldLang=='EN')
      return 'IT'
      else
      return 'EN'
    })
  }

  return (<>
    <LanguageContext.Provider value={lang}>
      <LanguageButton toggle={langToggle}/>
      <Message />
    </LanguageContext.Provider>
  </>
  )
}

export default App;
