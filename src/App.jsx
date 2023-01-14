import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import './App.css'
import { firebaseAuthService, handleGoogleSignin, handleLogout } from './lib/firebase'

function App() {
  const [displayUser, setDisplayUser] = useState(null)

  let userSection = null

  if (displayUser) {
    userSection = <div>
      <h1>{displayUser.displayName}</h1>
      <p>{displayUser.email}</p>
      <img src={displayUser.photoURL} height={50} width={50} alt="Profil picture" />
    </div>
  }

  onAuthStateChanged(firebaseAuthService, (user) => {
    setDisplayUser(user)
  })

  return (
    <div className="App">
      {userSection}
      <button onClick={handleGoogleSignin}>Google Signin</button>
      <button onClick={handleLogout}>Logout</button>
    </div >
  )
}

export default App
