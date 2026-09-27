/* SSR smoke-check: renders every screen to string to catch runtime crashes. */
import { renderToString } from 'react-dom/server'
import type { ReactNode } from 'react'
import { StoreContext, StoreProvider } from '../src/store'
import type { StoreValue } from '../src/store'
import { initialFolders, initialSaved, seedSearchHistory, judgments } from '../src/data/demoData'
import App from '../src/App'

const fake: StoreValue = {
  tab: 'home', stack: [], route: null,
  setTab: () => {}, push: () => {}, pop: () => {},
  folders: initialFolders,
  createFolder: () => 'x', renameFolder: () => {}, deleteFolder: () => {}, setFolderNote: () => {},
  saved: initialSaved,
  isSaved: (id) => Boolean(initialSaved[id]?.folderIds.length),
  toggleInFolder: () => {}, removeSaved: () => {}, setSavedNote: () => {},
  history: seedSearchHistory, addSearch: () => {}, clearHistory: () => {},
  searchSeed: null, setSearchSeed: () => {},
  draftText: 'The petitioner is entitled to seek anticipatory bail.', setDraftText: () => {},
  draftCitations: {}, insertCitation: () => {},
  notificationsEnabled: true, setNotificationsEnabled: () => {},
  toasts: [{ id: 1, message: 'test' }], toast: () => {},
}

const wrap = (el: ReactNode) => renderToString(<StoreContext.Provider value={fake}>{el}</StoreContext.Provider>)

import { HomeScreen } from '../src/screens/HomeScreen'
import { SearchScreen } from '../src/screens/SearchScreen'
import { ResearchScreen } from '../src/screens/ResearchScreen'
import { SavedScreen, FolderScreen } from '../src/screens/SavedScreens'
import { ProfileScreen, HistoryScreen, PrivacyScreen, DisclaimerScreen } from '../src/screens/ProfileScreens'
import { JudgmentScreen } from '../src/screens/JudgmentScreen'
import { VerifyCitationScreen } from '../src/screens/VerifyCitationScreen'
import { FindAuthorityScreen } from '../src/screens/FindAuthorityScreen'
import { DraftAnalyserScreen } from '../src/screens/DraftAnalyserScreen'
import { SummarizerScreen } from '../src/screens/SummarizerScreen'
import { LibraryScreen } from '../src/screens/LibraryScreen'
import { StatuteScreen } from '../src/screens/StatuteScreen'
import { RecentScreen } from '../src/screens/RecentScreen'
import { SaveSheetProvider } from '../src/components/JudgmentCard'

const checks: [string, ReactNode][] = [
  ['App (full shell)', <App />],
  ['Home', <HomeScreen />],
  ['Search', <SearchScreen />],
  ['Research', <ResearchScreen />],
  ['Saved', <SavedScreen />],
  ['Folder f1', <FolderScreen id="f1" />],
  ['Folder f5 (empty)', <FolderScreen id="f5" />],
  ['Profile', <ProfileScreen />],
  ['History', <HistoryScreen />],
  ['Privacy', <PrivacyScreen />],
  ['Disclaimer', <DisclaimerScreen />],
  ['Recent', <RecentScreen />],
  ['Library', <LibraryScreen />],
  ['Statute ndps', <StatuteScreen id="ndps" />],
  ['Judgment j1', <JudgmentScreen id="j1" />],
  ['Judgment j10 (notes)', <JudgmentScreen id="j10" openNotes />],
  ['Verify', <VerifyCitationScreen />],
  ['FindAuthority (draft ctx)', <FindAuthorityScreen route={{ name: 'findAuthority', proposition: 'Prolonged custody can be a relevant factor while considering bail.', draftSentence: 'It is well settled that prolonged custody of an undertrial cannot be justified.' }} />],
  ['Analyser', <DraftAnalyserScreen />],
  ['Summarizer', <SummarizerScreen />],
  ['SaveSheet provider', <SaveSheetProvider><div /></SaveSheetProvider>],
]

let fail = 0
for (const [name, el] of checks) {
  try {
    const html = wrap(el)
    if (html.length < 200 && name !== 'SaveSheet provider') throw new Error('suspiciously short output')
    console.log(` ok  ${name} (${html.length} chars)`)
  } catch (e) {
    fail++
    console.log(`FAIL ${name}: ${(e as Error).message}`)
  }
}
// every judgment + statute id renders
for (const j of judgments) {
  try { wrap(<JudgmentScreen id={j.id} />) } catch (e) { fail++; console.log(`FAIL judgment ${j.id}: ${e}`) }
}
console.log(fail === 0 ? 'ALL SCREENS RENDER' : `${fail} FAILURES`)
