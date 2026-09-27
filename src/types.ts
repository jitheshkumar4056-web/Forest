export type Court = 'Supreme Court of India' | 'Kerala High Court' | 'Other High Court'

export type Bench = 'Single Judge' | 'Division Bench' | 'Full Bench'

export type LegalArea =
  | 'Criminal'
  | 'Civil'
  | 'Family'
  | 'Constitutional'
  | 'Property'
  | 'Labour'
  | 'Consumer'
  | 'Tax'
  | 'Motor Vehicles'
  | 'Other'

export interface JudgmentParagraph {
  no: number
  text: string
}

export interface KeyParagraph {
  no: number
  title: string
}

export interface Authority {
  caseName: string
  court: string
  citation: string
  context: string
  relation: 'Relied upon' | 'Distinguished' | 'Discussed' | 'Followed'
}

export interface Treatment {
  relation: 'Followed by' | 'Distinguished by' | 'Referred to by'
  caseName: string
  court: string
  citation: string
  note: string
}

export interface StatuteRef {
  name: string
  note: string
}

export interface Judgment {
  id: string
  caseName: string
  court: Court | string
  courtShort: string
  bench: Bench
  date: string // ISO
  citation: string
  citationAliases?: string[] // alternate forms accepted by the verifier
  area: LegalArea
  issue: string
  held: string
  keyParas: KeyParagraph[]
  text: JudgmentParagraph[]
  authorities: Authority[]
  treatment: Treatment[]
  statutes: StatuteRef[]
}

export interface Folder {
  id: string
  name: string
  note: string
  updatedAt: string // ISO
}

export interface SavedEntry {
  folderIds: string[]
  note: string
  savedAt: string
}

export interface StatuteSection {
  no: string
  heading: string
}

export interface Statute {
  id: string
  name: string
  shortName: string
  year: string
  category: string
  sections: StatuteSection[]
  relatedJudgmentIds: string[]
}

export interface SearchFilters {
  court: 'Any court' | 'Supreme Court of India' | 'Kerala High Court' | 'Other High Courts'
  year: 'Any year' | '2025' | '2024' | '2023'
  areas: LegalArea[]
  bench: 'Any bench' | 'Single Judge' | 'Division Bench' | 'Full Bench'
}

export type TabName = 'home' | 'search' | 'research' | 'saved' | 'profile'

export type Route =
  | { name: 'judgment'; id: string; openNotes?: boolean }
  | { name: 'verify' }
  | { name: 'findAuthority'; proposition?: string; draftSentence?: string }
  | { name: 'analyser' }
  | { name: 'summarizer' }
  | { name: 'library' }
  | { name: 'statute'; id: string }
  | { name: 'folder'; id: string }
  | { name: 'recent' }
  | { name: 'history' }
  | { name: 'privacy' }
  | { name: 'disclaimer' }
  | { name: 'settingsNotifications' }

export interface SearchResultItem {
  judgment: Judgment
  paraNo: number | null
  indicators: string[]
}
