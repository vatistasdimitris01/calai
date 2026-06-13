import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'

export default function Camera() {
  const navigate = useNavigate()
  const [flash, setFlash] = useState(false)
  const [scale, setScale] = useState(1)

  const imageUrl = 'https://i.ibb.co/tTGYGF6C/Chat-GPT-Image-Jun-13-2026-12-38-31-AM.png'

  const handleCapture = useCallback(() => {
    setScale(0.94)
    setTimeout(() => setScale(1), 120)
    setFlash(true)
    setTimeout(() => setFlash(false), 160)
    setTimeout(() => navigate('/loading'), 400)
  }, [navigate])

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden border border-white/20" style={{ height: '100dvh' }}>
      {/* Flash overlay */}
      {flash && <div className="fixed inset-0 z-30 animate-flash-overlay bg-white" />}

      {/* Single fullscreen image */}
      <img
        src={imageUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover animate-camera-bg-in"
      />

      {/* Mask — dark overlay with rounded cutout in center */}
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 animate-camera-preview-in"
        style={{
          width: '82vw',
          maxWidth: '360px',
          height: '38vh',
          borderRadius: '32px',
          boxShadow: '0 0 0 9999px rgba(0,0,0,0.48)',
        }}
      />

      {/* Close button — small, top right */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-[calc(env(safe-area-inset-top,0px)+12px)] right-3 z-20 flex items-center justify-center tap-scale"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '999px',
          background: 'rgba(255,255,255,0.22)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.18)',
        }}
      >
        <X className="text-white/80" style={{ width: '14px', height: '14px' }} />
      </button>

      {/* Instruction text */}
      <p
        className="fixed left-1/2 -translate-x-1/2 z-20 text-center font-serif italic text-white/90 animate-camera-text-in"
        style={{
          top: '18%',
          fontSize: '16px',
          lineHeight: '1.4',
          fontWeight: 400,
          letterSpacing: '0.02em',
          textShadow: '0 1px 8px rgba(0,0,0,0.3)',
        }}
      >
        Find an object to photograph
      </p>

      {/* Capture button */}
      <div
        className="fixed left-1/2 -translate-x-1/2 z-20 animate-camera-capture-in"
        style={{
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 52px)',
        }}
      >
        <button
          onClick={handleCapture}
          className="flex items-center justify-center transition-transform"
          style={{
            width: '160px',
            height: '68px',
            borderRadius: '999px',
            background: '#fff',
            boxShadow: '0 16px 40px rgba(0,0,0,0.22)',
            transform: `scale(${scale})`,
          }}
        >
          <svg
            className="text-[#222]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: '26px', height: '26px' }}
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </button>
      </div>
    </div>
  )
}
