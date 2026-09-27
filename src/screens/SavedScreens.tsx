import { useState } from 'react'
import { BookmarkX, ChevronRight, FolderPlus, Pencil, Trash2 } from 'lucide-react'
import { judgmentById } from '../data/demoData'
import { formatDate, relativeTime } from '../lib/search'
import { useStore } from '../store'
import { Button, Card, EmptyState, IconButton, ScreenHeader, Sheet, TextArea, TextInput } from '../components/ui'

export function SavedScreen() {
  const { folders, saved, push, createFolder, toast } = useStore()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [name, setName] = useState('')
  const [note, setNote] = useState('')

  const countIn = (folderId: string) =>
    Object.values(saved).filter((s) => s.folderIds.includes(folderId)).length

  const create = () => {
    if (!name.trim()) return
    createFolder(name.trim(), note.trim())
    toast(`Folder “${name.trim()}” created`)
    setName('')
    setNote('')
    setSheetOpen(false)
  }

  return (
    <div>
      <ScreenHeader
        title="Research Library"
        subtitle={`${folders.length} ${folders.length === 1 ? 'folder' : 'folders'} · ${Object.values(saved).filter((s) => s.folderIds.length > 0).length} saved authorities`}
        right={
          <IconButton label="Create folder" onClick={() => setSheetOpen(true)}>
            <FolderPlus size={16} strokeWidth={1.75} />
          </IconButton>
        }
      />
      <div className="px-4 pt-4 pb-4">
        {folders.length === 0 ? (
          <EmptyState
            title="No research folders yet"
            body="Folders keep authorities organised by matter — create one for each client or point of law."
            action={
              <Button variant="primary" onClick={() => setSheetOpen(true)}>
                <FolderPlus size={14} strokeWidth={1.75} />
                Create Folder
              </Button>
            }
          />
        ) : (
          <div className="flex flex-col gap-3">
            {folders.map((f) => (
              <Card key={f.id} className="p-4" onClick={() => push({ name: 'folder', id: f.id })}>
                <div className="flex items-center gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-forest-600/50 bg-forest-900/60">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8fb9a1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-[16px] font-semibold text-cream-50">{f.name}</p>
                    <p className="mt-0.5 text-[11.5px] text-cream-500">
                      {countIn(f.id)} {countIn(f.id) === 1 ? 'authority' : 'authorities'} · updated{' '}
                      {relativeTime(f.updatedAt).toLowerCase()}
                    </p>
                    {f.note && <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-cream-400">{f.note}</p>}
                  </div>
                  <ChevronRight size={16} className="shrink-0 text-cream-600" strokeWidth={1.75} />
                </div>
              </Card>
            ))}
          </div>
        )}

        <p className="mt-6 border-t border-ink-600/60 pt-4 text-[10.5px] leading-relaxed text-cream-600">
          Folders, notes and saved authorities are stored on this device only. LEX Kerala is a legal research and
          information tool — always verify authorities against authoritative sources before relying on them.
        </p>
      </div>

      <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Create Folder" subtitle="Organise research by matter or point of law">
        <div className="flex flex-col gap-3">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-cream-400">Folder name</label>
            <TextInput
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && create()}
              placeholder="e.g. Bail — NDPS"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-cream-400">Note (optional)</label>
            <TextArea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="What is this folder for?" />
          </div>
          <Button variant="primary" block disabled={!name.trim()} onClick={create}>
            Create Folder
          </Button>
        </div>
      </Sheet>
    </div>
  )
}

/* ------------------------------------------------------------------ */

