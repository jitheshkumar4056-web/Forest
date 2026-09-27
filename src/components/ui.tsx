import React, { useEffect, useRef } from 'react'
import { ChevronLeft, X } from 'lucide-react'

/* ---------------------------------------------------------------- */
/* Badges & chips                                                    */
/* ---------------------------------------------------------------- */

export function DemoBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold-600/45 bg-gold-500/10 px-2 py-[3px] text-[9.5px] font-semibold tracking-[0.12em] text-gold-300 uppercase ${className}`}
      title="Sample content created for demonstration — not a real judgment or citation"
    >
      Demo Data
    </span>
  )
}

export function IndicatorChip({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-forest-500/40 bg-forest-900/50 px-2 py-[3px] text-[10.5px] font-medium text-forest-300">
      {label}
    </span>
  )
}

export function MetaChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-ink-600 bg-ink-750 px-2 py-[3px] text-[10.5px] font-medium text-cream-400">
      {children}
    </span>
  )
}

/* ---------------------------------------------------------------- */
/* Buttons                                                           */
/* ---------------------------------------------------------------- */

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
}

export function Button({
  variant = 'secondary',
  size = 'md',
  block = false,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const base =
    'press inline-flex items-center justify-center gap-2 rounded-xl font-medium select-none disabled:opacity-40 disabled:pointer-events-none'
  const sizes = {
    sm: 'px-3 py-[7px] text-[12.5px]',
    md: 'px-4 py-2.5 text-[13.5px]',
    lg: 'px-5 py-3 text-[15px]',
  }
  const variants = {
    primary: 'bg-forest-600 text-cream-50 hover:bg-forest-500 active:bg-forest-700 shadow-[0_1px_0_rgba(0,0,0,0.25)]',
    secondary: 'border border-ink-500 bg-ink-750 text-cream-200 hover:border-ink-500/80 hover:bg-ink-700',
    ghost: 'text-cream-300 hover:text-cream-100 hover:bg-ink-750',
    danger: 'border border-verdict-bad/40 bg-verdict-bad/10 text-verdict-bad hover:bg-verdict-bad/15',
    gold: 'border border-gold-600/50 bg-gold-500/10 text-gold-300 hover:bg-gold-500/15',
  }
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${block ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export function IconButton({
  label,
  className = '',
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      aria-label={label}
      className={`press inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-600 bg-ink-800 text-cream-400 hover:text-cream-100 hover:border-ink-500 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

/* ---------------------------------------------------------------- */
/* Layout                                                            */
/* ---------------------------------------------------------------- */

export function Card({
  className = '',
  children,
  onClick,
}: {
  className?: string
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border border-ink-600 bg-ink-800 ${onClick ? 'press cursor-pointer hover:border-ink-500' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

export function SectionHeader({
  kicker,
  title,
  action,
}: {
  kicker?: string
  title: string
  action?: { label: string; onClick: () => void }
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        {kicker && (
          <div className="mb-1 text-[10.5px] font-semibold tracking-[0.18em] text-forest-400 uppercase">
            {kicker}
          </div>
        )}
        <h2 className="font-serif text-[19px] leading-tight font-semibold text-cream-50">{title}</h2>
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="press shrink-0 rounded-full px-2 py-1 text-[12.5px] font-medium text-forest-300 hover:text-forest-200"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  right,
}: {
  title: string
  subtitle?: string
  onBack?: () => void
  right?: React.ReactNode
}) {
  return (
    <div className="sticky top-0 z-30 border-b border-ink-600/70 bg-ink-850/90 backdrop-blur-md">
      <div className="flex items-center gap-2 px-3 py-3">
        {onBack && (
          <IconButton label="Go back" onClick={onBack}>
            <ChevronLeft size={19} strokeWidth={1.75} />
          </IconButton>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-serif text-[17px] leading-tight font-semibold text-cream-50">{title}</h1>
          {subtitle && <p className="truncate text-[11.5px] text-cream-500">{subtitle}</p>}
        </div>
        {right}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Inputs                                                            */
/* ---------------------------------------------------------------- */

export function TextInput({
  className = '',
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-xl border border-ink-600 bg-ink-800 px-4 py-3 text-[14px] text-cream-100 outline-none transition-colors placeholder:text-cream-600 focus:border-forest-500/70 focus:bg-ink-750 ${className}`}
      {...rest}
    />
  )
}

export function TextArea({
  className = '',
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full resize-y rounded-xl border border-ink-600 bg-ink-800 px-4 py-3 text-[14px] leading-relaxed text-cream-100 outline-none transition-colors placeholder:text-cream-600 focus:border-forest-500/70 focus:bg-ink-750 ${className}`}
      {...rest}
    />
  )
}

/* ---------------------------------------------------------------- */
/* Bottom sheet                                                      */
/* ---------------------------------------------------------------- */

export function Sheet({
  open,
  onClose,
  title,
  subtitle,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (open) {
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[30rem] px-0 pb-[max(env(safe-area-inset-bottom),12px)]">
        <div
          ref={panelRef}
          className="anim-soft max-h-[82dvh] overflow-y-auto rounded-t-3xl border-t border-x border-ink-500 bg-ink-850 shadow-[0_-20px_60px_rgba(0,0,0,0.5)]"
        >
          <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-ink-600/70 bg-ink-850/95 px-5 pt-4 pb-3 backdrop-blur-md">
            <div>
              <h3 className="font-serif text-[17px] font-semibold text-cream-50">{title}</h3>
              {subtitle && <p className="mt-0.5 text-[12px] text-cream-500">{subtitle}</p>}
            </div>
            <IconButton label="Close" onClick={onClose} className="mt-0.5 h-8 w-8">
              <X size={16} strokeWidth={1.75} />
            </IconButton>
          </div>
          <div className="px-5 py-4">{children}</div>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Tabs                                                              */
/* ---------------------------------------------------------------- */

export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string }[]
  active: string
  onChange: (id: string) => void
}) {
  return (
    <div className="chip-rail flex gap-1 overflow-x-auto rounded-xl border border-ink-600 bg-ink-800 p-1">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`press flex-1 shrink-0 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
            active === t.id
              ? 'bg-forest-700/60 text-cream-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
              : 'text-cream-500 hover:text-cream-300'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Empty state                                                       */
/* ---------------------------------------------------------------- */

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string
  body: string
  action?: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-dashed border-ink-500 bg-ink-800/40 px-6 py-10 text-center">
      <p className="font-serif text-[16px] font-medium text-cream-200">{title}</p>
      <p className="mx-auto mt-2 max-w-[36ch] text-[13px] leading-relaxed text-cream-500">{body}</p>
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Notice banners                                                    */
/* ---------------------------------------------------------------- */

export function Notice({
  tone = 'neutral',
  children,
}: {
  tone?: 'neutral' | 'gold' | 'danger' | 'green'
  children: React.ReactNode
}) {
  const tones = {
    neutral: 'border-ink-500 bg-ink-750/60 text-cream-400',
    gold: 'border-gold-600/40 bg-gold-500/8 text-gold-200',
    danger: 'border-verdict-bad/35 bg-verdict-bad/8 text-[#d6a49c]',
    green: 'border-forest-500/40 bg-forest-900/50 text-forest-200',
  }
  return (
    <div className={`rounded-xl border px-4 py-3 text-[12.5px] leading-relaxed ${tones[tone]}`}>
      {children}
    </div>
  )
}
