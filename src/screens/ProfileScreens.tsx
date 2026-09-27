import {
  Bell, BookMarked, ChevronRight, Clock, Info, Lock, Moon, Scale, ShieldAlert,
} from 'lucide-react'
import { useStore } from '../store'
import { Card, DemoBadge, Notice, ScreenHeader } from '../components/ui'

function SettingsRow({
  icon: Icon,
  label,
  description,
  onClick,
  right,
  last,
}: {
  icon: typeof Bell
  label: string
  description?: string
  onClick?: () => void
  right?: React.ReactNode
  last?: boolean
}) {
  const inner = (
    <div className="flex w-full items-center gap-3.5 px-4 py-3.5 text-left">
      <Icon size={16} className="shrink-0 text-cream-500" strokeWidth={1.75} />
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-medium text-cream-100">{label}</p>
        {description && <p className="mt-0.5 text-[11.5px] leading-snug text-cream-600">{description}</p>}
      </div>
      {right ?? <ChevronRight size={15} className="shrink-0 text-cream-600" strokeWidth={1.75} />}
    </div>
  )
  return (
    <div className={last ? '' : 'border-b border-ink-600/60'}>
      {onClick ? (
        <button onClick={onClick} className="press hover:bg-ink-750 w-full">
          {inner}
        </button>
      ) : (
        inner
      )}
    </div>
  )
}

function Toggle({ on, onChange, disabled }: { on: boolean; onChange?: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={() => onChange?.(!on)}
      className={`relative h-[22px] w-[38px] shrink-0 rounded-full border transition-colors ${
        on ? 'border-forest-500/70 bg-forest-600' : 'border-ink-500 bg-ink-700'
      } ${disabled ? 'opacity-50' : ''}`}
    >
      <span
        className={`absolute top-[2px] h-[16px] w-[16px] rounded-full bg-cream-100 transition-all ${
          on ? 'left-[19px]' : 'left-[2px]'
        }`}
      />
    </button>
  )
}

