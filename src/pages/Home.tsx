import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart3 } from 'lucide-react'
import { memoryCaptions, type MemoryCard } from '@/lib/mockData'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'

function WatercolorCard({
  card,
  delay,
  onTap,
}: {
  card: MemoryCard
  delay: number
  onTap: () => void
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden bg-white animate-fade-in-up cursor-pointer tap-scale active:scale-[0.97] transition-all"
      style={{ animationDelay: `${delay}ms` }}
      onClick={onTap}
    >
      <div className="aspect-square bg-gray-50 overflow-hidden relative">
        <img src={card.imageUrl} alt={card.caption} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-xs">
          <span className="text-[10px] font-semibold text-[#222]">{card.calories}</span>
          <span className="text-[8px] text-gray-400 ml-0.5">kcal</span>
        </div>
      </div>
      <div className="px-3 py-3">
        <p className="text-xs text-[#222] leading-relaxed italic font-serif">&ldquo;{card.caption}&rdquo;</p>
      </div>
    </div>
  )
}

function FoodDrawer({ card, open, onOpenChange }: { card: MemoryCard | null; open: boolean; onOpenChange: (o: boolean) => void }) {
  if (!card) return null
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="px-6 pb-8">
        <DrawerHeader className="px-0 pt-4 pb-2">
          <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-3 shadow-sm">
            <img src={card.imageUrl} alt={card.caption} className="w-full h-full object-cover" />
          </div>
          <DrawerTitle className="text-center text-xl">{card.caption}</DrawerTitle>
        </DrawerHeader>
        <div className="text-center mb-5">
          <span className="text-3xl font-serif italic text-[#222]">{card.calories}</span>
          <span className="text-xs text-gray-400 ml-1 uppercase tracking-widest">kcal</span>
        </div>
        <div className="flex justify-center gap-6 mb-6">
          {[
            { label: 'Protein', value: card.protein, unit: 'g' },
            { label: 'Carbs', value: card.carbs, unit: 'g' },
            { label: 'Fat', value: card.fat, unit: 'g' },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <span className="text-base font-serif italic text-[#222]">{m.value}</span>
              <span className="text-xs text-gray-300 ml-0.5">{m.unit}</span>
              <p className="text-[10px] text-gray-300 uppercase tracking-widest mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-[10px] text-gray-300 uppercase tracking-widest mb-2">AI's thought process</p>
          <p className="text-xs text-gray-500 leading-relaxed">{card.aiThought}</p>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [selectedCard, setSelectedCard] = useState<MemoryCard | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => { setVisible(true) }, [])

  return (
    <div className="fullscreen-page overflow-y-auto">
      <div className="px-6 pb-28 max-w-lg mx-auto" style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 20px)' }}>
        {/* Header */}
        <div className={`flex items-start justify-between mb-10 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0 translate-y-2'}`}>
          <div>
            <p className="text-sm text-gray-300 font-serif italic mb-1">Welcome,</p>
            <h1 className="text-2xl font-serif italic text-[#222] leading-tight">Let's take some<br />pictures</h1>
          </div>
          <button
            onClick={() => navigate('/analytics')}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center tap-scale flex-shrink-0 mt-1"
          >
            <BarChart3 className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Memory Grid */}
        <div className="grid grid-cols-2 gap-4">
          {memoryCaptions.map((card, i) => (
            <WatercolorCard
              key={card.caption}
              card={card}
              delay={i * 100 + 200}
              onTap={() => {
                setSelectedCard(card)
                setDrawerOpen(true)
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Camera Button */}
      <div className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+2rem)] left-1/2 -translate-x-1/2 z-30 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
        <button
          onClick={() => navigate('/camera')}
          className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#222] text-white shadow-lg tap-scale transition-all active:scale-95"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          <span className="text-sm font-medium tracking-wide">Take a picture</span>
        </button>
      </div>

      <FoodDrawer card={selectedCard} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  )
}
