import { useState, useEffect } from 'react'
import {
  doc, setDoc, getDoc, collection, query, where,
  getDocs, serverTimestamp, orderBy
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from '../contexts/AuthContext'

export function useExperiences() {
  const { user, profile } = useAuth()
  const [myExperiences, setMyExperiences] = useState({})
  const [partnerExperiences, setPartnerExperiences] = useState({})
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  const partnerId = profile?.partnerId

  useEffect(() => {
    if (!user) { setLoading(false); return }
    loadMyExperiences()
  }, [user])

  useEffect(() => {
    if (partnerId) loadPartnerExperiences()
  }, [partnerId])

  useEffect(() => {
    if (profile?.coupleId) loadHistory()
  }, [profile?.coupleId])

  const loadMyExperiences = async () => {
    try {
      const snap = await getDocs(collection(db, 'users', user.uid, 'experiences'))
      const data = {}
      snap.forEach(d => { data[d.id] = d.data() })
      setMyExperiences(data)
    } finally {
      setLoading(false)
    }
  }

  const loadPartnerExperiences = async () => {
    if (!partnerId) return
    const snap = await getDocs(collection(db, 'users', partnerId, 'experiences'))
    const data = {}
    snap.forEach(d => { data[d.id] = d.data() })
    setPartnerExperiences(data)
  }

  const loadHistory = async () => {
    if (!profile?.coupleId) return
    try {
      const q = query(
        collection(db, 'couples', profile.coupleId, 'history'),
        orderBy('fecha', 'desc')
      )
      const snap = await getDocs(q)
      setHistory(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch (e) {
      console.error(e)
    }
  }

  const saveExperience = async (positionId, updates) => {
    if (!user) return
    const pid = String(positionId)
    const ref = doc(db, 'users', user.uid, 'experiences', pid)
    const existing = myExperiences[pid] || {}
    const merged = { ...existing, ...updates, updatedAt: serverTimestamp() }
    await setDoc(ref, merged, { merge: true })
    setMyExperiences(prev => ({ ...prev, [pid]: merged }))

    if (updates.realizada && !existing.realizada && profile?.coupleId) {
      await setDoc(doc(collection(db, 'couples', profile.coupleId, 'history')), {
        positionId: pid,
        fecha: serverTimestamp(),
        realizadaPor: user.uid,
      })
      loadHistory()
    }
  }

  const getMyExp = (positionId) => myExperiences[String(positionId)] || {}
  const getPartnerExp = (positionId) => partnerExperiences[String(positionId)] || {}

  const getStats = () => {
    const vals = Object.values(myExperiences)
    const realizadas = vals.filter(e => e.realizada).length
    const favoritas = vals.filter(e => e.favorita).length
    const calificadas = vals.filter(e => e.calificacion)
    const avgRating = calificadas.length
      ? calificadas.reduce((s, e) => s + e.calificacion, 0) / calificadas.length
      : 0
    const conComentarios = vals.filter(e => e.comentario?.trim()).length
    return { realizadas, favoritas, avgRating, conComentarios, total: 100 }
  }

  return {
    myExperiences, partnerExperiences, history, loading,
    saveExperience, getMyExp, getPartnerExp, getStats,
    reload: () => { loadMyExperiences(); loadPartnerExperiences(); loadHistory() }
  }
}
