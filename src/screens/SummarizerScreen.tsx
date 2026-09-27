import { useRef, useState } from 'react'
import { ScrollText, Upload } from 'lucide-react'
import { sampleJudgmentText, sampleSummary, summarizeText } from '../lib/summarize'
import type { JudgmentSummary } from '../lib/summarize'
import { useStore } from '../store'
import { Button, Card, Notice, ScreenHeader, TextArea } from '../components/ui'

export function SummarizerScreen() {
  const { pop, toast } = useStore()
  const [text, setText] = useState('')
  const [summary, setSummary] = useState<JudgmentSummary | null>(null)
  const [usedSample, setUsedSample] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const summarize = (source: string) => {
    const t = source.trim()
    if (!t) return
    if (t === sampleJudgmentText.trim()) {
      setSummary(sampleSummary)
      setUsedSample(true)
    } else {
      setSummary(summarizeText(t))
      setUsedSample(false)
    }
  }

  const onFile = async (file: File | undefined) => {
    if (!file) return
    if (/\.(txt|md|json|csv)$/i.test(file.name) || file.type.startsWith('text/')) {
      const content = await file.text()
      setText(content)
      setSummary(null)
      toast('File loaded — ready to summarize')
    } else {
      toast('Only plain-text files are supported — paste the text instead')
    }
  }

  return (
    <div>
      <ScreenHeader title="Summarize Judgment" subtitle="Understand a long judgment quickly" onBack={pop} />
      <div className="px-4 pt-4 pb-4">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-[12px] font-medium text-cream-400" htmlFor="judgment-text">
              Paste or upload a judgment
            </label>
            <button
              onClick={() => fileRef.current?.click()}
              className="press inline-flex items-center gap-1.5 text-[11.5px] font-medium text-forest-300 hover:text-forest-200"
            >
              <Upload size={12} strokeWidth={1.75} />
              Upload .txt
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".txt,.md,text/plain"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0])}
            />
          </div>
          <TextArea
            id="judgment-text"
            rows={7}
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              setSummary(null)
            }}
            placeholder="Paste the text of the judgment here…"
          />
          <p className="mt-1.5 text-[11px] text-cream-600">
            PDF parsing is not available in this offline prototype — copy the text out of your PDF reader and paste it
            here.
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Button
            variant="primary"
            size="lg"
            block
            disabled={!text.trim()}
            onClick={() => summarize(text)}
          >
            <ScrollText size={16} strokeWidth={1.75} />
            Summarize Judgment
          </Button>
          <Button
            variant="secondary"
            block
            onClick={() => {
              setText(sampleJudgmentText)
              setSummary(null)
              setUsedSample(false)
              toast('Sample judgment loaded')
            }}
          >
            Load sample judgment
          </Button>
        </div>

        {summary && (
          <div className="anim-soft mt-6 flex flex-col gap-4">
            <Notice tone="gold">
              <span className="font-semibold">AI-generated summary — verify against the original judgment.</span>{' '}
              {usedSample
                ? 'This summary was curated for the bundled sample judgment (demo data).'
                : 'This summary was assembled mechanically on-device from the pasted text. Read it against the original before relying on it.'}
            </Notice>

            <Card className="p-4">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-cream-600 uppercase">Document</p>
              <h2 className="mt-1 font-serif text-[19px] leading-snug font-semibold text-cream-50">
                {summary.caseName}
              </h2>
              {summary.court && <p className="mt-1 text-[12.5px] text-cream-500">{summary.court}</p>}
            </Card>

            {summary.sections.map((s) => (
              <Card key={s.heading} className="p-4">
                <p className="mb-2.5 text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">
                  {s.heading}
                </p>
                <ul className="flex flex-col gap-2">
                  {s.body.map((line, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span
                        className={`mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full ${
                          s.heading === 'Important paragraphs' ? 'bg-gold-400' : 'bg-forest-500'
                        }`}
                      />
                      <span
                        className={
                          s.heading === 'Important paragraphs'
                            ? 'text-[13px] leading-relaxed text-cream-200'
                            : 'text-[13px] leading-relaxed text-cream-300'
                        }
                      >
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}

            <p className="border-t border-ink-600/60 pt-4 text-[10.5px] leading-relaxed text-cream-600">
              LEX Kerala is a legal research and information tool. It does not provide legal advice. Always verify
              judgments, statutes, citations and amendments against authoritative sources before relying on them.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
