import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { Route, TabName } from './types'
import { StoreProvider, useStore } from './store'
import { SaveSheetProvider } from './components/JudgmentCard'
import { BottomNav } from './components/BottomNav'
import { Toasts } from './components/Toasts'
import { HomeScreen } from './screens/HomeScreen'
import { SearchScreen } from './screens/SearchScreen'
import { ResearchScreen } from './screens/ResearchScreen'
import { SavedScreen, FolderScreen } from './screens/SavedScreens'
import { ProfileScreen, HistoryScreen, PrivacyScreen, DisclaimerScreen } from './screens/ProfileScreens'
import { JudgmentScreen } from './screens/JudgmentScreen'
import { VerifyCitationScreen } from './screens/VerifyCitationScreen'
import { FindAuthorityScreen } from './screens/FindAuthorityScreen'
import { DraftAnalyserScreen } from './screens/DraftAnalyserScreen'
import { SummarizerScreen } from './screens/SummarizerScreen'
import { LibraryScreen } from './screens/LibraryScreen'
import { StatuteScreen } from './screens/StatuteScreen'
import { RecentScreen } from './screens/RecentScreen'

function renderTab(tab: TabName): ReactNode {
  switch (tab) {
    case 'home':
      return <HomeScreen />
    case 'search':
      return <SearchScreen />
    case 'research':
      return <ResearchScreen />
    case 'saved':
      return <SavedScreen />
    case 'profile':
      return <ProfileScreen />
    default:
      return null
  }
}

function renderRoute(route: Route): ReactNode {
  switch (route.name) {
    case 'judgment':
      return <JudgmentScreen id={route.id} openNotes={route.openNotes} />
    case 'verify':
      return <VerifyCitationScreen />
    case 'findAuthority':
      return <FindAuthorityScreen route={route} />
    case 'analyser':
      return <DraftAnalyserScreen />
    case 'summarizer':
      return <SummarizerScreen />
    case 'library':
      return <LibraryScreen />
    case 'statute':
      return <StatuteScreen id={route.id} />
    case 'folder':
      return <FolderScreen id={route.id} />
    case 'recent':
      return <RecentScreen />
    case 'history':
      return <HistoryScreen />
    case 'privacy':
      return <PrivacyScreen />
    case 'disclaimer':
      return <DisclaimerScreen />
    default:
      return null
  }
}

/**
 * A screen slot that stays mounted (preserving all state — search results,
 * form inputs, scroll) while deeper screens are on top, and replays a subtle
 * entrance animation when revealed again.
 */
function ScreenSlot({ hidden, animClass, children }: { hidden: boolean; animClass: string; children: ReactNode }) {
  const [anim, setAnim] = useState(!hidden)
  const prevHidden = useRef(hidden)
  useEffect(() => {
    if (prevHidden.current && !hidden) {
      setAnim(false)
      const raf2 = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnim(true)),
      )
      return () => cancelAnimationFrame(raf2)
    }
    prevHidden.current = hidden
  }, [hidden])
  return (
    <div style={hidden ? { display: 'none' } : undefined} className={anim ? animClass : undefined}>
      {children}
    </div>
  )
}

function CurrentScreen() {
  const { tab, stack } = useStore()

  // Scroll memory: remember where the user was when they navigate away,
  // restore it when they come back.
  const nav = useRef({ len: 0, tab: 'home' as TabName, stackScrolls: [] as number[], tabScrolls: {} as Record<string, number> })

  useEffect(() => {
    const n = nav.current
    const tabChanged = n.tab !== tab
    if (stack.length > n.len) {
      // push
      n.stackScrolls.push(window.scrollY)
      window.scrollTo(0, 0)
    } else if (stack.length < n.len) {
      // pop, or a tab switch that cleared the stack
      if (tabChanged) {
        n.stackScrolls = []
        window.scrollTo(0, n.tabScrolls[tab] ?? 0)
      } else {
        window.scrollTo(0, n.stackScrolls.pop() ?? 0)
      }
    } else if (tabChanged) {
      // tab -> tab (no stack involved)
      n.tabScrolls[n.tab] = window.scrollY
      window.scrollTo(0, n.tabScrolls[tab] ?? 0)
    }
    n.len = stack.length
    n.tab = tab
  }, [stack.length, tab])

  return (
    <>
      <ScreenSlot key={tab} hidden={stack.length > 0} animClass="anim-soft">
        {renderTab(tab)}
      </ScreenSlot>
      {stack.map((r, i) => (
        <ScreenSlot key={`${i}-${JSON.stringify(r)}`} hidden={i !== stack.length - 1} animClass="anim-screen">
          {renderRoute(r)}
        </ScreenSlot>
      ))}
    </>
  )
}

function Shell() {
  return (
    <div className="app-frame pb-[92px]">
      <main>
        <CurrentScreen />
      </main>
      <BottomNav />
      <Toasts />
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <SaveSheetProvider>
        <Shell />
      </SaveSheetProvider>
    </StoreProvider>
  )
}
