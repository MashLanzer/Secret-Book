export default function LoadingScreen({ message = 'Cargando...' }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ background: 'radial-gradient(ellipse at top, #1a0a2e 0%, #0d0617 70%)' }}>
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-purple-500/20" />
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 border-r-pink-500 animate-spin"
          style={{ animationDuration: '1.2s' }}
        />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 animate-pulse" />
      </div>
      <p className="text-white/50 text-sm font-medium tracking-wide">{message}</p>
    </div>
  )
}
