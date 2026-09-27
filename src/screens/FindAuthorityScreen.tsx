import { useState } from 'react'
import { Copy, ExternalLink, Quote, Scale } from 'lucide-react'
import type { Route } from '../types'
import { examplePropositions } from '../data/demoData'
import { copyText, copyToClipboard, findAuthorities, formatDate } from '../lib/search'
import { useStore } from '../store'
import { Button, Card, DemoBadge, EmptyState, IndicatorChip, Notice, ScreenHeader, TextArea } from '../components/ui'

const GROUP_LABELS: { test: (court: string) => boolean; label: string }[] = [
  { test: (c) => c === 'Supreme Court of India', label: 'Supreme Court' },
  { test: (c) => c === 'Kerala High Court', label: 'Kerala High Court' },
  { test: (c) => true, label: 'Other High Courts' },
]

export function FindAuthorityScreen({ route }: { route: Extract<Route, { name: 'findAuthority' }> }) {
  const { pop, push, toast, insertCitation } = useStore()
  const fromDraft = route.draftSentence
  const [proposition, setProposition] = useState(route.proposition ?? '')
  const [submitted, setSubmitted] = useState(route.proposition ?? '')

  const hits = submitted ? findAuthorities(submitted) : []

  const run = (p: string) => {
    const v = p.trim()
    if (!v) return
    setProposition(v)
    setSubmitted(v)
  }

  return (
    <div>
      <ScreenHeader
        title="Find Authority"
        subtitle={fromDraft ? 'Supporting a sentence from your draft' : 'Cases supporting a proposition'}
        onBack={pop}
      />
      <div className="px-4 pt-4 pb-4">
        <div>
          <label className="mb-2 block text-[12px] font-medium text-cream-400" htmlFor="proposition">
            Enter a legal proposition
          </label>
          <TextArea
            id="proposition"
            rows={3}
            value={proposition}
            onChange={(e) => setProposition(e.target.value)}
            placeholder="e.g. Prolonged custody can be a relevant factor while considering bail."
          />
          <div className="mt-2.5 flex flex-col gap-2">
            {examplePropositions.map((ex) => (
              <button
                key={ex}
                onClick={() => run(ex)}
                className="press rounded-xl border border-ink-600 bg-ink-800/70 px-4 py-2.5 text-left font-serif text-[13px] text-cream-300 italic hover:border-forest-600/60 hover:text-cream-100"
              >
                “{ex}”
              </button>
            ))}
          </div>
        </div>

        <Button variant="primary" size="lg" block className="mt-4" onClick={() => run(proposition)}>
          <Scale size={16} strokeWidth={1.75} />
          Find Supporting Authorities
        </Button>

        {submitted && (
          <div className="mt-6">
            <p className="mb-3 text-[12px] text-cream-500">
              {hits.length === 0 ? 'No' : hits.length} responding {hits.length === 1 ? 'authority' : 'authorities'} in
              the demo corpus for “{submitted}”
            </p>

            {hits.length === 0 ? (
              <EmptyState
                title="No responding authorities"
                body="No paragraph in the demo corpus responds to this proposition. In the full product this search would run across the complete Kerala High Court and Supreme Court databases."
              />
            ) : (
              <div className="flex flex-col gap-6">
                {GROUP_LABELS.map((g) => {
                  const groupHits = hits.filter((h) => g.test(h.judgment.court))
                  if (groupHits.length === 0) return null
                  return (
                    <div key={g.label}>
                      <p className="mb-2 px-1 text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">
                        {g.label}
                      </p>
                      <div className="flex flex-col gap-3">
                        {groupHits.map((h) => (
                          <Card key={h.judgment.id + h.paraNo} className="p-4">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <DemoBadge />
                              <span className="text-[10.5px] text-cream-600">{h.judgment.bench}</span>
                            </div>
                            <h3
                              className="mt-1.5 cursor-pointer font-serif text-[16px] leading-snug font-semibold text-cream-50 hover:text-cream-100"
                              onClick={() => push({ name: 'judgment', id: h.judgment.id })}
                            >
                              {h.judgment.caseName}
                            </h3>
                            <p className="mt-1 text-[12px] text-cream-500">
                              {h.judgment.court} · {formatDate(h.judgment.date)}
                            </p>
                            <p className="law-report-cite mt-1 text-[12px] text-gold-400/90">{h.judgment.citation}</p>

                            <div className="mt-3 rounded-xl border border-ink-600/80 bg-ink-850/70 p-3.5">
                              <p className="mb-1.5 flex items-center gap-1.5 text-[10.5px] font-semibold tracking-[0.1em] text-gold-400 uppercase">
                                <Quote size={11} strokeWidth={2} />
                                Relevant paragraph · Para {h.paraNo}
                              </p>
                              <p className="font-serif text-[13.5px] leading-relaxed text-cream-300 italic">
                                {h.paraText}
                              </p>
                            </div>

                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                              {h.indicators.map((i) => (
                                <IndicatorChip key={i} label={i} />
                              ))}
                            </div>

                            <div className="mt-3.5 flex flex-wrap items-center gap-2">
                              <button
                                onClick={() => push({ name: 'judgment', id: h.judgment.id })}
                                className="press inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-forest-600 px-3 py-2 text-[12.5px] font-medium text-cream-50 hover:bg-forest-500"
                              >
                                <ExternalLink size={13} strokeWidth={1.75} />
                                Open source judgment
                              </button>
                              <button
                                aria-label="Copy citation"
                                onClick={async () => {
                                  const ok = await copyToClipboard(copyText(h.judgment))
                                  toast(ok ? 'Citation copied to clipboard' : 'Could not copy')
                                }}
                                className="press inline-flex h-[34px] w-[38px] items-center justify-center rounded-xl border border-ink-500 bg-ink-750 text-cream-400 hover:text-cream-100"
                              >
                                <Copy size={14} strokeWidth={1.75} />
                              </button>
                              {fromDraft && (
                                <button
                                  onClick={() => {
                                    insertCitation(fromDraft, h.judgment.citation)
                                    toast('Citation inserted into your draft')
                                    pop()
                                  }}
                                  className="press inline-flex items-center gap-1.5 rounded-xl border border-gold-600/50 bg-gold-500/10 px-3 py-2 text-[12.5px] font-medium text-gold-300 hover:bg-gold-500/15"
                                >
                                  Insert into draft
                                </button>
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )
                })}

                <Notice>
                  Results are drawn only from the labelled demo corpus. Authorities are not ranked and no confidence
                  scores are assigned — the relevance indicators shown are computed from the text of each paragraph.
                </Notice>
              </div>
            )}
          </div>
        )}

        {fromDraft && (
          <Notice tone="gold">
            You arrived here from your draft. Pick an authority and use “Insert into draft” to attach its citation to
            the highlighted sentence.
          </Notice>
        )}
      </div>
    </div>
  )
}
