function MessageList(props) {

    const cnt = props.count ;
    const txt = props.text ;
  
    const messages = [] ;
    for(let i=0; i<cnt; i++) {
      messages.push(<MessageItem text={txt}/>) ;
    }
    
    return <div>{messages}</div>;
  }
  
  function MessageItem(props) {
    return <p>First {props.text} component</p>
  }

  export {MessageList} ;