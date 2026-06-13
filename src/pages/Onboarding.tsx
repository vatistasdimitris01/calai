import { useEffect, useState } from 'react'

export default function Onboarding({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => { setTimeout(() => setVisible(true), 100) }, [])

  return (
    <div className="fullscreen-page flex flex-col items-center justify-center px-8">
      {step === 0 && (
        <div className={`flex flex-col items-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center mb-8">
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-serif italic text-[#222] text-center mb-3">Capture your meals</h1>
          <p className="text-sm text-gray-400 text-center leading-relaxed max-w-xs">Snap a photo and let AI recognize what's on your plate.</p>
        </div>
      )}

      <div className={`fixed bottom-12 transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={() => {
            if (step === 0) { setStep(1); setVisible(false); setTimeout(() => setVisible(true), 200) }
            else onFinish()
          }}
          className="px-10 py-3.5 rounded-full bg-[#222] text-white text-sm font-medium tracking-wide tap-scale transition-all"
        >
          {step === 0 ? 'Continue' : 'Get Started'}
        </button>
      </div>
    </div>
  )
}
