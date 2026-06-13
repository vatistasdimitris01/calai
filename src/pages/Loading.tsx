import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Share2 } from 'lucide-react'

function DotSpinner() {
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-gray-200 animate-pulse-dot"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  )
}

export default function Loading() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
    const timer = setTimeout(() => navigate('/result'), 2200)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="fullscreen-page flex flex-col items-center justify-center px-6">
      {/* Top buttons */}
      <div className="fixed top-0 left-0 right-0 flex justify-between px-6 z-10" style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 12px)' }}>
        <button
          onClick={() => navigate('/camera')}
          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center tap-scale"
        >
          <ArrowLeft className="w-4 h-4 text-gray-400" />
        </button>
        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center tap-scale">
          <Share2 className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Center spinner */}
      <div className={`transition-all duration-700 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <DotSpinner />
      </div>
    </div>
  )
}
