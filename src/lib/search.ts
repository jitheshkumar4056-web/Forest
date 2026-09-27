import type { Judgment, SearchFilters, SearchResultItem } from '../types'
import { judgments as allJudgments } from '../data/demoData'

const STOPWORDS = new Set(
  `a an the and or of in on for to be is are was were can could shall should may might will would do does did not no with without by at as from into upon about whether what which who whom whose that this these those it its his her their our your my he she they we you i there here when where how why has have had having been being also more most such other than then them thus so if while during before after between against because over under again further once all any both each few nor only own same too very s vs v`.split(
    /\s+/,
  ),
)

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
}

/**
 * Words that appear in almost every judgment; on their own they say nothing
 * about whether an authority actually responds to a proposition.
 */
const COMMON_TOKENS = new Set(
  `court case cases matter application appeal petitioner respondent applicant complainant state judgment order orders proceedings relevant relevance factor factors considering consideration considered facts fact present pressing said would could should must may might shall will within upon whether where when while during before after further against because between both each other same such very more most than then thus also just only own too court courts judge bench division single full high supreme kerala india act section sections clause article party parties counsel public prosecutor learned`.split(
    /\s+/,
  ),
)

const isDistinctive = (t: string) => !COMMON_TOKENS.has(t)

export function bigrams(tokens: string[]): string[] {
  const out: string[] = []
  for (let i = 0; i < tokens.length - 1; i++) out.push(tokens[i] + ' ' + tokens[i + 1])
  return out
}

/** Find the paragraph most relevant to the given tokens. */
function bestParagraph(j: Judgment, tokens: string[]): { no: number | null; score: number; exact: boolean } {
  let bestNo: number | null = null
  let bestScore = 0
  let exact = false
  for (const p of j.text) {
    const paraTokens = new Set(tokenize(p.text))
    let score = 0
    for (const t of tokens) if (paraTokens.has(t)) score++
    if (score > bestScore) {
      bestScore = score
      bestNo = p.no
      const paraText = p.text.toLowerCase()
      const grams = bigrams(tokens)
      exact = grams.some((g) => paraText.includes(g))
    }
  }
  return { no: bestNo, score: bestScore, exact }
}

export function matchesFilters(j: Judgment, f: SearchFilters): boolean {
  if (f.court === 'Supreme Court of India' && j.court !== 'Supreme Court of India') return false
  if (f.court === 'Kerala High Court' && j.court !== 'Kerala High Court') return false
  if (f.court === 'Other High Courts' && !(j.court !== 'Supreme Court of India' && j.court !== 'Kerala High Court'))
    return false
  if (f.year !== 'Any year' && !j.date.startsWith(f.year)) return false
  if (f.areas.length > 0 && !f.areas.includes(j.area)) return false
  if (f.bench !== 'Any bench' && j.bench !== f.bench) return false
  return true
}

/**
 * Full-text search over the demo corpus. Results are ordered by simple term
 * coverage (no scores are shown to the user — only factual indicators).
 */
export function searchJudgments(
  query: string,
  filters: SearchFilters,
  corpus: Judgment[] = allJudgments,
): SearchResultItem[] {
  const tokens = tokenize(query)
  const results: SearchResultItem[] = []

  for (const j of corpus) {
    if (!matchesFilters(j, filters)) continue
    if (tokens.length === 0) {
      results.push({ judgment: j, paraNo: j.keyParas[0]?.no ?? null, indicators: [] })
      continue
    }
    const haystackParts = [
      j.caseName,
      j.issue,
      j.held,
      j.area,
      j.citation,
      j.bench,
      ...j.text.map((p) => p.text),
    ]
    const hay = tokenize(haystackParts.join(' '))
    const haySet = new Set(hay)
    const matched = tokens.filter((t) => haySet.has(t))
    if (matched.length === 0) continue

    const { no, exact } = bestParagraph(j, tokens)
    const issueTokens = new Set(tokenize(j.issue + ' ' + j.area))
    const sameIssue = tokens.filter((t) => issueTokens.has(t)).length >= 2

    const indicators: string[] = []
    if (exact) indicators.push('Exact phrase match')
    if (sameIssue) indicators.push('Same legal issue')
    if (matched.length === tokens.length && tokens.length >= 3) indicators.push('All terms present')

    results.push({ judgment: j, paraNo: no, indicators })
  }

  // Order by coverage — quiet ordering, never surfaced as a "score".
  if (tokens.length > 0) {
    const scoreOf = (r: SearchResultItem) => {
      const hay = new Set(tokenize([r.judgment.caseName, r.judgment.issue, r.judgment.held].join(' ')))
      let n = 0
      for (const t of tokens) if (hay.has(t)) n++
      return n + r.indicators.length * 0.5
    }
    results.sort((a, b) => scoreOf(b) - scoreOf(a))
  } else {
    results.sort((a, b) => (a.judgment.date < b.judgment.date ? 1 : -1))
  }
  return results
}

