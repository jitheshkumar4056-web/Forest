import { useState } from 'react'
import { BadgeCheck, FileWarning, ScanSearch, ShieldAlert } from 'lucide-react'
import type { Judgment } from '../types'
import { lookupCitation, formatDate, copyText, copyToClipboard } from '../lib/search'
import { useStore } from '../store'
import { Button, Card, DemoBadge, Notice, ScreenHeader, TextInput } from '../components/ui'

const EXAMPLE_CITATIONS = ['2023 (2) KLT 456', '2025:KER:DEMO-0214', '2024:SC:DEMO-1187', '2023:BOM:DEMO-0092']

function FoundCard({ j, matchedOn }: { j: Judgment; matchedOn: string }) {
  const { push, toast } = useStore()
  const year = j.date.slice(0, 4)
  return (
    <div className="anim-soft flex flex-col gap-4">
      <Card className="overflow-hidden p-0">
        <div className="flex items-center gap-2.5 border-b border-ink-600/70 bg-forest-900/40 px-4 py-3">
          <BadgeCheck size={18} className="shrink-0 text-verdict-good" strokeWidth={1.75} />
          <p className="font-serif text-[16px] font-semibold text-cream-50">Citation Found</p>
          <span className="ml-auto text-[16px] leading-none text-verdict-good">✓</span>
        </div>
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <DemoBadge />
            <span className="text-[11px] text-cream-600">Matched on: {matchedOn}</span>
          </div>
          <dl className="divide-y divide-ink-600/50">
            {[
              ['Case name', j.caseName],
              ['Court', j.court],
              ['Year', year],
              ['Citation', j.citation],
            ].map(([k, v]) => (
              <div key={k} className="flex items-start justify-between gap-4 py-2.5">
                <dt className="text-[12px] text-cream-500">{k}</dt>
                <dd
                  className={`text-right text-[13.5px] font-medium ${
                    k === 'Citation' ? 'law-report-cite text-gold-400' : 'text-cream-100'
                  }`}
                >
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Card>

      {/* Status */}
      <Card className="flex items-center gap-3 p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-forest-500/50 bg-forest-900/60">
          <BadgeCheck size={18} className="text-verdict-good" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold tracking-[0.14em] text-cream-600 uppercase">Citation status</p>
          <p className="mt-0.5 text-[14px] font-semibold text-cream-50">
            Verified <span className="font-normal text-cream-500">— within the demo corpus only</span>
          </p>
          <p className="mt-0.5 text-[11.5px] text-cream-500">
            This confirms a match against the sample database bundled with the prototype — not against any official
            law report.
          </p>
        </div>
      </Card>

      {/* Later treatment */}
      <div>
        <p className="mb-2 px-1 text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">Later treatment</p>
        {j.treatment.length === 0 ? (
          <Notice>No citing references recorded for this authority in the demo corpus.</Notice>
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

      <div className="flex gap-2">
        <Button
          variant="primary"
          block
          onClick={() => push({ name: 'judgment', id: j.id })}
        >
          Open Judgment
        </Button>
        <Button
          variant="secondary"
          onClick={async () => {
            const ok = await copyToClipboard(copyText(j))
            toast(ok ? 'Citation copied to clipboard' : 'Could not copy')
          }}
        >
          Copy Citation
        </Button>
      </div>
    </div>
  )
}

function NotFoundCard({ query }: { query: string }) {
  const looksLikeCitation = /\d{4}/.test(query) || /\b(klt|ker|sc|scc|ilr|mlj|air)\b/i.test(query)
  return (
    <div className="anim-soft flex flex-col gap-4">
      <Card className="p-4">
        <div className="flex items-center gap-2.5">
          <ShieldAlert size={18} className="shrink-0 text-gold-400" strokeWidth={1.75} />
          <p className="font-serif text-[16px] font-semibold text-cream-50">Citation not found</p>
        </div>
        <p className="mt-3 text-[13.5px] leading-relaxed text-cream-300">
          “{query}” was not found in the demo database bundled with this prototype.
        </p>
        <p className="mt-2 text-[12.5px] leading-relaxed text-cream-500">
          LEX Kerala cannot confirm whether this citation exists. This result is not a statement that the citation is
          wrong — only that no source is available here to verify it.
        </p>
      </Card>

      <Card className="flex items-center gap-3 p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-600/45 bg-gold-500/10">
          <FileWarning size={18} className="text-gold-400" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold tracking-[0.14em] text-cream-600 uppercase">Citation status</p>
          <p className="mt-0.5 text-[14px] font-semibold text-cream-50">
            Not verified — no source available{' '}
            {!looksLikeCitation && <span className="font-normal text-cream-500">· needs review</span>}
          </p>
          {!looksLikeCitation && (
            <p className="mt-0.5 text-[11.5px] text-cream-500">
              The reference does not follow a standard citation format — check the source before proceeding.
            </p>
          )}
        </div>
      </Card>

      <Notice tone="neutral">
        In the full product, verification would run against the High Court of Kerala website, eCourts, SCC Online,
        Manupatra and India Code, with the source and date of each match shown alongside the result.
      </Notice>
    </div>
  )
}

export function VerifyCitationScreen() {
  const { pop } = useStore()
  const [value, setValue] = useState('')
  const [result, setResult] = useState<{ query: string; found: ReturnType<typeof lookupCitation> } | null>(null)

  const verify = (q: string) => {
    const query = q.trim()
    if (!query) return
    setValue(query)
    setResult({ query, found: lookupCitation(query) })
  }

  return (
    <div>
      <ScreenHeader title="Verify Citation" subtitle="Check a citation before you rely on it" onBack={pop} />
      <div className="px-4 pt-4 pb-4">
        <Notice tone="gold">
          The prototype ships with a small, clearly-labelled demo database. A “verified” badge below means the citation
          matched that demo database — nothing more. No live law-report check is performed.
        </Notice>

        <div className="mt-4">
          <label className="mb-2 block text-[12px] font-medium text-cream-400" htmlFor="cite-input">
            Paste a citation or case reference
          </label>
          <TextInput
            id="cite-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && verify(value)}
            placeholder="e.g. 2023 (2) KLT 456"
            className="law-report-cite"
          />
          <div className="chip-rail mt-2.5 flex items-center gap-2 overflow-x-auto pb-0.5">
            <span className="shrink-0 text-[11px] text-cream-600">Try:</span>
            {EXAMPLE_CITATIONS.map((c) => (
              <button
                key={c}
                onClick={() => verify(c)}
                className="law-report-cite press shrink-0 rounded-full border border-ink-600 bg-ink-800 px-3 py-[6px] text-[11.5px] text-gold-400/90 hover:border-gold-600/50"
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <Button variant="primary" size="lg" block className="mt-4" onClick={() => verify(value)}>
          <ScanSearch size={16} strokeWidth={1.75} />
          Verify Citation
        </Button>

        <div className="mt-6">
          {result &&
            (result.found ? (
              <FoundCard j={result.found.judgment} matchedOn={result.found.matchedOn} />
            ) : (
              <NotFoundCard query={result.query} />
            ))}
        </div>

        {result?.found && (
          <p className="mt-4 text-center text-[11px] text-cream-600">
            Judgment dated {formatDate(result.found.judgment.date)} · {result.found.judgment.court}
          </p>
        )}

        <p className="mt-6 border-t border-ink-600/60 pt-4 text-[10.5px] leading-relaxed text-cream-600">
          LEX Kerala is a legal research and information tool. It does not provide legal advice. Always verify
          judgments, statutes, citations and amendments against authoritative sources before relying on them.
        </p>
      </div>
    </div>
  )
}
