import { useMemo, useState } from 'react'
import { ArrowRight, Copy, FileSearch, PenLine } from 'lucide-react'
import { exampleDraft } from '../data/demoData'
import { analyseDraft, splitSentences } from '../lib/draft'
import { copyToClipboard } from '../lib/search'
import { useStore } from '../store'
import { Button, Card, Notice, ScreenHeader, TextArea } from '../components/ui'

export function DraftAnalyserScreen() {
  const { pop, push, toast, draftText, setDraftText, draftCitations } = useStore()
  const [analysed, setAnalysed] = useState(false)

  const flags = useMemo(() => analyseDraft(draftText), [draftText])
  const sentences = useMemo(() => splitSentences(draftText), [draftText])
  const flaggedSet = useMemo(() => new Set(flags.map((f) => f.sentence)), [flags])

  return (
    <div>
      <ScreenHeader title="Analyse My Draft" subtitle="Find statements that need supporting authority" onBack={pop} />
      <div className="px-4 pt-4 pb-4">
        <Notice tone="gold">
          Research assistance only. LEX Kerala does not draft or certify arguments — you must independently verify
          every authority before relying on it in court.
        </Notice>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-[12px] font-medium text-cream-400" htmlFor="draft">
              Your draft arguments
            </label>
            <button
              onClick={() => {
                setDraftText(exampleDraft)
                setAnalysed(false)
              }}
              className="press text-[11.5px] font-medium text-forest-300 hover:text-forest-200"
            >
              Use example argument
            </button>
          </div>
          <TextArea
            id="draft"
            rows={8}
            value={draftText}
            onChange={(e) => {
              setDraftText(e.target.value)
              setAnalysed(false)
            }}
            placeholder="Paste the arguments from your writ petition, bail application or written submission…"
          />
        </div>

        <Button
          variant="primary"
          size="lg"
          block
          className="mt-4"
          disabled={!draftText.trim()}
          onClick={() => setAnalysed(true)}
        >
          <FileSearch size={16} strokeWidth={1.75} />
          Analyse Draft
        </Button>

        {analysed && draftText.trim() && (
          <div className="anim-soft mt-6 flex flex-col gap-4">
            <div>
              <p className="mb-2 px-1 text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">
                Your draft, annotated
              </p>
              <Card className="p-4">
                <p className="font-serif text-[14.5px] leading-[1.85] text-cream-300">
                  {sentences.map((s, i) => {
                    const citation = draftCitations[s]
                    const flagged = flaggedSet.has(s) && !citation
                    return (
                      <span key={i}>
                        <span
                          className={
                            flagged
                              ? 'rounded-[3px] bg-gold-500/12 decoration-gold-500/60 underline decoration-wavy underline-offset-4'
                              : citation
                                ? 'text-cream-200'
                                : ''
                          }
                        >
                          {s}
                        </span>
                        {citation && (
                          <span className="mx-1 inline-flex items-baseline gap-1 rounded border border-gold-600/40 bg-gold-500/10 px-1.5 py-[1px] align-baseline">
                            <span className="law-report-cite text-[10.5px] text-gold-300">{citation}</span>
                            <span className="text-[9.5px] text-gold-500/80">✓ demo</span>
                          </span>
                        )}
                        {i < sentences.length - 1 ? ' ' : ''}
                      </span>
                    )
                  })}
                </p>
                {Object.keys(draftCitations).length > 0 && (
                  <button
                    onClick={async () => {
                      const ok = await copyToClipboard(draftText)
                      toast(ok ? 'Draft copied to clipboard' : 'Could not copy')
                    }}
                    className="press mt-3 inline-flex items-center gap-1.5 rounded-full border border-ink-500 bg-ink-750 px-3 py-1.5 text-[11.5px] font-medium text-cream-300"
                  >
                    <Copy size={12} strokeWidth={1.75} />
                    Copy draft with citations
                  </button>
                )}
              </Card>
              <p className="mt-1.5 px-1 text-[11px] text-cream-600">
                <span className="mr-1 inline-block h-2 w-2 rounded-[2px] bg-gold-500/40 align-middle" />
                highlighted — may require supporting authority
              </p>
            </div>

            <div>
              <p className="mb-2 px-1 text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">
                Potential authority needed
              </p>
              {flags.length === 0 ? (
                <Notice>
                  No statements were flagged by the lexical check. This is not a legal opinion — read the draft
                  critically before filing.
                </Notice>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {flags.map((f, i) => {
                    const done = Boolean(draftCitations[f.sentence])
                    return (
                      <Card key={i} className={`p-4 ${done ? 'border-forest-500/40' : ''}`}>
                        <div className="flex items-start gap-2">
                          <PenLine size={13} className="mt-[3px] shrink-0 text-gold-400" strokeWidth={1.75} />
                          <p className="font-serif text-[13.5px] leading-relaxed text-cream-200 italic">
                            “{f.sentence}”
                          </p>
                        </div>
                        <p className="mt-2 text-[11.5px] text-cream-500">
                          <span className="font-medium text-cream-400">{f.reason}</span> — a court would ordinarily
                          expect a supporting authority here.
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          {done ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-forest-500/50 bg-forest-900/50 px-3 py-[7px] text-[12px] font-medium text-forest-300">
                              ✓ Authority inserted — {draftCitations[f.sentence]}
                            </span>
                          ) : (
                            <button
                              onClick={() =>
                                push({
                                  name: 'findAuthority',
                                  proposition: f.sentence.replace(/\.$/, ''),
                                  draftSentence: f.sentence,
                                })
                              }
                              className="press inline-flex items-center gap-1.5 rounded-xl border border-forest-500/60 bg-forest-900/40 px-3 py-2 text-[12.5px] font-medium text-forest-200 hover:bg-forest-900/70"
                            >
                              Find supporting cases
                              <ArrowRight size={13} strokeWidth={1.75} />
                            </button>
                          )}
                        </div>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>

            <Notice>
              Flagging is lexical (pattern-based) and will miss propositions that do need authority while occasionally
              flagging ones that do not. Treat it as a checklist, not as advice.
            </Notice>
          </div>
        )}
      </div>
    </div>
  )
}
