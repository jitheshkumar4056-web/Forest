import { createContext, useContext, useState } from 'react'
import { Bookmark, Check, Copy, FolderPlus, Plus } from 'lucide-react'
import type { Judgment } from '../types'
import { copyText, copyToClipboard, formatDate } from '../lib/search'
import { useStore } from '../store'
import { Button, Card, DemoBadge, IndicatorChip, Sheet, TextInput } from './ui'

/* ------------------------------------------------------------------ */
/* Save-to-folder bottom sheet                                        */
/* ------------------------------------------------------------------ */

interface SaveSheetHostValue {
  openSaveSheet: (judgmentId: string) => void
}

const SaveSheetCtx = createContext<SaveSheetHostValue>({ openSaveSheet: () => {} })
export const useSaveSheetHost = () => useContext(SaveSheetCtx)

export function SaveSheetProvider({ children }: { children: React.ReactNode }) {
  const { folders, saved, toggleInFolder, createFolder, toast, push } = useStore()
  const [target, setTarget] = useState<string | null>(null)
  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)

  const open = (judgmentId: string) => {
    setTarget(judgmentId)
    setCreating(false)
    setNewName('')
  }

  const entry = target ? saved[target] : undefined
  const folderIds = entry?.folderIds ?? []

  const createAndSave = () => {
    if (!target || !newName.trim()) return
    const id = createFolder(newName.trim())
    toggleInFolder(target, id)
    toast(`Saved to “${newName.trim()}”`)
    setCreating(false)
    setNewName('')
  }

  return (
    <SaveSheetCtx.Provider value={{ openSaveSheet: open }}>
      {children}
      <Sheet
        open={target !== null}
        onClose={() => setTarget(null)}
        title="Save to Research"
        subtitle="Choose one or more folders for this authority"
      >
        <div className="flex flex-col gap-2">
          {folders.map((f) => {
            const active = folderIds.includes(f.id)
            return (
              <button
                key={f.id}
                onClick={() => {
                  toggleInFolder(target!, f.id)
                  toast(active ? `Removed from “${f.name}”` : `Saved to “${f.name}”`)
                }}
                className={`press flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left ${
                  active
                    ? 'border-forest-500/60 bg-forest-900/50'
                    : 'border-ink-600 bg-ink-800 hover:border-ink-500'
                }`}
              >
                <div className="min-w-0">
                  <p className={`truncate text-[14px] font-medium ${active ? 'text-cream-50' : 'text-cream-200'}`}>
                    {f.name}
                  </p>
                  <p className="mt-0.5 truncate text-[11.5px] text-cream-500">
                    {Object.values(saved).filter((s) => s.folderIds.includes(f.id)).length} authorities ·{' '}
                    {f.note || 'No notes yet'}
                  </p>
                </div>
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    active ? 'border-forest-400 bg-forest-500 text-ink-900' : 'border-ink-500'
                  }`}
                >
                  {active && <Check size={12} strokeWidth={3} />}
                </span>
              </button>
            )
          })}

          {creating ? (
            <div className="mt-1 rounded-xl border border-ink-600 bg-ink-800 p-3">
              <TextInput
                autoFocus
                placeholder="New folder name (e.g. Service Law)"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') createAndSave()
                }}
              />
              <div className="mt-2 flex justify-end gap-2">
                <Button size="sm" variant="ghost" onClick={() => setCreating(false)}>
                  Cancel
                </Button>
                <Button size="sm" variant="primary" disabled={!newName.trim()} onClick={createAndSave}>
                  Create & Save
                </Button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setCreating(true)}
              className="press flex items-center gap-2 rounded-xl border border-dashed border-ink-500 px-4 py-3 text-[13px] font-medium text-cream-400 hover:text-cream-200"
            >
              <FolderPlus size={15} strokeWidth={1.75} />
              Create new folder
            </button>
          )}

          {target && folderIds.length > 0 && (
            <button
              onClick={() => {
                push({ name: 'judgment', id: target, openNotes: true })
                setTarget(null)
              }}
              className="press mt-1 flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-[12.5px] text-cream-500 hover:text-cream-200"
            >
              <Plus size={13} />
              Add a note — “Why I saved this authority”
            </button>
          )}
        </div>
      </Sheet>
    </SaveSheetCtx.Provider>
  )
}

/* ------------------------------------------------------------------ */
/* Save toggle (used on cards)                                        */
/* ------------------------------------------------------------------ */

function SaveToggle({ judgmentId, small = false }: { judgmentId: string; small?: boolean }) {
  const { isSaved } = useStore()
  const { openSaveSheet } = useSaveSheetHost()
  const saved = isSaved(judgmentId)
  return (
    <button
      aria-label={saved ? 'Saved — manage folders' : 'Save to research folder'}
      onClick={(e) => {
        e.stopPropagation()
        openSaveSheet(judgmentId)
      }}
      className={`press inline-flex shrink-0 items-center gap-1.5 rounded-full border ${
        saved
          ? 'border-gold-600/50 bg-gold-500/12 text-gold-300'
          : 'border-ink-500 bg-ink-750 text-cream-500 hover:text-cream-200'
      } ${small ? 'px-2.5 py-[6px] text-[11.5px]' : 'px-3 py-[7px] text-[12px]'}`}
    >
      <Bookmark size={13} strokeWidth={1.75} fill={saved ? 'currentColor' : 'none'} />
      {saved ? 'Saved' : 'Save'}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Judgment card                                                      */
/* ------------------------------------------------------------------ */

export function JudgmentCard({
  judgment: j,
  paraLabel,
  indicators = [],
  showIssue = true,
}: {
  judgment: Judgment
  paraLabel?: string | null
  indicators?: string[]
  showIssue?: boolean
}) {
  const { push, toast } = useStore()
  return (
    <Card className="overflow-hidden" onClick={() => push({ name: 'judgment', id: j.id })}>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
              <DemoBadge />
              <span className="text-[10.5px] font-medium tracking-wide text-cream-600">{j.bench}</span>
            </div>
            <h3 className="font-serif text-[16.5px] leading-snug font-semibold text-cream-50">{j.caseName}</h3>
          </div>
        </div>

        <p className="mt-1.5 text-[12px] text-cream-500">
          {j.court} · {formatDate(j.date)}
        </p>
        <p className="law-report-cite mt-1 text-[12px] text-gold-400/90">{j.citation}</p>

        {showIssue && (
          <div className="mt-3 border-t border-ink-600/70 pt-3">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-cream-600 uppercase">Legal issue</p>
            <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-cream-300">{j.issue}</p>
          </div>
        )}

        {(paraLabel || indicators.length > 0) && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {paraLabel && (
              <span className="rounded-full border border-gold-600/40 bg-gold-500/8 px-2 py-[3px] text-[10.5px] font-medium text-gold-300">
                {paraLabel}
              </span>
            )}
            {indicators.map((i) => (
              <IndicatorChip key={i} label={i} />
            ))}
          </div>
        )}

        <div className="mt-3.5 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              push({ name: 'judgment', id: j.id })
            }}
            className="press flex-1 rounded-xl bg-forest-600 px-3 py-2 text-[12.5px] font-medium text-cream-50 hover:bg-forest-500"
          >
            Open Judgment
          </button>
          <SaveToggle judgmentId={j.id} />
          <button
            aria-label="Copy citation"
            onClick={async (e) => {
              e.stopPropagation()
              const ok = await copyToClipboard(copyText(j))
              toast(ok ? 'Citation copied to clipboard' : 'Could not copy')
            }}
            className="press inline-flex h-[34px] w-[38px] items-center justify-center rounded-xl border border-ink-500 bg-ink-750 text-cream-400 hover:text-cream-100"
          >
            <Copy size={14} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </Card>
  )
}
