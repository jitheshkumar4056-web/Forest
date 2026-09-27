import { BookOpen, Bookmark, Home, Search, User } from 'lucide-react'
import type { TabName } from '../types'
import { useStore } from '../store'

const TABS: { id: TabName; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'research', label: 'Research', icon: BookOpen },
  { id: 'saved', label: 'Saved', icon: Bookmark },
  { id: 'profile', label: 'Profile', icon: User },
]

export function BottomNav() {
  const { tab, setTab, stack, pop } = useStore()
  const inStack = stack.length > 0

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[30rem] -translate-x-1/2 border-t border-ink-600/80 bg-ink-850/92 backdrop-blur-lg"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 6px)' }}
    >
      {inStack && (
        <button
          onClick={pop}
          className="mx-auto mt-1.5 mb-0.5 flex items-center gap-1 rounded-full border border-ink-500 bg-ink-800 px-3 py-1 text-[10.5px] font-medium text-cream-400"
        >
          Back to {TABS.find((t) => t.id === tab)?.label}
        </button>
      )}
      <div className="flex items-stretch justify-around px-2 pt-1.5 pb-1">
        {TABS.map((t) => {
          const Icon = t.icon
          const active = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              aria-current={active ? 'page' : undefined}
              className="press relative flex min-w-0 flex-1 flex-col items-center gap-1 rounded-lg py-1.5"
            >
              <span
                className={`relative flex h-7 w-14 items-center justify-center rounded-full transition-colors ${
                  active ? 'bg-forest-800/70' : ''
                }`}
              >
                <Icon
                  size={19}
                  strokeWidth={active ? 2 : 1.75}
                  className={active ? 'text-forest-200' : 'text-cream-600'}
                />
                {active && (
                  <span className="absolute -bottom-[7px] h-[3px] w-[3px] rounded-full bg-gold-400" />
                )}
              </span>
              <span
                className={`text-[10px] font-medium tracking-wide ${
                  active ? 'text-cream-100' : 'text-cream-600'
                }`}
              >
                {t.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
