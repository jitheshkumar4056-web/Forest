import { ChevronRight, Gavel, HeartHandshake, Landmark, Scale, ShieldCheck } from 'lucide-react'
import { LIBRARY_NOTICE, statuteCategories, statutes } from '../data/statutes'
import { useStore } from '../store'
import { Card, Notice, ScreenHeader } from '../components/ui'

const CATEGORY_ICONS: Record<string, typeof Scale> = {
  Constitution: Landmark,
  'Criminal Law': Gavel,
  'Civil Law': Scale,
  'Family Law': HeartHandshake,
  'Special Laws': ShieldCheck,
}

export function LibraryScreen() {
  const { pop, push } = useStore()
  return (
    <div>
      <ScreenHeader title="Legal Library" subtitle="Important Indian legislation" onBack={pop} />
      <div className="px-4 pt-4 pb-4">
        <Notice tone="gold">{LIBRARY_NOTICE}</Notice>

        <div className="mt-5 flex flex-col gap-6">
          {statuteCategories.map((cat) => {
            const acts = statutes.filter((s) => s.category === cat)
            const Icon = CATEGORY_ICONS[cat] ?? Scale
            return (
              <div key={cat}>
                <div className="mb-2 flex items-center gap-2 px-1">
                  <Icon size={13} className="text-forest-400" strokeWidth={1.75} />
                  <p className="text-[10.5px] font-semibold tracking-[0.16em] text-forest-400 uppercase">{cat}</p>
                </div>
                <Card className="divide-y divide-ink-600/60 overflow-hidden">
                  {acts.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => push({ name: 'statute', id: a.id })}
                      className="press flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-ink-750"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-serif text-[14.5px] font-medium text-cream-100">{a.name}</p>
                        <p className="mt-0.5 text-[11px] text-cream-600">
                          {a.year} · {a.sections.length} indexed {a.sections.length === 1 ? 'entry' : 'entries'} · demo
                          index
                        </p>
                      </div>
                      <ChevronRight size={15} className="shrink-0 text-cream-600" strokeWidth={1.75} />
                    </button>
                  ))}
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
