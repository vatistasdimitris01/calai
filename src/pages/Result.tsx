import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Share2, X } from 'lucide-react'
import { generateMealResult, type MealResult } from '@/lib/mockData'
import CalorieCard from './CalorieCard'

export default function Result() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [note, setNote] = useState('')
  const [kept, setKept] = useState(false)
  const [meal, setMeal] = useState<MealResult | null>(null)

  useEffect(() => {
    const m = generateMealResult()
    setMeal(m)
    setVisible(true)
  }, [])

  if (kept && meal) {
    return <CalorieCard meal={meal} onSave={() => navigate('/')} onNoteChange={setNote} />
  }

  return (
    <div className="fullscreen-page flex flex-col justify-between px-6 pb-12">
      {/* Top buttons */}
      <div className="relative flex justify-between mb-6" style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 12px)' }}>
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

      {/* Watercolor illustration */}
      <div className={`flex-1 flex flex-col items-center justify-center ${visible ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="w-56 h-56 rounded-3xl overflow-hidden shadow-sm mb-8 opacity-90">
          <img
            src={meal?.imageUrl || 'https://i.ibb.co/tTGYGF6C/Chat-GPT-Image-Jun-13-2026-12-38-31-AM.png'}
            alt="Captured meal"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Note input */}
        <h2 className="text-2xl font-serif italic text-[#222] text-center mb-5">Add a note on it!</h2>

        <div className="w-full max-w-xs relative">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 32))}
            placeholder="write something"
            className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-sm text-[#222] placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors bg-white"
          />
          {note.length > 0 && (
            <button
              onClick={() => setNote('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <X className="w-3 h-3 text-gray-400" />
            </button>
          )}
          <span className="absolute right-3 bottom-1/2 -translate-y-1/2 text-xs text-gray-300 pointer-events-none">
            {note.length}/32
          </span>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className={`flex flex-col gap-3 mt-8 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <button
          onClick={() => setKept(true)}
          className="w-full py-4 rounded-full bg-[#222] text-white text-sm font-medium tracking-wide tap-scale active:scale-[0.98] transition-all"
        >
          Keep it
        </button>
        <button
          onClick={() => navigate('/camera')}
          className="w-full py-4 rounded-full bg-white text-[#222] text-sm font-medium border border-gray-200 tracking-wide tap-scale active:scale-[0.98] transition-all"
        >
          Retake
        </button>
      </div>
    </div>
  )
}
