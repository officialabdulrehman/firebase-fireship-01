import './App.css'
import { handleGoogleSignin, handleLogout } from './lib/firebase'

function App() {

  return (
    <div className="App">
      <button onClick={handleGoogleSignin}>Google Signin</button>
      <button onClick={handleLogout}>Logout</button>
    </div >
  )
}

export default App
