import { useEffect, useState } from 'react'

export default function SplashLoader({ onFinish }: { onFinish: () => void }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      setTimeout(onFinish, 400)
    }, 1800)
    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-500 ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <span className="text-2xl font-serif italic text-[#222] tracking-tight">vatistasdimitris</span>
    </div>
  )
}
