import { MessageList } from "./Messages"

function App() {

  return (<div>
    <h1>Hello World</h1>
    <MessageList text='React' count={5} />
    <MessageList text='HTML' count={5} />

  </div>
  )
}




export default App