/* ------------------------------------------------------------------ */
/* Find Authority                                                      */
/* ------------------------------------------------------------------ */

export interface AuthorityHit {
  judgment: Judgment
  paraNo: number
  paraText: string
  indicators: string[]
}

/**
 * Locate paragraphs in the demo corpus that respond to a legal proposition.
 * Indicators are computed from the text itself:
 *  - "Exact phrase match"  — a phrase from the proposition appears in the paragraph
 *  - "Same legal issue"    — the judgment's issue/area shares key terms with the proposition
 *  - "Similar factual context" — the held/ratio shares key terms
 * No ranking or confidence scores are produced.
 */
export function findAuthorities(proposition: string, corpus: Judgment[] = allJudgments): AuthorityHit[] {
  const tokens = tokenize(proposition)
  if (tokens.length === 0) return []
  const grams = bigrams(tokens)
  const hits: AuthorityHit[] = []

  for (const j of corpus) {
    // A judgment is a candidate only if a distinctive term of the proposition
    // (or an exact phrase) actually appears in its text — honest term matching
    // that avoids returning every case containing generic legal vocabulary.
    const anyWhere = new Set(tokenize(j.text.map((p) => p.text).join(' ') + ' ' + j.issue + ' ' + j.held))
    const hasDistinctive = tokens.some((t) => isDistinctive(t) && anyWhere.has(t))
    const hasPhrase = grams.some((g) =>
      (j.text.map((p) => p.text).join(' ') + ' ' + j.issue + ' ' + j.held).toLowerCase().includes(g),
    )
    if (!hasDistinctive && !hasPhrase) continue

    const issueTokens = new Set(tokenize(`${j.issue} ${j.area} ${j.caseName}`))
    const heldTokens = new Set(tokenize(j.held))

    let best: { p: (typeof j.text)[number]; strength: number } | null = null
    for (const p of j.text) {
      const paraTokens = new Set(tokenize(p.text))
      const overlap = tokens.filter((t) => paraTokens.has(t))
      const exact = grams.some((g) => p.text.toLowerCase().includes(g))
      const distinctiveOverlap = overlap.some((t) => isDistinctive(t))
      if (overlap.length === 0 || (!distinctiveOverlap && !exact)) continue
      const strength = overlap.length * 2 + (exact ? 3 : 0)
      if (!best || strength > best.strength) best = { p, strength }
    }
    if (!best) continue

    const exact = grams.some((g) => best.p.text.toLowerCase().includes(g))
    const sameIssue = tokens.filter((t) => issueTokens.has(t)).length >= 2
    const similarFacts = tokens.filter((t) => heldTokens.has(t)).length >= 2

    const indicators: string[] = []
    if (exact) indicators.push('Exact phrase match')
    if (sameIssue) indicators.push('Same legal issue')
    if (similarFacts) indicators.push('Similar factual context')
    if (indicators.length === 0) indicators.push('Keyword match')

    hits.push({ judgment: j, paraNo: best.p.no, paraText: best.p.text, indicators })
  }

  hits.sort((a, b) => {
    const aGroup = a.judgment.court === 'Supreme Court of India' ? 0 : a.judgment.court === 'Kerala High Court' ? 1 : 2
    const bGroup = b.judgment.court === 'Supreme Court of India' ? 0 : b.judgment.court === 'Kerala High Court' ? 1 : 2
    return aGroup - bGroup
  })
  return hits
}

/* ------------------------------------------------------------------ */
/* Citation verification                                              */
/* ------------------------------------------------------------------ */

export function normalizeCitation(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/\(?\d{4}\)?/g, (y) => y.replace(/[()]/g, ''))
    .replace(/[^a-z0-9]/g, '')
}

export interface CitationLookupResult {
  judgment: Judgment
  status: 'Verified' | 'Needs review'
  matchedOn: string
}

export function lookupCitation(raw: string): CitationLookupResult | null {
  if (!raw.trim()) return null
  const norm = normalizeCitation(raw)
  for (const j of allJudgments) {
    const candidates = [j.citation, ...(j.citationAliases ?? [])]
    for (const c of candidates) {
      if (normalizeCitation(c) === norm) {
        return { judgment: j, status: 'Verified', matchedOn: c }
      }
    }
  }
  return null
}

/* ------------------------------------------------------------------ */
/* Formatting helpers                                                  */
/* ------------------------------------------------------------------ */

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime()
  const now = Date.now()
  const days = Math.floor((now - then) / 86400000)
  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  const weeks = Math.floor(days / 7)
  if (weeks < 5) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} ${months === 1 ? 'month' : 'months'} ago`
  return `${Math.floor(days / 365)} ${Math.floor(days / 365) === 1 ? 'year' : 'years'} ago`
}

export function copyText(j: Judgment): string {
  return `${j.caseName}, ${j.citation} (${j.court}) — demo citation, do not cite`
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }
}
