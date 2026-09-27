import { useEffect, useMemo, useRef, useState } from 'react'
import { Clock, Search, SlidersHorizontal, X } from 'lucide-react'
import type { LegalArea, SearchFilters } from '../types'
import { exampleSearches } from '../data/demoData'
import { judgments as corpus } from '../data/demoData'
import { searchJudgments } from '../lib/search'
import { useStore } from '../store'
import { JudgmentCard } from '../components/JudgmentCard'
import { Button, EmptyState, MetaChip, Sheet, TextInput } from '../components/ui'

const AREAS: LegalArea[] = [
  'Criminal', 'Civil', 'Family', 'Constitutional', 'Property',
  'Labour', 'Consumer', 'Tax', 'Motor Vehicles', 'Other',
]

const DEFAULT_FILTERS: SearchFilters = {
  court: 'Any court',
  year: 'Any year',
  areas: [],
  bench: 'Any bench',
}

function FilterOption({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`press rounded-full border px-3.5 py-[7px] text-[12.5px] font-medium ${
        active
          ? 'border-forest-500/70 bg-forest-800/70 text-cream-50'
          : 'border-ink-600 bg-ink-800 text-cream-400 hover:text-cream-200'
      }`}
    >
      {label}
    </button>
  )
}

export function SearchScreen() {
  const { history, addSearch, clearHistory, searchSeed, setSearchSeed } = useStore()
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState('')
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS)
  const [sheetOpen, setSheetOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchSeed !== null) {
      setQuery(searchSeed)
      setSubmitted(searchSeed)
      addSearch(searchSeed)
      setSearchSeed(null)
      window.scrollTo(0, 0)
    }
  }, [searchSeed, addSearch, setSearchSeed])

  const runSearch = (q: string) => {
    setQuery(q)
    setSubmitted(q)
    if (q.trim()) addSearch(q)
  }

  const results = useMemo(
    () => searchJudgments(submitted, filters, corpus),
    [submitted, filters],
  )

  const activeFilterChips: { label: string; clear: () => void }[] = []
  if (filters.court !== 'Any court')
    activeFilterChips.push({ label: filters.court, clear: () => setFilters((f) => ({ ...f, court: 'Any court' })) })
  if (filters.year !== 'Any year')
    activeFilterChips.push({ label: filters.year, clear: () => setFilters((f) => ({ ...f, year: 'Any year' })) })
  if (filters.bench !== 'Any bench')
    activeFilterChips.push({ label: filters.bench, clear: () => setFilters((f) => ({ ...f, bench: 'Any bench' })) })
  for (const a of filters.areas)
    activeFilterChips.push({
      label: a,
      clear: () => setFilters((f) => ({ ...f, areas: f.areas.filter((x) => x !== a) })),
    })

  const filterCount =
    (filters.court !== 'Any court' ? 1 : 0) +
    (filters.year !== 'Any year' ? 1 : 0) +
    (filters.bench !== 'Any bench' ? 1 : 0) +
    filters.areas.length

  return (
    <div className="pb-4">
      {/* Search head */}
      <div className="sticky top-0 z-30 border-b border-ink-600/70 bg-ink-850/92 px-5 pt-5 pb-3 backdrop-blur-md">
        <h1 className="font-serif text-[22px] font-semibold text-cream-50">Search</h1>
        <p className="mt-0.5 text-[12px] text-cream-500">Cases · Citations · Statutes · Legal issues</p>

        <form
          className="relative mt-3"
          onSubmit={(e) => {
            e.preventDefault()
            runSearch(query)
            inputRef.current?.blur()
          }}
        >
          <Search size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-cream-600" strokeWidth={1.75} />
          <input
            ref={inputRef}
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by case, citation, statute or legal issue…"
            className="w-full rounded-2xl border border-ink-600 bg-ink-800 py-3 pr-10 pl-10 text-[13.5px] text-cream-100 outline-none transition-colors placeholder:text-cream-600 focus:border-forest-500/70"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear"
              onClick={() => {
                setQuery('')
                setSubmitted('')
              }}
              className="press absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-cream-600 hover:text-cream-300"
            >
              <X size={14} strokeWidth={1.75} />
            </button>
          )}
        </form>

        <div className="chip-rail mt-2.5 flex items-center gap-2 overflow-x-auto pb-0.5">
          <button
            onClick={() => setSheetOpen(true)}
            className={`press inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-[6px] text-[12px] font-medium ${
              filterCount > 0
                ? 'border-forest-500/70 bg-forest-800/70 text-cream-50'
                : 'border-ink-600 bg-ink-800 text-cream-400'
            }`}
          >
            <SlidersHorizontal size={12.5} strokeWidth={1.75} />
            Filters{filterCount > 0 ? ` · ${filterCount}` : ''}
          </button>
          {activeFilterChips.map((c) => (
            <button
              key={c.label}
              onClick={c.clear}
              className="press inline-flex shrink-0 items-center gap-1 rounded-full border border-ink-600 bg-ink-750 px-2.5 py-[6px] text-[11.5px] text-cream-300"
            >
              {c.label}
              <X size={11} strokeWidth={1.75} className="text-cream-600" />
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-4">
        {/* Natural-language examples */}
        {!submitted && (
          <div className="mb-5">
            <p className="text-[10.5px] font-semibold tracking-[0.16em] text-cream-600 uppercase">
              Try a natural-language search
            </p>
            <div className="mt-2 flex flex-col gap-2">
              {exampleSearches.map((ex) => (
                <button
                  key={ex}
                  onClick={() => runSearch(ex)}
                  className="press rounded-xl border border-ink-600 bg-ink-800/70 px-4 py-2.5 text-left font-serif text-[13.5px] text-cream-300 italic hover:border-forest-600/60 hover:text-cream-100"
                >
                  “{ex}”
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recent searches */}
        {!submitted && history.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-between">
              <p className="text-[10.5px] font-semibold tracking-[0.16em] text-cream-600 uppercase">Recent searches</p>
              <button onClick={clearHistory} className="press text-[11.5px] font-medium text-cream-600 hover:text-cream-300">
                Clear
              </button>
            </div>
            <div className="chip-rail mt-2 flex gap-2 overflow-x-auto pb-0.5">
              {history.map((h) => (
                <button
                  key={h}
                  onClick={() => runSearch(h)}
                  className="press inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink-600 bg-ink-800 px-3 py-[6px] text-[12px] text-cream-300 hover:text-cream-100"
                >
                  <Clock size={11.5} className="text-cream-600" strokeWidth={1.75} />
                  {h}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {submitted ? (
          <>
            <p className="mb-3 text-[12px] text-cream-500">
              <span className="font-medium text-cream-200">{results.length}</span>{' '}
              {results.length === 1 ? 'result' : 'results'} for “{submitted}” · from {corpus.length} sample judgments
              in the demo corpus
            </p>
            {results.length === 0 ? (
              <EmptyState
                title="No matching judgments"
                body="The demo corpus contains only a small set of labelled sample judgments. In the full product this search would run across the Kerala High Court and Supreme Court databases."
              />
            ) : (
              <div className="flex flex-col gap-3">
                {results.map((r) => (
                  <JudgmentCard
                    key={r.judgment.id}
                    judgment={r.judgment}
                    paraLabel={r.paraNo !== null ? `Relevant paragraph: Para ${r.paraNo}` : null}
                    indicators={r.indicators}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <p className="mb-3 text-[10.5px] font-semibold tracking-[0.16em] text-cream-600 uppercase">
              Browse · latest in the demo corpus
            </p>
            <div className="flex flex-col gap-3">
              {results.map((r) => (
                <JudgmentCard key={r.judgment.id} judgment={r.judgment} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Filter sheet */}
      <Sheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Filters"
        subtitle="Narrow the demo corpus"
      >
        <div className="flex flex-col gap-5">
          <div>
            <p className="mb-2 text-[10.5px] font-semibold tracking-[0.16em] text-cream-600 uppercase">Court</p>
            <div className="flex flex-wrap gap-2">
              {(['Any court', 'Supreme Court of India', 'Kerala High Court', 'Other High Courts'] as const).map((c) => (
                <FilterOption key={c} label={c} active={filters.court === c} onClick={() => setFilters((f) => ({ ...f, court: c }))} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-[10.5px] font-semibold tracking-[0.16em] text-cream-600 uppercase">Year</p>
            <div className="flex flex-wrap gap-2">
              {(['Any year', '2025', '2024', '2023'] as const).map((y) => (
                <FilterOption key={y} label={y} active={filters.year === y} onClick={() => setFilters((f) => ({ ...f, year: y }))} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-[10.5px] font-semibold tracking-[0.16em] text-cream-600 uppercase">Bench</p>
            <div className="flex flex-wrap gap-2">
              {(['Any bench', 'Single Judge', 'Division Bench', 'Full Bench'] as const).map((b) => (
                <FilterOption key={b} label={b} active={filters.bench === b} onClick={() => setFilters((f) => ({ ...f, bench: b }))} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-[10.5px] font-semibold tracking-[0.16em] text-cream-600 uppercase">Legal area</p>
            <div className="flex flex-wrap gap-2">
              {AREAS.map((a) => (
                <FilterOption
                  key={a}
                  label={a}
                  active={filters.areas.includes(a)}
                  onClick={() =>
                    setFilters((f) => ({
                      ...f,
                      areas: f.areas.includes(a) ? f.areas.filter((x) => x !== a) : [...f.areas, a],
                    }))
                  }
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" block onClick={() => setFilters(DEFAULT_FILTERS)}>
              Clear all
            </Button>
            <Button variant="primary" block onClick={() => setSheetOpen(false)}>
              Show results
            </Button>
          </div>
        </div>
      </Sheet>
    </div>
  )
}
