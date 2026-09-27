import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { Folder, Route, SavedEntry, TabName } from './types'
import { initialFolders, initialSaved, seedSearchHistory } from './data/demoData'

interface Toast {
  id: number
  message: string
}

interface StoreValue {
  tab: TabName
  stack: Route[]
  route: Route | null // top of stack, or null => tab screen
  setTab: (t: TabName) => void
  push: (r: Route) => void
  pop: () => void

  folders: Folder[]
  createFolder: (name: string, note?: string) => string
  renameFolder: (id: string, name: string) => void
  deleteFolder: (id: string) => void
  setFolderNote: (id: string, note: string) => void

  saved: Record<string, SavedEntry>
  isSaved: (judgmentId: string) => boolean
  toggleInFolder: (judgmentId: string, folderId: string) => void
  removeSaved: (judgmentId: string) => void
  setSavedNote: (judgmentId: string, note: string) => void

  history: string[]
  addSearch: (q: string) => void
  clearHistory: () => void

  searchSeed: string | null
  setSearchSeed: (q: string | null) => void

  draftText: string
  setDraftText: (t: string) => void
  draftCitations: Record<string, string> // sentence -> inserted citation
  insertCitation: (sentence: string, citation: string) => void

  notificationsEnabled: boolean
  setNotificationsEnabled: (v: boolean) => void

  toasts: Toast[]
  toast: (message: string) => void
}

export const StoreContext = createContext<StoreValue | null>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [tab, setTabState] = useState<TabName>('home')
  const [stack, setStack] = useState<Route[]>([])
  const [folders, setFolders] = useState<Folder[]>(initialFolders)
  const [saved, setSaved] = useState<Record<string, SavedEntry>>(initialSaved)
  const [history, setHistory] = useState<string[]>(seedSearchHistory)
  const [searchSeed, setSearchSeed] = useState<string | null>(null)
  const [draftText, setDraftText] = useState('')
  const [draftCitations, setDraftCitations] = useState<Record<string, string>>({})
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [toasts, setToasts] = useState<Toast[]>([])
  const toastId = useRef(0)

  const toast = useCallback((message: string) => {
    const id = ++toastId.current
    setToasts((t) => [...t, { id, message }])
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, 2400)
  }, [])

  const setTab = useCallback((t: TabName) => {
    setTabState(t)
    setStack([])
  }, [])

  const push = useCallback((r: Route) => {
    setStack((s) => [...s, r])
  }, [])

  const pop = useCallback(() => {
    setStack((s) => s.slice(0, -1))
  }, [])

  const touchFolder = useCallback((id: string) => {
    setFolders((fs) =>
      fs.map((f) => (f.id === id ? { ...f, updatedAt: new Date().toISOString() } : f)),
    )
  }, [])

  const createFolder = useCallback(
    (name: string, note = '') => {
      const id = `f${Date.now()}`
      setFolders((fs) => [...fs, { id, name, note, updatedAt: new Date().toISOString() }])
      return id
    },
    [],
  )

  const renameFolder = useCallback((id: string, name: string) => {
    setFolders((fs) => fs.map((f) => (f.id === id ? { ...f, name, updatedAt: new Date().toISOString() } : f)))
  }, [])

  const deleteFolder = useCallback((id: string) => {
    setFolders((fs) => fs.filter((f) => f.id !== id))
    setSaved((sv) => {
      const next: Record<string, SavedEntry> = {}
      for (const [jid, entry] of Object.entries(sv)) {
        const folderIds = entry.folderIds.filter((fid) => fid !== id)
        if (folderIds.length > 0 || entry.note.trim() !== '') next[jid] = { ...entry, folderIds }
      }
      return next
    })
  }, [])

  const setFolderNote = useCallback((id: string, note: string) => {
    setFolders((fs) => fs.map((f) => (f.id === id ? { ...f, note, updatedAt: new Date().toISOString() } : f)))
  }, [])

  const isSaved = useCallback(
    (judgmentId: string) => Boolean(saved[judgmentId] && saved[judgmentId].folderIds.length > 0),
    [saved],
  )

  const toggleInFolder = useCallback(
    (judgmentId: string, folderId: string) => {
      setSaved((sv) => {
        const entry = sv[judgmentId] ?? { folderIds: [], note: '', savedAt: new Date().toISOString() }
        const has = entry.folderIds.includes(folderId)
        const folderIds = has ? entry.folderIds.filter((f) => f !== folderId) : [...entry.folderIds, folderId]
        const next = { ...sv }
        if (folderIds.length === 0 && entry.note.trim() === '') delete next[judgmentId]
        else next[judgmentId] = { ...entry, folderIds, savedAt: entry.savedAt }
        return next
      })
      touchFolder(folderId)
    },
    [touchFolder],
  )

  const removeSaved = useCallback((judgmentId: string) => {
    setSaved((sv) => {
      const next = { ...sv }
      delete next[judgmentId]
      return next
    })
  }, [])

  const setSavedNote = useCallback((judgmentId: string, note: string) => {
    setSaved((sv) => {
      const entry = sv[judgmentId] ?? { folderIds: [], note: '', savedAt: new Date().toISOString() }
      if (entry.folderIds.length === 0 && note.trim() === '') {
        const next = { ...sv }
        delete next[judgmentId]
        return next
      }
      return { ...sv, [judgmentId]: { ...entry, note } }
    })
  }, [])

  const addSearch = useCallback((q: string) => {
    const query = q.trim()
    if (!query) return
    setHistory((h) => [query, ...h.filter((x) => x.toLowerCase() !== query.toLowerCase())].slice(0, 12))
  }, [])

  const clearHistory = useCallback(() => setHistory([]), [])

  const insertCitation = useCallback((sentence: string, citation: string) => {
    setDraftCitations((c) => ({ ...c, [sentence]: citation }))
  }, [])

  const value = useMemo<StoreValue>(
    () => ({
      tab,
      stack,
      route: stack.length > 0 ? stack[stack.length - 1] : null,
      setTab,
      push,
      pop,
      folders,
      createFolder,
      renameFolder,
      deleteFolder,
      setFolderNote,
      saved,
      isSaved,
      toggleInFolder,
      removeSaved,
      setSavedNote,
      history,
      addSearch,
      clearHistory,
      searchSeed,
      setSearchSeed,
      draftText,
      setDraftText,
      draftCitations,
      insertCitation,
      notificationsEnabled,
      setNotificationsEnabled,
      toasts,
      toast,
    }),
    [
      tab, stack, setTab, push, pop, folders, createFolder, renameFolder, deleteFolder,
      setFolderNote, saved, isSaved, toggleInFolder, removeSaved, setSavedNote, history,
      addSearch, clearHistory, draftText, draftCitations, insertCitation, notificationsEnabled,
      toasts, toast,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
