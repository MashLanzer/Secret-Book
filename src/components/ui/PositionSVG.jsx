const svgMap = {
  lying_face: (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="22" r="9" fill="currentColor" opacity="0.9"/>
      <path d="M25,31 C20,42 16,52 18,65" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
      <path d="M18,52 C26,58 30,60 22,68" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <circle cx="95" cy="22" r="9" fill="currentColor" opacity="0.9"/>
      <path d="M95,31 C100,42 104,52 102,65" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
      <path d="M102,52 C94,58 90,60 98,68" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <path d="M34,35 Q60,28 86,35" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" opacity="0.4"/>
    </svg>
  ),
  spoon: (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="72" cy="18" r="9" fill="currentColor" opacity="0.9"/>
      <path d="M72,27 C68,38 65,50 68,65" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
      <path d="M65,53 C58,58 54,62 60,68" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <circle cx="48" cy="25" r="8" fill="currentColor" opacity="0.7"/>
      <path d="M48,33 C44,44 41,55 44,68" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.8"/>
      <path d="M41,56 C34,61 30,64 37,70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
    </svg>
  ),
  rider: (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="15" r="9" fill="currentColor" opacity="0.9"/>
      <path d="M60,24 C55,34 50,42 48,55" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
      <path d="M48,55 C42,58 36,58 36,68" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <path d="M48,55 C54,58 60,58 60,68" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <path d="M30,68 Q60,58 90,68" stroke="currentColor" strokeWidth="8" strokeLinecap="round" opacity="0.7"/>
      <path d="M30,68 C28,75 25,82 30,90" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.7"/>
      <path d="M90,68 C92,75 95,82 90,90" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.7"/>
    </svg>
  ),
  kneeling: (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="85" cy="20" r="9" fill="currentColor" opacity="0.9"/>
      <path d="M85,29 C82,40 80,55 78,70" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
      <path d="M78,70 C70,72 65,75 68,85" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <path d="M78,70 C80,78 82,84 76,90" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <circle cx="38" cy="45" r="8" fill="currentColor" opacity="0.75"/>
      <path d="M38,53 C36,62 35,72 38,82" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.8"/>
      <path d="M38,82 C30,83 25,85 28,92" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
    </svg>
  ),
  seated: (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="42" cy="18" r="9" fill="currentColor" opacity="0.9"/>
      <path d="M42,27 C40,36 38,45 40,55" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
      <path d="M40,55 C32,57 25,60 28,72" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <path d="M40,55 C48,57 55,60 52,72" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <circle cx="78" cy="18" r="9" fill="currentColor" opacity="0.75"/>
      <path d="M78,27 C80,36 82,45 80,55" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.8"/>
      <path d="M80,55 C72,57 65,60 68,72" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
      <path d="M80,55 C88,57 95,60 92,72" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
      <path d="M42,40 Q60,35 78,40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.35"/>
    </svg>
  ),
  standing: (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="45" cy="12" r="9" fill="currentColor" opacity="0.9"/>
      <path d="M45,21 C43,35 42,50 43,70" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
      <path d="M43,70 C36,72 30,75 33,90" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <path d="M43,70 C50,72 56,75 53,90" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <circle cx="75" cy="12" r="9" fill="currentColor" opacity="0.75"/>
      <path d="M75,21 C77,35 78,50 77,70" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.8"/>
      <path d="M77,70 C70,72 64,75 67,90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
      <path d="M77,70 C84,72 90,75 87,90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
      <path d="M54,45 Q60,40 66,45" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" opacity="0.4"/>
    </svg>
  ),
  bridge: (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="70" r="8" fill="currentColor" opacity="0.7"/>
      <path d="M25,62 C28,50 35,35 55,25 C75,15 90,22 95,35" stroke="currentColor" strokeWidth="7" strokeLinecap="round" fill="none"/>
      <path d="M95,35 C100,42 105,55 100,65" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
      <path d="M20,68 C18,75 15,82 20,88" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.7"/>
      <path d="M30,68 C32,75 35,82 30,88" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.7"/>
      <circle cx="60" cy="60" r="7" fill="currentColor" opacity="0.9"/>
      <path d="M60,67 C56,72 52,78 55,85" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <path d="M60,67 C64,72 68,78 65,85" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    </svg>
  ),
  lotus: (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="45" cy="25" r="9" fill="currentColor" opacity="0.9"/>
      <path d="M45,34 C42,42 40,50 42,58" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
      <path d="M42,58 C30,60 20,62 18,72" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <path d="M42,58 C54,60 64,62 66,72" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <circle cx="75" cy="25" r="9" fill="currentColor" opacity="0.75"/>
      <path d="M75,34 C78,42 80,50 78,58" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.8"/>
      <path d="M78,58 C66,60 56,62 54,72" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
      <path d="M78,58 C90,60 100,62 102,72" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
      <path d="M54,58 Q60,50 66,58" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" opacity="0.4"/>
    </svg>
  ),
  diagonal: (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="30" r="9" fill="currentColor" opacity="0.9"/>
      <path d="M20,39 C30,50 45,60 65,65" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
      <path d="M50,60 C48,70 46,78 50,88" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <path d="M65,65 C70,72 72,80 68,88" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <circle cx="95" cy="50" r="8" fill="currentColor" opacity="0.75"/>
      <path d="M95,58 C90,66 85,74 88,85" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.8"/>
      <path d="M88,72 C80,74 74,76 76,85" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
    </svg>
  ),
  behind: (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="75" cy="20" r="9" fill="currentColor" opacity="0.9"/>
      <path d="M75,29 C72,40 70,52 72,65" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
      <path d="M72,65 C65,68 58,70 62,80" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <path d="M72,65 C80,68 86,70 82,80" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <circle cx="45" cy="25" r="8" fill="currentColor" opacity="0.75"/>
      <path d="M45,33 C42,44 40,56 42,68" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.8"/>
      <path d="M42,68 C35,71 28,73 32,82" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
      <path d="M42,68 C50,71 56,73 52,82" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
    </svg>
  ),
  side_embrace: (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="22" r="9" fill="currentColor" opacity="0.9"/>
      <path d="M35,31 C33,42 31,54 33,66" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
      <path d="M33,52 C42,55 55,56 65,52" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <path d="M33,66 C26,68 20,70 24,80" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <path d="M33,66 C41,68 47,70 43,80" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <circle cx="80" cy="18" r="8" fill="currentColor" opacity="0.75"/>
      <path d="M80,26 C78,37 76,49 78,61" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.8"/>
      <path d="M78,61 C71,63 65,65 69,75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
      <path d="M78,61 C86,63 92,65 88,75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
    </svg>
  ),
  acrobatic: (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="20" r="9" fill="currentColor" opacity="0.9"/>
      <path d="M30,29 C40,38 55,40 68,35 C80,30 90,20 95,30" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none"/>
      <path d="M95,30 C100,40 95,55 85,60" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
      <path d="M85,60 C75,65 65,70 60,80" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <circle cx="60" cy="50" r="8" fill="currentColor" opacity="0.75"/>
      <path d="M60,58 C55,65 45,72 40,82" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.8"/>
      <path d="M60,58 C65,65 72,70 75,80" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.8"/>
      <path d="M40,45 C45,38 55,35 65,40" stroke="currentColor" strokeWidth="3" strokeDasharray="3,3" opacity="0.4"/>
    </svg>
  ),
}

export default function PositionSVG({ type, className = '', size = 80 }) {
  const svg = svgMap[type] || svgMap.lying_face
  return (
    <div
      className={className}
      style={{ width: size, height: size, color: 'rgba(168,85,247,0.9)', flexShrink: 0 }}
    >
      {svg}
    </div>
  )
}