export function FolderScreen({ id }: { id: string }) {
  const { folders, saved, pop, push, renameFolder, deleteFolder, setFolderNote, toggleInFolder, setSavedNote, toast, setTab } =
    useStore()
  const folder = folders.find((f) => f.id === id)
  const [renameOpen, setRenameOpen] = useState(false)
  const [noteOpen, setNoteOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [renameValue, setRenameValue] = useState('')
  const [noteValue, setNoteValue] = useState('')
  const [noteTarget, setNoteTarget] = useState<string | null>(null) // judgment id

  if (!folder) {
    return (
      <div>
        <ScreenHeader title="Folder" onBack={pop} />
        <div className="p-5">
          <EmptyState title="Folder not found" body="It may have been deleted." />
        </div>
      </div>
    )
  }

  const items = Object.entries(saved).filter(([, s]) => s.folderIds.includes(folder.id))

  return (
    <div>
      <ScreenHeader
        title={folder.name}
        subtitle={`${items.length} ${items.length === 1 ? 'authority' : 'authorities'} · updated ${relativeTime(folder.updatedAt).toLowerCase()}`}
        onBack={pop}
        right={
          <div className="flex gap-1.5">
            <IconButton
              label="Rename folder"
              onClick={() => {
                setRenameValue(folder.name)
                setRenameOpen(true)
              }}
            >
              <Pencil size={15} strokeWidth={1.75} />
            </IconButton>
            <IconButton
              label="Delete folder"
              onClick={() => setConfirmDelete(true)}
              className="border-verdict-bad/40 text-verdict-bad hover:text-[#d6a49c]"
            >
              <Trash2 size={15} strokeWidth={1.75} />
            </IconButton>
          </div>
        }
      />
      <div className="px-4 pt-4 pb-4">
        {/* Folder note */}
        <Card className="mb-4 p-4" onClick={() => {
          setNoteValue(folder.note)
          setNoteTarget(null)
          setNoteOpen(true)
        }}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-forest-400 uppercase">Folder note</p>
              <p className={`mt-1.5 text-[13px] leading-relaxed ${folder.note ? 'text-cream-300' : 'text-cream-600 italic'}`}>
                {folder.note || 'Add a note — which matter is this folder for?'}
              </p>
            </div>
            <Pencil size={13} className="mt-1 shrink-0 text-cream-600" strokeWidth={1.75} />
          </div>
        </Card>

        {/* Items */}
        {items.length === 0 ? (
          <EmptyState
            title="No authorities saved here"
            body="Search the corpus and save judgments to this folder, or open a judgment and use Save to Research."
            action={
              <Button variant="primary" onClick={() => setTab('search')}>
                Search for authorities
              </Button>
            }
          />
        ) : (
          <div className="flex flex-col gap-3">
            {items.map(([jid, entry]) => (
              <FolderItem
                key={jid}
                judgmentId={jid}
                note={entry.note}
                onOpen={() => push({ name: 'judgment', id: jid })}
                onEditNote={() => {
                  setNoteValue(entry.note)
                  setNoteTarget(jid)
                  setNoteOpen(true)
                }}
                onRemove={() => {
                  toggleInFolder(jid, folder.id)
                  toast('Removed from folder')
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Rename sheet */}
      <Sheet open={renameOpen} onClose={() => setRenameOpen(false)} title="Rename Folder">
        <div className="flex flex-col gap-3">
          <TextInput autoFocus value={renameValue} onChange={(e) => setRenameValue(e.target.value)} />
          <Button
            variant="primary"
            block
            disabled={!renameValue.trim() || renameValue.trim() === folder.name}
            onClick={() => {
              renameFolder(folder.id, renameValue.trim())
              toast('Folder renamed')
              setRenameOpen(false)
            }}
          >
            Save name
          </Button>
        </div>
      </Sheet>

      {/* Note sheet (folder note or saved-item note) */}
      <Sheet
        open={noteOpen}
        onClose={() => setNoteOpen(false)}
        title={noteTarget ? 'Why I saved this authority' : 'Folder note'}
        subtitle={noteTarget ? 'A private note, visible only to you' : folder.name}
      >
        <div className="flex flex-col gap-3">
          <TextArea
            autoFocus
            rows={4}
            value={noteValue}
            onChange={(e) => setNoteValue(e.target.value)}
            placeholder={
              noteTarget
                ? 'e.g. Para 18 summary of principles — quote in the bail application…'
                : 'Which matter or point of law is this folder for?'
            }
          />
          <Button
            variant="primary"
            block
            onClick={() => {
              if (noteTarget) setSavedNote(noteTarget, noteValue)
              else setFolderNote(folder.id, noteValue)
              toast('Note saved')
              setNoteOpen(false)
            }}
          >
            Save note
          </Button>
        </div>
      </Sheet>

      {/* Delete confirm */}
      <Sheet open={confirmDelete} onClose={() => setConfirmDelete(false)} title="Delete folder?">
        <p className="text-[13.5px] leading-relaxed text-cream-300">
          “{folder.name}” will be deleted. Saved authorities will remain in your library if they belong to other
          folders.
        </p>
        <div className="mt-4 flex gap-2">
          <Button variant="secondary" block onClick={() => setConfirmDelete(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            block
            onClick={() => {
              deleteFolder(folder.id)
              toast('Folder deleted')
              setConfirmDelete(false)
              pop()
            }}
          >
            <Trash2 size={14} strokeWidth={1.75} />
            Delete
          </Button>
        </div>
      </Sheet>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function FolderItem({
  judgmentId,
  note,
  onOpen,
  onEditNote,
  onRemove,
}: {
  judgmentId: string
  note: string
  onOpen: () => void
  onEditNote: () => void
  onRemove: () => void
}) {
  const j = judgmentById(judgmentId)
  if (!j) return null
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-2" onClick={onOpen}>
        <div className="min-w-0 cursor-pointer">
          <h3 className="font-serif text-[15.5px] leading-snug font-semibold text-cream-50">{j.caseName}</h3>
          <p className="mt-1 text-[11.5px] text-cream-500">
            {j.court} · {formatDate(j.date)}
          </p>
          <p className="law-report-cite mt-0.5 text-[11.5px] text-gold-400/90">{j.citation}</p>
        </div>
        <ChevronRight size={15} className="mt-1 shrink-0 text-cream-600" strokeWidth={1.75} />
      </div>

      <div className="mt-3 rounded-xl border border-ink-600/70 bg-ink-750/50 p-3" onClick={onEditNote}>
        <p className="text-[10px] font-semibold tracking-[0.14em] text-cream-600 uppercase">Why I saved this</p>
        <p className={`mt-1 text-[12.5px] leading-relaxed ${note ? 'text-cream-300' : 'text-cream-600 italic'}`}>
          {note || 'Add a note — why is this authority useful?'}
        </p>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={onOpen}
          className="press flex-1 rounded-xl bg-forest-600 px-3 py-2 text-[12.5px] font-medium text-cream-50 hover:bg-forest-500"
        >
          Open Judgment
        </button>
        <button
          onClick={onEditNote}
          aria-label="Edit note"
          className="press inline-flex h-[34px] w-[38px] items-center justify-center rounded-xl border border-ink-500 bg-ink-750 text-cream-400 hover:text-cream-100"
        >
          <Pencil size={14} strokeWidth={1.75} />
        </button>
        <button
          onClick={onRemove}
          aria-label="Remove from folder"
          className="press inline-flex h-[34px] w-[38px] items-center justify-center rounded-xl border border-ink-500 bg-ink-750 text-cream-400 hover:text-[#d6a49c]"
        >
          <BookmarkX size={14} strokeWidth={1.75} />
        </button>
      </div>
    </Card>
  )
}
