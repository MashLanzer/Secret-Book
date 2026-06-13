import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const tabs = [
  {
    to: '/app/dashboard',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    label: 'Inicio',
  },
  {
    to: '/app/catalog',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
    label: 'Catálogo',
  },
  {
    to: '/app/roulette',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    label: 'Ruleta',
    featured: true,
  },
  {
    to: '/app/history',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
      </svg>
    ),
    label: 'Historial',
  },
  {
    to: '/app/profile',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
    label: 'Perfil',
  },
]

export default function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 safe-bottom"
      style={{
        background: 'rgba(13,6,23,0.92)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-end justify-around max-w-md mx-auto px-2 py-2">
        {tabs.map(tab => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-all duration-200 no-select min-w-[52px] ${
                tab.featured ? '-mt-5' : ''
              }`
            }
          >
            {({ isActive }) =>
              tab.featured ? (
                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                      boxShadow: isActive ? '0 0 20px rgba(168,85,247,0.5)' : '0 4px 15px rgba(0,0,0,0.4)',
                    }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <span style={{ color: 'white' }}>{tab.icon}</span>
                  </motion.div>
                  <span className="text-[10px] mt-1" style={{ color: isActive ? '#a855f7' : 'rgba(255,255,255,0.35)' }}>
                    {tab.label}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center py-1">
                  <motion.div whileTap={{ scale: 0.88 }} style={{ color: isActive ? '#a855f7' : 'rgba(255,255,255,0.35)' }}>
                    {tab.icon}
                  </motion.div>
                  <span
                    className="text-[10px] font-medium"
                    style={{ color: isActive ? '#a855f7' : 'rgba(255,255,255,0.35)' }}
                  >
                    {tab.label}
                  </span>
                </div>
              )
            }
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
