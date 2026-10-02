// Remembers who is logged in, for the whole site - Owner: SHALOM

import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext(null)

function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) {
      return fallback
    }
    return JSON.parse(raw)
  } catch (error) {
    return fallback
  }
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = readStore('artmind_user', null)
    if (savedUser) {
      setUser(savedUser)
    }
   
    setLoading(false)
  }, [])

  
  function logout() {
    try {
      localStorage.removeItem('artmind_user')
    } catch (error) {
      
    }
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}

export default UserContext
