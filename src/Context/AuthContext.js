
import React, { useContext, useState, useEffect } from "react"
import { auth} from "../firebase";

/* Using React Context to create Auth Context */
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  /* Registers A user */
  const signup = (email, password,userName) =>{
    return auth.createUserWithEmailAndPassword(email, password)

  }

  /* Logs a user in */
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password).then(user => console.log(user))
  }

  /* Logs out a user */
  const logout = () => {
    return auth.signOut()
  }

  /* Listens to changes in Auth state */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
      
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}