/*
 * Draft Analyser — flags sentences in a draft that assert propositions which
 * would ordinarily need supporting authority. Purely lexical detection,
 * presented as assistance ("may require"), never as a legal opinion.
 */

export interface DraftFlag {
  sentence: string
  reason: string
}

const TRIGGERS: { pattern: RegExp; reason: string }[] = [
  { pattern: /\bentitled to\b/i, reason: 'Assertion of an entitlement' },
  { pattern: /\bas of right\b/i, reason: 'Assertion of a right' },
  { pattern: /\b(well settled|well-established|firmly settled)\b/i, reason: 'Claim that a proposition is settled law' },
  { pattern: /\bit is (trite|axiomatic|elementary|beyond doubt)\b/i, reason: 'Claim that a proposition is beyond argument' },
  { pattern: /\bsettled (principles|law|position)\b/i, reason: 'Invocation of settled law' },
  { pattern: /\bcannot be (justified|denied|disputed|questioned)\b/i, reason: 'Strong negative assertion' },
  { pattern: /\bmala fides?\b/i, reason: 'Allegation of mala fides' },
  { pattern: /\bmeets? the ends of justice\b/i, reason: 'Appeal to the ends of justice' },
  { pattern: /\bprima facie (shows|establishes|proves)\b/i, reason: 'Prima facie evidentiary claim' },
  { pattern: /\bclearly (establishes|shows|demonstrates)\b/i, reason: 'Assertion that something is clearly established' },
  { pattern: /\bprolonged custody\b/i, reason: 'Assertion about prolonged custody' },
  { pattern: /\bbail (cannot|should not|must not) be\b/i, reason: 'Assertion about the availability of bail' },
  { pattern: /\bno (legal|scientific) defect\b/i, reason: 'Negative assertion about defect' },
  { pattern: /\bis liable to\b/i, reason: 'Assertion of liability' },
]

export function splitSentences(draft: string): string[] {
  return draft
    .split(/(?<=[.!?])\s+(?=[A-Z“"(])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

export function analyseDraft(draft: string): DraftFlag[] {
  const flags: DraftFlag[] = []
  const seen = new Set<string>()
  for (const sentence of splitSentences(draft)) {
    const hits = TRIGGERS.filter((t) => t.pattern.test(sentence))
    if (hits.length > 0 && !seen.has(sentence)) {
      seen.add(sentence)
      flags.push({ sentence, reason: hits[0].reason })
    }
  }
  return flags
}
