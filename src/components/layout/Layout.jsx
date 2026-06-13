import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import BottomNav from './BottomNav'
import LoadingScreen from '../ui/LoadingScreen'

export default function Layout() {
  const { user, profile, coupleData, loading } = useAuth()

  if (loading) return <LoadingScreen message="Abriendo tu libro secreto..." />
  if (!user) return <Navigate to="/login" replace />
  if (!profile) return <Navigate to="/onboarding" replace />
  if (!profile.coupleId) return <Navigate to="/pair" replace />

  return (
    <div className="min-h-screen" style={{ background: 'radial-gradient(ellipse at top, #1a0a2e 0%, #0d0617 70%)' }}>
      <main className="pb-24">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
