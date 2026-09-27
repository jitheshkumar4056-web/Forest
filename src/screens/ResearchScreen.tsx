import { ChevronRight, FileSearch, Landmark, Scale, ScanSearch, ScrollText } from 'lucide-react'
import type { Route } from '../types'
import { useStore } from '../store'
import { Card, DemoBadge } from '../components/ui'

const TOOLS: { icon: typeof Scale; title: string; subtitle: string; route: Route; gold?: boolean }[] = [
  {
    icon: ScanSearch,
    title: 'Verify Citation',
    subtitle: 'Check a citation before you rely on it',
    route: { name: 'verify' },
    gold: true,
  },
  {
    icon: Scale,
    title: 'Find Authority',
    subtitle: 'Find cases supporting a proposition',
    route: { name: 'findAuthority' },
  },
  {
    icon: FileSearch,
    title: 'Analyse My Draft',
    subtitle: 'Spot statements that need authority',
    route: { name: 'analyser' },
  },
  {
    icon: ScrollText,
    title: 'Summarize Judgment',
    subtitle: 'Facts, issues, reasoning — at a glance',
    route: { name: 'summarizer' },
  },
  {
    icon: Landmark,
    title: 'Legal Library',
    subtitle: 'Browse important Indian legislation',
    route: { name: 'library' },
  },
]

export function ResearchScreen() {
  const { push } = useStore()
  return (
    <div className="px-5 pt-6 pb-4">
      <h1 className="font-serif text-[24px] font-semibold text-cream-50">Research</h1>
      <p className="mt-1 text-[13px] text-cream-500">Focused tools for focused work.</p>

      <div className="mt-5 flex flex-col gap-3">
        {TOOLS.map((t) => {
          const Icon = t.icon
          return (
            <Card key={t.title} className="p-4" onClick={() => push(t.route)}>
              <div className="flex items-center gap-3.5">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                    t.gold
                      ? 'border-gold-600/40 bg-gold-500/8 text-gold-300'
                      : 'border-forest-600/50 bg-forest-900/60 text-forest-300'
                  }`}
                >
                  <Icon size={19} strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-[16px] font-semibold text-cream-50">{t.title}</p>
                  <p className="mt-0.5 text-[12px] leading-snug text-cream-500">{t.subtitle}</p>
                </div>
                <ChevronRight size={16} className="shrink-0 text-cream-600" strokeWidth={1.75} />
              </div>
            </Card>
          )
        })}
      </div>

      <div className="mt-7">
        <div className="mb-2 flex items-center gap-2">
          <p className="text-[10.5px] font-semibold tracking-[0.16em] text-cream-600 uppercase">A note on this build</p>
          <DemoBadge />
        </div>
        <Card className="p-4">
          <p className="text-[12.5px] leading-relaxed text-cream-400">
            This prototype runs entirely offline against a small corpus of labelled sample judgments. Nothing here is a
            real judgment, citation or statutory text — every screen marks demo content clearly. In the full product,
            each result would link to its source document on the Kerala High Court website, eCourts or India Code.
          </p>
        </Card>
      </div>
    </div>
  )
}
