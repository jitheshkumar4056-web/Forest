import { searchJudgments, findAuthorities, lookupCitation } from '../src/lib/search'
import { analyseDraft } from '../src/lib/draft'
import { summarizeText, sampleJudgmentText } from '../src/lib/summarize'
import { exampleDraft } from '../src/data/demoData'

const F = { court: 'Any court' as const, year: 'Any year' as const, areas: [] as never[], bench: 'Any bench' as const }

console.log('== 1. NL search: anticipatory bail after chargesheet ==')
for (const r of searchJudgments('Can anticipatory bail be granted after filing of chargesheet?', F))
  console.log(` ${r.judgment.caseName} | para ${r.paraNo} | ${r.indicators.join(', ')}`)

console.log('== 2. filters: Kerala HC + Criminal + 2025 ==')
const F2 = { court: 'Kerala High Court' as const, year: '2025' as const, areas: ['Criminal'] as never[], bench: 'Any bench' as const }
for (const r of searchJudgments('', F2)) console.log(` ${r.judgment.caseName}`)

console.log('== 3. topic searches ==')
for (const q of ['NDPS', 'Property Dispute', 'Maintenance', 'Limitation']) {
  const rs = searchJudgments(q, F)
  console.log(` ${q} -> ${rs.map((r) => r.judgment.caseName.split(' v')[0]).join('; ')}`)
}

console.log('== 4. find authorities: prolonged custody ==')
for (const h of findAuthorities('Prolonged custody can be a relevant factor while considering bail.'))
  console.log(` [${h.judgment.court}] ${h.judgment.caseName} para ${h.paraNo} :: ${h.indicators.join(', ')}`)

console.log('== 5. citation verifier ==')
for (const c of ['2023 (2) KLT 456', '2023(2) KLT 456', ' 2023 2 KLT 456 ', '2025:KER:DEMO-0214', '2024 SC DEMO-1187', '1999 (4) SCC 123', '2023:KER:DEMO-0101']) {
  const r = lookupCitation(c)
  console.log(` "${c}" -> ${r ? r.judgment.caseName + ' [' + r.status + '] matched on ' + r.matchedOn : 'NOT FOUND'}`)
}

console.log('== 6. draft analyser ==')
for (const f of analyseDraft(exampleDraft)) console.log(` [${f.reason}] ${f.sentence.slice(0, 62)}…`)

console.log('== 7. summarizer heuristics ==')
const s = summarizeText(sampleJudgmentText)
console.log(' case:', s.caseName)
for (const sec of s.sections.slice(1, 6)) console.log(` ${sec.heading}: ${sec.body.length} :: ${sec.body[0]?.slice(0, 70) ?? ''}`)
