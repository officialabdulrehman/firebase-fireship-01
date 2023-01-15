import { onAuthStateChanged } from 'firebase/auth'
import { onSnapshot, serverTimestamp } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { addThing, firebaseAuthService, handleGoogleSignin, handleLogout, thingsRef } from './lib/firebase'

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

  const handleCreateThing = useCallback(async () => {
    if (displayUser) {
      await addThing({
        uid: displayUser.uid,
        name: "New Item " + Math.random().toString(),
        createdAt: serverTimestamp()
      })
    }
  })

  let unsub;

  useEffect(() => {
    onAuthStateChanged(firebaseAuthService, (user) => {
      if (user) {
        setDisplayUser(user)
        unsub = onSnapshot(thingsRef, snapShot => {
          console.log(snapShot.docs)
        })
      } else {
        unsub && unsub()
      }
    })
  }, [displayUser])

  const btn = !displayUser ? (
    <button onClick={handleGoogleSignin}>Google Signin</button>
  ) : (
    <button onClick={handleLogout}>Logout</button>
  );

  return (
    <div className="App">
      {userSection}
      {btn}
      <button onClick={handleCreateThing}>Create Thing</button>
    </div >
  )
}

export default App
