import { useState, useEffect } from 'react'
import { ArrowLeft, Share2 } from 'lucide-react'
import { type MealResult, saveMeal } from '@/lib/mockData'

export default function CalorieCard({
  meal,
  onSave,
  onNoteChange,
}: {
  meal: MealResult
  onSave: () => void
  onNoteChange: (note: string) => void
}) {
  const [visible, setVisible] = useState(false)
  const [note, setNote] = useState(meal.note)

  useEffect(() => { setVisible(true) }, [])

  return (
    <div className="fullscreen-page flex flex-col px-6 pb-12">
      {/* Top buttons */}
      <div className="relative flex justify-between mb-4" style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 12px)' }}>
        <button
          onClick={onSave}
          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center tap-scale"
        >
          <ArrowLeft className="w-4 h-4 text-gray-400" />
        </button>
        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center tap-scale">
          <Share2 className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className={`flex-1 flex flex-col ${visible ? 'animate-fade-in' : 'opacity-0'}`}>
        {/* Food image */}
        <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-sm mx-auto mb-6">
          <img src={meal.imageUrl} alt={meal.name} className="w-full h-full object-cover" />
        </div>

        {/* Name + note */}
        <h2 className="text-xl font-serif italic text-[#222] text-center mb-1">{meal.name}</h2>
        <div className="max-w-xs mx-auto w-full mb-8 relative">
          <input
            type="text"
            value={note}
            onChange={(e) => {
              const v = e.target.value.slice(0, 32)
              setNote(v)
              onNoteChange(v)
            }}
            placeholder="write something"
            className="w-full text-center px-4 py-2 rounded-xl border border-gray-100 text-sm text-[#222] placeholder:text-gray-300 focus:outline-none focus:border-gray-200 transition-colors bg-white"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-200 pointer-events-none">{note.length}/32</span>
        </div>

        {/* Calorie circle */}
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 rounded-full bg-gray-50 flex flex-col items-center justify-center">
            <span className="text-3xl font-serif italic text-[#222]">{meal.calories}</span>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">kcal</span>
          </div>
        </div>

        {/* Macros */}
        <div className="flex justify-center gap-8 mb-8">
          {[
            { label: 'Protein', value: meal.protein, unit: 'g' },
            { label: 'Carbs', value: meal.carbs, unit: 'g' },
            { label: 'Fat', value: meal.fat, unit: 'g' },
          ].map((macro) => (
            <div key={macro.label} className="text-center">
              <span className="text-lg font-serif italic text-[#222]">{macro.value}</span>
              <span className="text-xs text-gray-300 ml-0.5">{macro.unit}</span>
              <p className="text-[10px] text-gray-300 uppercase tracking-widest mt-0.5">{macro.label}</p>
            </div>
          ))}
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <p className="text-[10px] text-gray-300 uppercase tracking-widest mb-2 text-center">Ingredients</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {meal.ingredients.map((ing) => (
              <span key={ing} className="text-[11px] text-gray-500 bg-gray-50 px-3 py-1 rounded-full">{ing}</span>
            ))}
          </div>
        </div>

        {/* Confidence */}
        <div className="text-center mb-8">
          <span className="text-xs text-gray-300 font-medium">{meal.confidence}% confidence</span>
        </div>
      </div>

      {/* Save button */}
      <button
        onClick={() => {
          meal.note = note
          saveMeal(meal)
          onSave()
        }}
        className="w-full py-4 rounded-full bg-[#222] text-white text-sm font-medium tracking-wide tap-scale active:scale-[0.98] transition-all"
      >
        Save meal
      </button>
    </div>
  )
}
