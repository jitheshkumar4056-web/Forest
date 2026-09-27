/*
 * Judgement Summariser — offline, extractive.
 *
 * This prototype runs entirely on-device with no model or database. For the
 * bundled sample judgment a curated summary is shown. For arbitrary pasted
 * text the app performs an honest heuristic extraction (no claims of legal
 * understanding), always labelled as AI-generated output to be verified.
 */

export interface SummarySection {
  heading: string
  body: string[] // paragraphs or bullet lines
}

export interface JudgmentSummary {
  caseName: string
  court?: string
  sections: SummarySection[]
}

export const sampleJudgmentText = `Joseph Kurian v. State of Kerala

Judgment dated 12 August 2025 — Kerala High Court — 2025:KER:DEMO-0512 (Demo)

1. The petitioner, the second accused in Crime No. [•] of 2023 registered at [•] Police Station for offences punishable under the provisions of the Bharatiya Nyaya Sanhita, 2023 relating to criminal breach of trust and cheating, seeks the quashing of the final report insofar as it concerns him. He is the former secretary of a cooperative society, and the prosecution alleges misappropriation of society funds during his tenure.

2. The case of the prosecution, briefly stated, is that an audit conducted in 2023 revealed a shortfall in the accounts of the society, that the petitioner, being entrusted with the funds as secretary, failed to account for sums totalling several lakhs, and that the resultant loss was concealed by irregular entries in the registers.

3. The petitioner contends that he acted throughout on the decisions of the committee of which he was only the recording officer; that every disbursement was supported by resolutions; and that the audit objection rests on a mistaken reading of the register of advances.

4. Learned counsel for the petitioner argued, first, that the allegations, even if taken at their highest, disclose no personal dishonesty but at best an error of judgment shared by the committee; secondly, that criminal proceedings are being misused to settle internal factional scores within the society; and thirdly, that the continued proceedings violate the guidelines against the mechanical inclusion of officials in financial irregularities.

5. The learned Public Prosecutor opposed the petition, submitting that the register entries bear the petitioner's signature, that the resolutions relied upon do not cover the disputed disbursements, and that these are matters of evidence which cannot be examined at this stage.

6. We have considered the submissions and perused the final report, the audit statement and the register extracts produced.

7. On the first submission: the distinction between an error of judgment attributable to a collective decision and dishonest misappropriation by the person entrusted is a real one, and the materials must show a mens rea referable personally to the accused before the criminal law is set in motion against him. Mere signature on entries made pursuant to committee resolutions, without more, does not supply that ingredient.

8. On the second and third submissions: we do not find it necessary to examine the allegations of factional dispute. It is enough to observe that officials cannot be fastened with criminal liability for every financial irregularity in an institution; the standard is personal dishonesty, not administrative lapse.

9. Applying the above to the materials on record: the disbursements in question are supported by resolutions of the committee; the audit objection does not deal with those resolutions; and no material has been placed before us indicating that the petitioner derived any personal benefit.

10. In the result, the petition is allowed. The final report insofar as it arraigns the petitioner for the offences of criminal breach of trust and cheating is quashed, and he stands discharged from the array of accused. The proceedings against the remaining accused shall proceed according to law.

[Sample judgment created for demonstration. Not a real judgment — do not cite.]`

export const sampleSummary: JudgmentSummary = {
  caseName: 'Joseph Kurian v. State of Kerala',
  court: 'Kerala High Court',
  sections: [
    {
      heading: 'Case overview',
      body: [
        'Petition to quash the final report against the second accused — former secretary of a cooperative society — for alleged misappropriation of society funds (criminal breach of trust and cheating).',
      ],
    },
    {
      heading: 'Facts',
      body: [
        'A 2023 audit of the cooperative society revealed a shortfall in accounts during the petitioner’s tenure as secretary.',
        'The prosecution alleged concealment of the loss through irregular register entries.',
        'The petitioner contended that all disbursements followed committee resolutions and that he was only the recording officer.',
      ],
    },
    {
      heading: 'Issues',
      body: [
        'Whether the materials disclose personal dishonesty (mens rea) referable to the petitioner, as distinct from a collective error of judgment.',
        'Whether criminal proceedings were being misused to settle internal factional disputes.',
      ],
    },
    {
      heading: 'Arguments',
      body: [
        'Petitioner: no personal dishonesty; every disbursement backed by resolutions; audit objection rests on a mistaken reading; guidelines against mechanically implicating officials.',
        'Prosecution: register entries bear the petitioner’s signature; resolutions do not cover the disputed disbursements; these are matters of evidence not examinable at this stage.',
      ],
    },
    {
      heading: 'Court’s reasoning',
      body: [
        'A real distinction exists between a collective error of judgment and dishonest misappropriation; personal mens rea must be shown before setting the criminal law in motion (para 7).',
        'Officials cannot be fastened with criminal liability for every financial irregularity — the standard is personal dishonesty, not administrative lapse (para 8).',
        'Disputed disbursements were supported by resolutions; the audit did not deal with them; no material showed personal benefit (para 9).',
      ],
    },
    {
      heading: 'Final decision',
      body: [
        'Petition allowed; final report quashed qua the petitioner; he stands discharged from the array of accused. Proceedings against the remaining accused to continue (para 10).',
      ],
    },
    {
      heading: 'Important paragraphs',
      body: [
        'Para 7 — distinction between collective error and personal dishonesty',
        'Para 8 — standard: personal dishonesty, not administrative lapse',
        'Para 10 — final order of quashing',
      ],
    },
    {
      heading: 'Cases relied upon',
      body: ['No authorities are relied upon in the sample text.'],
    },
    {
      heading: 'Statutes mentioned',
      body: ['Bharatiya Nyaya Sanhita, 2023 — criminal breach of trust and cheating (as pleaded)'],
    },
  ],
}

