import { useMemo, useState } from 'react'
import { ExternalLink, Search } from 'lucide-react'
import { LIBRARY_NOTICE, statuteById } from '../data/statutes'
import { judgmentById } from '../data/demoData'
import { useStore } from '../store'
import { Card, DemoBadge, EmptyState, Notice, ScreenHeader, TextInput } from '../components/ui'

export function StatuteScreen({ id }: { id: string }) {
  const { pop, push } = useStore()
  const statute = statuteById(id)
  const [query, setQuery] = useState('')

  const sections = useMemo(() => {
    if (!statute) return []
    const q = query.trim().toLowerCase()
    if (!q) return statute.sections
    return statute.sections.filter(
      (s) => s.no.toLowerCase().includes(q) || s.heading.toLowerCase().includes(q),
    )
  }, [statute, query])

  if (!statute) {
    return (
      <div>
        <ScreenHeader title="Statute" onBack={pop} />
        <div className="p-5">
          <EmptyState title="Not found" body="This statute is not part of the demo library." />
        </div>
      </div>
    )
  }

  const related = statute.relatedJudgmentIds.map((jid) => judgmentById(jid)).filter(Boolean)

  return (
    <div>
      <ScreenHeader title={statute.shortName} subtitle={statute.category} onBack={pop} />
      <div className="px-4 pt-4 pb-4">
        <Card className="p-4">
          <h2 className="font-serif text-[19px] leading-snug font-semibold text-cream-50">{statute.name}</h2>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-ink-600/70 pt-3">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.14em] text-cream-600 uppercase">Year</p>
              <p className="mt-0.5 text-[13px] text-cream-200">{statute.year}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.14em] text-cream-600 uppercase">Category</p>
              <p className="mt-0.5 text-[13px] text-cream-200">{statute.category}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] font-semibold tracking-[0.14em] text-cream-600 uppercase">Text source</p>
              <p className="mt-0.5 text-[12.5px] text-cream-500">
                Official text not included in this prototype — read it on India Code (indiacode.nic.in)
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-4">
          <Notice tone="gold">{LIBRARY_NOTICE}</Notice>
        </div>

        {/* Search within act */}
        <div className="relative mt-5">
          <Search size={15} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-cream-600" strokeWidth={1.75} />
          <TextInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search within the ${statute.shortName}…`}
            className="py-2.5 pl-10 text-[13px]"
          />
        </div>

        {/* Sections */}
        <div className="mt-3">
          <p className="mb-2 px-1 text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">
            Section index <span className="text-cream-600 normal-case tracking-normal">· demo extract</span>
          </p>
          {sections.length === 0 ? (
            <EmptyState title="No matching sections" body="No entries in the demo index match that search." />
          ) : (
            <Card className="divide-y divide-ink-600/60 overflow-hidden">
              {sections.map((s) => (
                <div key={s.no + s.heading} className="flex gap-3 px-4 py-3">
                  <span className="law-report-cite w-[72px] shrink-0 text-[12px] font-medium text-gold-400">
                    {s.no}
                  </span>
                  <span className="text-[13px] leading-relaxed text-cream-200">{s.heading}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 bg-ink-750/50 px-4 py-2.5">
                <DemoBadge />
                <span className="text-[11px] text-cream-600">Index truncated — remaining sections not shown</span>
              </div>
            </Card>
          )}
        </div>

        {/* Related judgments */}
        <div className="mt-6">
          <p className="mb-2 px-1 text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">
            Related judgments · from the demo corpus
          </p>
          {related.length === 0 ? (
            <Notice>No demo judgments are linked to this statute yet.</Notice>
          ) : (
            <div className="flex flex-col gap-2">
              {related.map((j) => (
                <Card key={j!.id} className="p-3.5" onClick={() => push({ name: 'judgment', id: j!.id })}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-serif text-[14.5px] leading-snug font-semibold text-cream-50">{j!.caseName}</p>
                      <p className="mt-1 text-[11.5px] text-cream-500">
                        {j!.court} · <span className="law-report-cite text-gold-400/90">{j!.citation}</span>
                      </p>
                    </div>
                    <ExternalLink size={14} className="mt-1 shrink-0 text-cream-600" strokeWidth={1.75} />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