export function ProfileScreen() {
  const { push, setTab, notificationsEnabled, setNotificationsEnabled } = useStore()

  return (
    <div className="px-5 pt-6 pb-4">
      <h1 className="font-serif text-[24px] font-semibold text-cream-50">Profile</h1>

      {/* Advocate card */}
      <Card className="mt-4 p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold-600/40 bg-gold-500/8 font-serif text-[19px] font-semibold text-gold-300">
            MK
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate font-serif text-[17px] font-semibold text-cream-50">Advocate Meera Krishnan</p>
            </div>
            <p className="mt-0.5 text-[12px] text-cream-500">Bar Council of Kerala · Enrolment KER/2018/XXXX</p>
            <p className="mt-0.5 text-[12px] text-cream-600">
              Practising since 2018 · High Court of Kerala, Ernakulam
            </p>
          </div>
        </div>
        <div className="mt-3.5 flex items-center gap-2 border-t border-ink-600/60 pt-3">
          <DemoBadge />
          <span className="text-[11px] text-cream-600">Sample profile for the prototype</span>
        </div>
      </Card>

      {/* Settings */}
      <p className="mt-7 mb-2 px-1 text-[10.5px] font-semibold tracking-[0.16em] text-forest-400 uppercase">Settings</p>
      <Card className="overflow-hidden">
        <SettingsRow
          icon={Moon}
          label="Dark mode"
          description="Always on in this prototype"
          right={<Toggle on onChange={() => {}} disabled />}
        />
        <SettingsRow
          icon={Bell}
          label="Notifications"
          description="Judgment alerts for saved searches"
          right={
            <Toggle on={notificationsEnabled} onChange={(v) => setNotificationsEnabled(v)} />
          }
        />
        <SettingsRow
          icon={Clock}
          label="Search history"
          description="Manage what LEX Kerala remembers"
          onClick={() => push({ name: 'history' })}
        />
        <SettingsRow
          icon={BookMarked}
          label="Saved research"
          description="Folders and notes"
          onClick={() => setTab('saved')}
        />
        <SettingsRow
          icon={Lock}
          label="Data & privacy"
          description="Where your research lives"
          onClick={() => push({ name: 'privacy' })}
        />
        <SettingsRow
          icon={ShieldAlert}
          label="Disclaimer"
          description="What LEX Kerala is — and is not"
          onClick={() => push({ name: 'disclaimer' })}
          last
        />
      </Card>

      {/* App identity */}
      <div className="mt-8 flex flex-col items-center gap-2 border-t border-ink-600/60 pt-6 text-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold-600/40 bg-gold-500/8">
          <Scale size={16} className="text-gold-400" strokeWidth={1.75} />
        </span>
        <p className="font-serif text-[14px] font-semibold tracking-[0.08em] text-cream-100">LEX KERALA</p>
        <p className="text-[11px] text-cream-600 italic">Legal research, without the digging.</p>
        <p className="mt-1 text-[10.5px] text-cream-700">Prototype v0.1 · demo data only</p>
      </div>

      <div className="mt-5">
        <Notice>
          LEX Kerala is a legal research and information tool. It does not provide legal advice. Always verify
          judgments, statutes, citations and amendments against authoritative sources before relying on them.
        </Notice>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

export function HistoryScreen() {
  const { pop, history, clearHistory, setSearchSeed, setTab } = useStore()
  return (
    <div>
      <ScreenHeader
        title="Search History"
        subtitle={`${history.length} ${history.length === 1 ? 'entry' : 'entries'} · stored on this device`}
        onBack={pop}
        right={
          history.length > 0 ? (
            <button
              onClick={clearHistory}
              className="press rounded-full px-3 py-1.5 text-[12px] font-medium text-verdict-bad hover:bg-verdict-bad/10"
            >
              Clear all
            </button>
          ) : undefined
        }
      />
      <div className="px-4 pt-4 pb-4">
        {history.length === 0 ? (
          <Notice>No search history. Your searches appear here as you use the app.</Notice>
        ) : (
          <Card className="divide-y divide-ink-600/60 overflow-hidden">
            {history.map((h) => (
              <button
                key={h}
                onClick={() => {
                  setSearchSeed(h)
                  setTab('search')
                }}
                className="press flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-ink-750"
              >
                <Clock size={14} className="shrink-0 text-cream-600" strokeWidth={1.75} />
                <span className="min-w-0 flex-1 truncate text-[13.5px] text-cream-200">{h}</span>
                <ChevronRight size={14} className="shrink-0 text-cream-600" strokeWidth={1.75} />
              </button>
            ))}
          </Card>
        )}
        <div className="mt-4">
          <Notice tone="gold">
            Search history never leaves your device in this prototype — there is no account, no server and no
            analytics.
          </Notice>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

export function PrivacyScreen() {
  const { pop } = useStore()
  return (
    <div>
      <ScreenHeader title="Data & Privacy" subtitle="Plain answers" onBack={pop} />
      <div className="px-4 pt-4 pb-4">
        <Card className="p-4">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">What is stored</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-cream-300">
                Your folders, saved authorities, notes, search history and drafts — nothing else.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">Where it lives</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-cream-300">
                Entirely on this device, in the app’s memory. In this prototype, data resets when the app is reloaded.
                There is no account, no server, no analytics and no tracking.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">What a full release would change</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-cream-300">
                Optional encrypted sync of your research across devices, with a clear privacy notice — client-adjacent
                data would never be used to train anything.
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-4">
          <Notice tone="gold">
            Because drafts and notes may describe live matters, LEX Kerala is built so that research content stays
            yours.
          </Notice>
        </div>

        <div className="mt-4">
          <Card className="flex items-center gap-3 p-4">
            <Info size={16} className="shrink-0 text-cream-500" strokeWidth={1.75} />
            <p className="text-[12px] leading-relaxed text-cream-400">
              Prototype build — reloading the page restores the original demo state, which also serves as “reset all
              data”.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

export function DisclaimerScreen() {
  const { pop } = useStore()
  return (
    <div>
      <ScreenHeader title="Disclaimer" subtitle="Read before relying on anything here" onBack={pop} />
      <div className="px-4 pt-4 pb-4">
        <Card className="p-4">
          <p className="font-serif text-[15px] leading-relaxed font-medium text-cream-100">
            LEX Kerala is a legal research and information tool. It does not provide legal advice. Always verify
            judgments, statutes, citations and amendments against authoritative sources before relying on them.
          </p>
        </Card>

        <div className="mt-4 flex flex-col gap-4">
          <div>
            <p className="mb-2 px-1 text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">
              Demo data in this prototype
            </p>
            <Card className="p-4">
              <p className="text-[13px] leading-relaxed text-cream-300">
                Every case, citation, paragraph and statute index in this build is sample content created for
                demonstration. Citations carry the marker “DEMO”. Nothing here is a real judgment, and no citation
                should be treated as verified. Where a screen says “Citation Found”, it means a match was found in the
                bundled demo database — nothing more.
              </p>
            </Card>
          </div>
          <div>
            <p className="mb-2 px-1 text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">
              Sources you can rely on
            </p>
            <Card className="p-4">
              <ul className="flex flex-col gap-2 text-[13px] leading-relaxed text-cream-300">
                <li>· High Court of Kerala — certified copies of judgments</li>
                <li>· Supreme Court of India and eCourts records</li>
                <li>· India Code (indiacode.nic.in) — statutory text</li>
                <li>· Official law reports (SCC, KLT and others) for citations</li>
              </ul>
            </Card>
          </div>
          <div>
            <p className="mb-2 px-1 text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">
              No advice, no liability
            </p>
            <Card className="p-4">
              <p className="text-[13px] leading-relaxed text-cream-300">
                Nothing in LEX Kerala constitutes legal advice or creates an advocate–client relationship. Summaries
                and analyses are research assistance to be checked against the original. The responsibility for
                verifying every authority remains, always, with the lawyer who relies on it.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
