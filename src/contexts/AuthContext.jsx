import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [coupleData, setCoupleData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        await refreshProfile(firebaseUser.uid)
      } else {
        setProfile(null)
        setCoupleData(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  const refreshProfile = async (uid) => {
    try {
      const profileSnap = await getDoc(doc(db, 'users', uid))
      if (profileSnap.exists()) {
        const data = profileSnap.data()
        setProfile(data)
        if (data.coupleId) {
          const coupleSnap = await getDoc(doc(db, 'couples', data.coupleId))
          if (coupleSnap.exists()) setCoupleData(coupleSnap.data())
        }
      } else {
        setProfile(null)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const value = { user, profile, coupleData, loading, refreshProfile }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
