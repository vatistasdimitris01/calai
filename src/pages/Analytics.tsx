import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getWeeklyProgress } from '@/lib/mockData'

function CircularProgress({ value, max, label, color }: { value: number; max: number; label: string; color: string }) {
  const pct = max > 0 ? Math.min(value / max, 1) : 0
  const r = 36
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct)
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#f3f3f3" strokeWidth="6" />
        <circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="6" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-sm font-serif italic text-[#222]">{value}{label === 'Calories' ? '' : 'g'}</span>
    </div>
  )
}

export default function Analytics() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [weeklyData, setWeeklyData] = useState<Record<string, { protein: number; carbs: number; fat: number; calories: number; meals: string[] }>>({})
  const [totals, setTotals] = useState({ protein: 0, carbs: 0, fat: 0, calories: 0 })

  useEffect(() => {
    setVisible(true)
    const data = getWeeklyProgress()
    setWeeklyData(data)
    let p = 0, c = 0, f = 0, ca = 0
    Object.values(data).forEach((d) => {
      p += d.protein; c += d.carbs; f += d.fat; ca += d.calories
    })
    setTotals({ protein: Math.round(p), carbs: Math.round(c), fat: Math.round(f), calories: Math.round(ca) })
  }, [])

  const days = Object.entries(weeklyData)

  return (
    <div className="fullscreen-page overflow-y-auto">
      <div className="px-6 pb-12 max-w-lg mx-auto" style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 20px)' }}>
        {/* Header */}
        <div className={`flex items-center gap-3 mb-8 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0 translate-y-2'}`}>
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center tap-scale flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-gray-400" />
          </button>
          <h1 className="text-xl font-serif italic text-[#222]">Weekly Analytics</h1>
        </div>

        {/* Circular progress rings */}
        <div className={`flex justify-center gap-4 mb-6 transition-all duration-700 delay-100 ${visible ? 'opacity-100' : 'opacity-0 translate-y-2'}`}>
          <CircularProgress value={totals.protein} max={150} label="Protein" color="#222" />
          <CircularProgress value={totals.carbs} max={250} label="Carbs" color="#888" />
          <CircularProgress value={totals.fat} max={80} label="Fat" color="#bbb" />
        </div>

        <div className={`flex justify-center mb-8 transition-all duration-700 delay-200 ${visible ? 'opacity-100' : 'opacity-0 translate-y-2'}`}>
          <CircularProgress value={totals.calories} max={3500} label="Calories" color="#222" />
        </div>

        {/* Daily breakdown */}
        <div className={`space-y-3 transition-all duration-700 delay-300 ${visible ? 'opacity-100' : 'opacity-0 translate-y-2'}`}>
          <p className="text-[10px] text-gray-300 uppercase tracking-widest">Daily Breakdown</p>
          {days.length === 0 ? (
            <p className="text-xs text-gray-300 italic text-center py-8">No meals logged this week</p>
          ) : (
            days.map(([day, data]) => (
              <div key={day} className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-[#222]">{day}</span>
                  <span className="text-xs text-gray-400">{data.calories} kcal</span>
                </div>
                {data.meals.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {data.meals.map((name, i) => (
                      <span key={i} className="text-[10px] text-gray-400 bg-white rounded-full px-2 py-0.5">{name}</span>
                    ))}
                  </div>
                ) : (
                  <span className="text-[10px] text-gray-300 italic">No meals logged</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
