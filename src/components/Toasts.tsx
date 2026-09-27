import { CheckCircle2 } from 'lucide-react'
import { useStore } from '../store'

export function Toasts() {
  const { toasts } = useStore()
  if (toasts.length === 0) return null
  return (
    <div className="pointer-events-none fixed bottom-[104px] left-1/2 z-50 flex w-full max-w-[26rem] -translate-x-1/2 flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="anim-toast flex items-center gap-2.5 rounded-full border border-forest-500/50 bg-ink-800/95 py-2.5 pr-4 pl-3 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-md"
        >
          <CheckCircle2 size={15} className="shrink-0 text-forest-400" strokeWidth={1.75} />
          <span className="text-[12.5px] font-medium text-cream-100">{t.message}</span>
        </div>
      ))}
    </div>
  )
}
