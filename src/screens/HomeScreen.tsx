import { ChevronRight, Scale, ScanSearch, ScrollText, Search } from 'lucide-react'
import { useStore } from '../store'
import { recentKeralaJudgments } from '../data/demoData'
import { JudgmentCard } from '../components/JudgmentCard'
import { SectionHeader } from '../components/ui'

function greeting(): string {
  const h = new Date().getHours()
  if (h < 5) return 'Good night'
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function QuickAction({
  icon: Icon,
  title,
  subtitle,
  onClick,
  tone,
}: {
  icon: typeof Scale
  title: string
  subtitle: string
  onClick: () => void
  tone?: 'gold'
}) {
  return (
    <button
      onClick={onClick}
      className={`press flex flex-col items-start gap-2.5 rounded-2xl border p-4 text-left ${
        tone === 'gold'
          ? 'border-gold-600/40 bg-gold-500/6 hover:bg-gold-500/10'
          : 'border-ink-600 bg-ink-800 hover:border-ink-500'
      }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl ${
          tone === 'gold'
            ? 'border border-gold-600/40 bg-gold-500/10 text-gold-300'
            : 'border border-forest-600/50 bg-forest-900/60 text-forest-300'
        }`}
      >
        <Icon size={17} strokeWidth={1.75} />
      </span>
      <span>
        <span className="block text-[14px] font-semibold text-cream-50">{title}</span>
        <span className="mt-0.5 block text-[12px] leading-snug text-cream-500">{subtitle}</span>
      </span>
    </button>
  )
}

export function HomeScreen() {
  const { setTab, push, history, setSearchSeed } = useStore()
  const topics = history.slice(0, 6)

  const runTopicSearch = (q: string) => {
    setSearchSeed(q)
    setTab('search')
  }

  return (
    <div className="px-5 pt-6 pb-4">
      {/* Brand */}
      <div className="mb-7 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold-600/40 bg-gold-500/8">
          <Scale size={15} className="text-gold-400" strokeWidth={1.75} />
        </span>
        <div>
          <span className="font-serif text-[15px] font-semibold tracking-[0.08em] text-cream-50">LEX KERALA</span>
          <span className="block text-[10px] leading-tight text-cream-600 italic">Legal research, without the digging.</span>
        </div>
      </div>

      {/* Greeting */}
      <h1 className="font-serif text-[28px] leading-tight font-semibold text-cream-50">
        {greeting()}, <span className="text-forest-300">Advocate</span>
      </h1>
      <p className="mt-1.5 text-[13.5px] text-cream-500">What are you researching today?</p>

      {/* Search bar */}
      <button
        onClick={() => setTab('search')}
        className="press mt-5 flex w-full items-center gap-3 rounded-2xl border border-ink-600 bg-ink-800 px-4 py-3.5 text-left hover:border-forest-600/60"
      >
        <Search size={17} className="shrink-0 text-cream-500" strokeWidth={1.75} />
        <span className="truncate text-[13.5px] text-cream-600">
          Search judgments, citations, statutes or legal issues
        </span>
      </button>

      {/* Quick actions */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <QuickAction
          icon={Search}
          title="Search Cases"
          subtitle="Find relevant judgments"
          onClick={() => setTab('search')}
        />
        <QuickAction
          icon={ScanSearch}
          title="Verify Citation"
          subtitle="Check a legal citation"
          onClick={() => push({ name: 'verify' })}
          tone="gold"
        />
        <QuickAction
          icon={Scale}
          title="Find Authority"
          subtitle="Find cases supporting a proposition"
          onClick={() => push({ name: 'findAuthority' })}
        />
        <QuickAction
          icon={ScrollText}
          title="Summarize Judgment"
          subtitle="Understand a long judgment quickly"
          onClick={() => push({ name: 'summarizer' })}
        />
      </div>

      {/* Recent decisions */}
      <div className="mt-9">
        <SectionHeader
          kicker="Kerala High Court"
          title="Recent Decisions"
          action={{ label: 'View all', onClick: () => push({ name: 'recent' }) }}
        />
        <div className="flex flex-col gap-3">
          {recentKeralaJudgments.slice(0, 3).map((j) => (
            <JudgmentCard key={j.id} judgment={j} />
          ))}
        </div>
      </div>

      {/* Continue researching */}
      <div className="mt-9">
        <SectionHeader kicker="Pick up where you left off" title="Continue Researching" />
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => runTopicSearch(t)}
              className="press group inline-flex items-center gap-1.5 rounded-full border border-ink-600 bg-ink-800 px-3.5 py-2 text-[12.5px] font-medium text-cream-300 hover:border-forest-600/60 hover:text-cream-100"
            >
              {t}
              <ChevronRight size={13} className="text-cream-600 group-hover:text-forest-300" strokeWidth={1.75} />
            </button>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <footer className="mt-10 border-t border-ink-600/60 pt-5">
        <p className="text-[10.5px] leading-relaxed text-cream-600">
          LEX Kerala is a legal research and information tool. It does not provide legal advice. Always verify
          judgments, statutes, citations and amendments against authoritative sources before relying on them.
        </p>
        <p className="mt-2 text-[10.5px] leading-relaxed text-cream-700">
          Prototype notice — this build contains clearly labelled demo data only; no real judgments or citations are
          included.
        </p>
      </footer>
    </div>
  )
}
