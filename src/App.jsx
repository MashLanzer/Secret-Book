import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoadingScreen from './components/ui/LoadingScreen'

import LoginPage from './components/auth/LoginPage'
import OnboardingPage from './components/auth/OnboardingPage'
import PairPage from './components/auth/PairPage'

import Layout from './components/layout/Layout'
import Dashboard from './components/dashboard/Dashboard'
import CatalogPage from './components/catalog/CatalogPage'
import PositionDetail from './components/catalog/PositionDetail'
import HistoryPage from './components/history/HistoryPage'
import RoulettePage from './components/roulette/RoulettePage'
import AchievementsPage from './components/achievements/AchievementsPage'
import StatsPage from './components/stats/StatsPage'
import ProfilePage from './components/profile/ProfilePage'

function RootRedirect() {
  const { user, profile, loading } = useAuth()
  if (loading) return <LoadingScreen message="Abriendo tu libro..." />
  if (!user) return <Navigate to="/login" replace />
  if (!profile) return <Navigate to="/onboarding" replace />
  return <Navigate to="/app/dashboard" replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />

      <Route path="/app" element={<Layout />}>
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="catalog/:id" element={<PositionDetail />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="roulette" element={<RoulettePage />} />
        <Route path="achievements" element={<AchievementsPage />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="pair" element={<PairPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
