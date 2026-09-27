import { useEffect, useRef, useState } from 'react'
import { Bookmark, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Judgment } from '../types'
import { DEMO_NOTICE, judgmentById } from '../data/demoData'
import { formatDate } from '../lib/search'
import { useStore } from '../store'
import { useSaveSheetHost } from '../components/JudgmentCard'
import { Button, Card, DemoBadge, EmptyState, IconButton, MetaChip, Notice, Tabs, TextArea } from '../components/ui'

type JudgTab = 'overview' | 'judgment' | 'citations' | 'notes'

export function JudgmentScreen({ id, openNotes }: { id: string; openNotes?: boolean }) {
  const { pop, setTab, saved, folders, toggleInFolder, setSavedNote, isSaved, toast } = useStore()
  const { openSaveSheet } = useSaveSheetHost()
  const j = judgmentById(id)

  const [activeTab, setActiveTab] = useState<JudgTab>(openNotes ? 'notes' : 'overview')
  const [activePara, setActivePara] = useState<number | null>(null)
  const [noteDraft, setNoteDraft] = useState<string | null>(null)
  const paraRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const flashTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    setActiveTab(openNotes ? 'notes' : 'overview')
    setActivePara(null)
    setNoteDraft(null)
    return () => window.clearTimeout(flashTimer.current)
  }, [id, openNotes])

  if (!j) {
    return (
      <div className="p-5">
        <EmptyState title="Judgment not found" body="This item is not part of the demo corpus." />
      </div>
    )
  }

  const entry = saved[j.id]
  const savedNote = entry?.note ?? ''
  const noteValue = noteDraft ?? savedNote

  const goToPara = (no: number) => {
    setActiveTab('judgment')
    setActivePara(null)
    window.setTimeout(() => {
      paraRefs.current[no]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setActivePara(no)
      window.clearTimeout(flashTimer.current)
      flashTimer.current = window.setTimeout(() => setActivePara(null), 3600)
    }, 60)
  }

  return (
    <div className="pb-4">
      {/* Sticky header + tabs */}
      <div className="sticky top-0 z-30 border-b border-ink-600/70 bg-ink-850/94 backdrop-blur-md">
        <div className="flex items-center gap-2 px-3 py-3">
          <IconButton label="Go back" onClick={pop}>
            <ChevronLeft size={19} strokeWidth={1.75} />
          </IconButton>
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-serif text-[16px] leading-tight font-semibold text-cream-50">{j.caseName}</h1>
            <p className="truncate text-[11px] text-cream-500">
              {j.court} · {formatDate(j.date)}
            </p>
          </div>
          <button
            aria-label={isSaved(j.id) ? 'Manage saved research' : 'Save to research'}
            onClick={() => openSaveSheet(j.id)}
            className={`press inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-[12px] font-medium ${
              isSaved(j.id)
                ? 'border-gold-600/50 bg-gold-500/12 text-gold-300'
                : 'border-ink-600 bg-ink-800 text-cream-400 hover:text-cream-100'
            }`}
          >
            <Bookmark size={13} strokeWidth={1.75} fill={isSaved(j.id) ? 'currentColor' : 'none'} />
            {isSaved(j.id) ? 'Saved' : 'Save'}
          </button>
        </div>
        <div className="px-3 pb-3">
          <Tabs
            tabs={[
              { id: 'overview', label: 'Overview' },
              { id: 'judgment', label: 'Judgment' },
              { id: 'citations', label: 'Citations' },
              { id: 'notes', label: 'Notes' },
            ]}
            active={activeTab}
            onChange={(t) => setActiveTab(t as JudgTab)}
          />
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* Case identity card */}
        <Card className="mb-4 p-4">
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            <DemoBadge />
            <MetaChip>{j.bench}</MetaChip>
            <MetaChip>{j.area}</MetaChip>
          </div>
          <h2 className="font-serif text-[20px] leading-snug font-semibold text-cream-50">{j.caseName}</h2>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-ink-600/70 pt-3">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.14em] text-cream-600 uppercase">Court</p>
              <p className="mt-0.5 text-[13px] text-cream-200">{j.court}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.14em] text-cream-600 uppercase">Date of judgment</p>
              <p className="mt-0.5 text-[13px] text-cream-200">{formatDate(j.date)}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] font-semibold tracking-[0.14em] text-cream-600 uppercase">Citation</p>
              <p className="law-report-cite mt-0.5 text-[13px] text-gold-400">{j.citation}</p>
            </div>
            {j.statutes.length > 0 && (
              <div className="col-span-2">
                <p className="text-[10px] font-semibold tracking-[0.14em] text-cream-600 uppercase">Statutes involved</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {j.statutes.map((s) => (
                    <MetaChip key={s.name}>{s.name}</MetaChip>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* ---------------- OVERVIEW ---------------- */}
        {activeTab === 'overview' && (
          <div className="anim-soft flex flex-col gap-4">
            <Card className="p-4">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">Issue</p>
              <p className="mt-1.5 text-[12px] text-cream-600 italic">What legal question was before the court?</p>
              <p className="mt-2 font-serif text-[15px] leading-relaxed text-cream-100">{j.issue}</p>
            </Card>

            <Card className="p-4">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">Held</p>
              <p className="mt-1.5 text-[12px] text-cream-600 italic">What the court decided</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-cream-200">{j.held}</p>
            </Card>

            <div>
              <p className="mb-2 px-1 text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">
                Important paragraphs
              </p>
              <Card className="divide-y divide-ink-600/60 overflow-hidden">
                {j.keyParas.map((p) => (
                  <button
                    key={p.no}
                    onClick={() => goToPara(p.no)}
                    className="press flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-ink-750"
                  >
                    <span className="law-report-cite shrink-0 text-[12px] font-medium text-gold-400">Para {p.no}</span>
                    <span className="min-w-0 flex-1 truncate text-[13.5px] text-cream-200">{p.title}</span>
                    <ChevronRight size={14} className="shrink-0 text-cream-600" strokeWidth={1.75} />
                  </button>
                ))}
              </Card>
              <p className="mt-1.5 px-1 text-[11px] text-cream-600">Tap a paragraph to read it in the judgment.</p>
            </div>

            {j.authorities.length > 0 && (
              <div>
                <p className="mb-2 px-1 text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">
                  Authorities relied upon
                </p>
                <div className="flex flex-col gap-2">
                  {j.authorities.map((a) => (
                    <Card key={a.citation} className="p-3.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-serif text-[14.5px] leading-snug font-semibold text-cream-50">{a.caseName}</p>
                        <MetaChip>{a.relation}</MetaChip>
                      </div>
                      <p className="mt-1 text-[11.5px] text-cream-500">
                        {a.court} · <span className="law-report-cite text-gold-400/90">{a.citation}</span>
                      </p>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-cream-400">{a.context}</p>
                      <DemoBadge className="mt-2" />
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <Button variant="gold" size="lg" block onClick={() => openSaveSheet(j.id)}>
              <Bookmark size={15} strokeWidth={1.75} />
              {isSaved(j.id) ? 'Manage Research Folders' : 'Save to Research'}
            </Button>
          </div>
        )}

        {/* ---------------- JUDGMENT TEXT ---------------- */}
        {activeTab === 'judgment' && (
          <div className="anim-soft">
            <Notice tone="gold">{DEMO_NOTICE}</Notice>
            <div className="mt-4 flex flex-col gap-5 pb-2">
              {j.text.map((p) => (
                <div
                  key={p.no}
                  ref={(el) => {
                    paraRefs.current[p.no] = el
                  }}
                  className={`flex gap-3 rounded-lg px-2 py-1.5 transition-colors ${
                    activePara === p.no ? 'para-flash' : ''
                  }`}
                >
                  <span className="law-report-cite w-7 shrink-0 pt-[3px] text-right text-[12px] font-medium text-gold-500/80">
                    {p.no}.
                  </span>
                  <p className="font-serif text-[15px] leading-[1.75] text-cream-200">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- CITATIONS ---------------- */}
        {activeTab === 'citations' && (
          <div className="anim-soft flex flex-col gap-5">
            <div>
              <p className="mb-2 px-1 text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">
                Authorities relied upon by this judgment
              </p>
              <div className="flex flex-col gap-2">
                {j.authorities.map((a) => (
                  <Card key={a.citation} className="p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-serif text-[14.5px] leading-snug font-semibold text-cream-50">{a.caseName}</p>
                      <MetaChip>{a.relation}</MetaChip>
                    </div>
                    <p className="mt-1 text-[11.5px] text-cream-500">
                      {a.court} · <span className="law-report-cite text-gold-400/90">{a.citation}</span>
                    </p>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-cream-400">{a.context}</p>
                    <DemoBadge className="mt-2" />
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 px-1 text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">
                How this case has been treated
              </p>
              {j.treatment.length === 0 ? (
                <EmptyState
                  title="No citing references recorded"
                  body="The demo corpus does not include judgments citing this authority. In the full product, citing references would be pulled from the citator."
                />
              ) : (
                <div className="flex flex-col gap-2">
                  {j.treatment.map((t) => (
                    <Card key={t.citation + t.relation} className="p-3.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-serif text-[14.5px] leading-snug font-semibold text-cream-50">{t.caseName}</p>
                        <span
                          className={`inline-flex shrink-0 items-center rounded-full border px-2 py-[3px] text-[10px] font-semibold tracking-wide uppercase ${
                            t.relation === 'Followed by'
                              ? 'border-forest-500/50 bg-forest-900/60 text-forest-300'
                              : t.relation === 'Distinguished by'
                                ? 'border-verdict-bad/40 bg-verdict-bad/10 text-[#d6a49c]'
                                : 'border-ink-500 bg-ink-750 text-cream-400'
                          }`}
                        >
                          {t.relation}
                        </span>
                      </div>
                      <p className="mt-1 text-[11.5px] text-cream-500">
                        {t.court} · <span className="law-report-cite text-gold-400/90">{t.citation}</span>
                      </p>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-cream-400">{t.note}</p>
                      <DemoBadge className="mt-2" />
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ---------------- NOTES ---------------- */}
        {activeTab === 'notes' && (
          <div className="anim-soft flex flex-col gap-4">
            <Card className="p-4">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">
                Why I saved this authority
              </p>
              <p className="mt-1.5 text-[12px] text-cream-600 italic">A private note — visible only to you</p>
              <TextArea
                className="mt-2.5"
                rows={4}
                value={noteValue}
                placeholder="e.g. Para 18 summary of principles — quote in the bail application listed on the 12th…"
                onChange={(e) => setNoteDraft(e.target.value)}
                onBlur={() => {
                  if (noteDraft !== null && noteDraft !== savedNote) {
                    setSavedNote(j.id, noteDraft)
                    toast('Note saved')
                  }
                }}
              />
            </Card>

            <Card className="p-4">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">Research folders</p>
              {folders.length === 0 ? (
                <p className="mt-2 text-[13px] text-cream-500">No folders yet — create one from the Saved tab.</p>
              ) : (
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {folders.map((f) => {
                    const active = entry?.folderIds.includes(f.id) ?? false
                    return (
                      <button
                        key={f.id}
                        onClick={() => {
                          toggleInFolder(j.id, f.id)
                          toast(active ? `Removed from “${f.name}”` : `Saved to “${f.name}”`)
                        }}
                        className={`press rounded-full border px-3 py-[7px] text-[12.5px] font-medium ${
                          active
                            ? 'border-forest-500/70 bg-forest-800/70 text-cream-50'
                            : 'border-ink-600 bg-ink-800 text-cream-400'
                        }`}
                      >
                        {f.name}
                      </button>
                    )
                  })}
                </div>
              )}
              <Button variant="secondary" block className="mt-4" onClick={() => setTab('saved')}>
                Manage folders
              </Button>
            </Card>

            <Notice>
              Notes are stored on your device in this prototype. They are never uploaded anywhere.
            </Notice>
          </div>
        )}
      </div>
    </div>
  )
}