/* ------------------------------------------------------------------ */
/* Heuristic extraction for arbitrary pasted text                      */
/* ------------------------------------------------------------------ */

const ISSUE_HINTS = /(issue|question) (for|of) (consideration|decision)|the (only|real|question) .{0,20}(is whether|that arises)|whether .{3,80}(can|could|is|are|may|must|should)\b/i
const REASONING_HINTS = /\b(we have considered|we are of the view|it is (well )?settled|held that|in our opinion|on consideration|we find)\b/i
const DECISION_HINTS = /\b(petition|application|appeal) (is|stands|would be) (allowed|dismissed|disposed|partly allowed|quashed)|in the result\b/i
const FACTS_HINTS = /\b(case of the prosecution|allege|it is alleged|the facts|briefly stated|the complainant|the deceased|the accused)\b/i
const ARGUMENT_HINTS = /\b(learned counsel|submitted|argued|contends|contended|submits)\b/i

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n|\n(?=\d+[.)]\s)|(?<=\.)\s{2,}/)
    .map((p) => p.replace(/^\s*\d+[.)]\s*/, '').trim())
    .filter((p) => p.length > 25)
}

function sentences(para: string): string[] {
  return para
    .split(/(?<=[.;])\s+(?=[A-Z“"(])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 15)
}

export function summarizeText(raw: string): JudgmentSummary {
  const text = raw.trim()
  const paras = splitParagraphs(text)
  const sents = paras.flatMap(sentences)

  const caseName =
    text.match(/^[^\n]{5,90}\bv\.?\s[^\n]{3,90}$/im)?.[0]?.trim() ??
    text.split('\n').find((l) => l.trim().length > 10)?.trim() ??
    'Untitled document'

  const pick = (test: (s: string) => boolean, limit: number) => {
    const out = sents.filter(test)
    return out.length ? out.slice(0, limit) : []
  }

  const facts = pick((s) => FACTS_HINTS.test(s), 3)
  const arguments_ = pick((s) => ARGUMENT_HINTS.test(s), 4)
  const issues = pick((s) => ISSUE_HINTS.test(s), 3)
  const reasoning = pick((s) => REASONING_HINTS.test(s), 4)
  const decision = pick((s) => DECISION_HINTS.test(s), 2)

  const important = sents
    .filter((s) => REASONING_HINTS.test(s) || DECISION_HINTS.test(s))
    .slice(0, 3)

  const caseMentions = Array.from(
    new Set(
      (text.match(/[A-Z][A-Za-z.\s'’]{2,40}\sv\.?\s[A-Z][A-Za-z.\s'’&]{2,40}/g) ?? []).map((m) =>
        m.replace(/\s+/g, ' ').trim(),
      ),
    ),
  )
    .filter((m) => m.toLowerCase() !== caseName.toLowerCase())
    .slice(0, 6)

  const statuteMentions = Array.from(
    new Set(
      (text.match(/((the )?[A-Z][A-Za-z]+( [A-Za-z]+){0,5} (Act|Sanhita|Adhiniyam|Code),? \d{4}|Section \d+[A-Z]?|S\. ?\d+[A-Z]?)/g) ?? []).map(
        (m) => m.replace(/^the /i, 'The ').replace(/\s+/g, ' ').trim(),
      ),
    ),
  ).slice(0, 8)

  const sections: SummarySection[] = [
    {
      heading: 'Case overview',
      body: [
        `${paras.length} paragraphs read. Detected case reference: “${caseName}”. The extract below is assembled mechanically from sentences that match patterns typical of judgments.`,
      ],
    },
    {
      heading: 'Facts',
      body: facts.length ? facts : ['No fact-pattern sentences were detected with confidence.'],
    },
    {
      heading: 'Issues',
      body: issues.length ? issues : ['No issue-framing sentences were detected with confidence.'],
    },
    {
      heading: 'Arguments',
      body: arguments_.length ? arguments_ : ['No submissions/arguments were detected with confidence.'],
    },
    {
      heading: 'Court’s reasoning',
      body: reasoning.length ? reasoning : ['No reasoning sentences were detected with confidence.'],
    },
    {
      heading: 'Final decision',
      body: decision.length ? decision : ['No operative order was detected with confidence.'],
    },
    {
      heading: 'Important paragraphs',
      body: important.length ? important : ['No paragraphs flagged.'],
    },
    {
      heading: 'Cases relied upon',
      body: caseMentions.length ? caseMentions : ['No decided cases were detected in the text.'],
    },
    {
      heading: 'Statutes mentioned',
      body: statuteMentions.length ? statuteMentions : ['No statutes or sections were detected in the text.'],
    },
  ]

  return { caseName, sections }
}
