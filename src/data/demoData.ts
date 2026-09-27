import type { Judgment, Folder, SavedEntry } from '../types'

/*
 * ---------------------------------------------------------------------------
 * DEMO DATA NOTICE
 * ---------------------------------------------------------------------------
 * Every case, citation, paragraph and authority in this file is SAMPLE DATA
 * created for this prototype. Citations embed the marker "DEMO" so that they
 * can never be mistaken for real citations. No real judgment, held statement,
 * quotation or statutory text is reproduced or invented here.
 * ---------------------------------------------------------------------------
 */

export const DEMO_NOTICE =
  'Sample content created for demonstration. Not a real judgment — do not cite.'

export const DEMO_NOTICE_SHORT = 'Demo Data'

export const judgments: Judgment[] = [
  {
    id: 'j1',
    caseName: 'Anil Kumar v. State of Kerala',
    court: 'Kerala High Court',
    courtShort: 'KER',
    bench: 'Division Bench',
    date: '2025-02-12',
    citation: '2025:KER:DEMO-0214',
    area: 'Criminal',
    issue:
      'Whether anticipatory bail can be granted after the filing of the final report (chargesheet), and what considerations govern the exercise of discretion at that stage.',
    held:
      'The filing of the final report does not by itself foreclose anticipatory bail. Once the investigation is complete and the applicant has cooperated, the court weighs the gravity of the accusation, antecedents, and the likelihood of flight or tampering. Where custodial interrogation would serve no purpose, protection from arrest may be granted, subject to conditions. Appeal dismissed / application allowed.',
    keyParas: [
      { no: 18, title: 'Principles governing anticipatory bail' },
      { no: 24, title: 'Application of principles to the present facts' },
      { no: 31, title: 'Final conclusion' },
    ],
    text: [
      {
        no: 1,
        text: 'The applicant seeks protection from arrest in connection with Crime No. [•] of 2024 of [•] Police Station, registered for offences punishable under the Bharatiya Nyaya Sanhita, 2023. The final report has since been filed and the applicant has not been arrested during the investigation. [Demo paragraph — sample text]',
      },
      {
        no: 2,
        text: 'Learned counsel for the applicant submits that the applicant cooperated fully with the investigation, was never required for custodial interrogation, and that the prospect of arrest at this stage serves no purpose other than humiliation. [Demo paragraph — sample text]',
      },
      {
        no: 5,
        text: 'The Public Prosecutor opposes the application, contending that the offence alleged is of a serious nature and that the applicant, being influential, may influence the witnesses if protection from arrest is granted. [Demo paragraph — sample text]',
      },
      {
        no: 11,
        text: 'We have heard the learned counsel for the parties and perused the final report and the case diary made available to us. [Demo paragraph — sample text]',
      },
      {
        no: 18,
        text: 'The principles governing anticipatory bail are by now well settled. The filing of the final report is not a terminal event which ousts the jurisdiction to grant pre-arrest protection. The discretion must be exercised with care: the gravity of the accusation, the antecedents of the applicant, the possibility of flight, and the likelihood of tampering with evidence or influencing witnesses are the primary considerations. Where the investigation stands completed and the applicant has cooperated, custodial interrogation adds little to the inquiry. [Demo paragraph — sample text]',
      },
      {
        no: 24,
        text: 'Applying these principles to the present facts: the chargesheet has been filed and the applicant has not been arrested during investigation; nothing has been placed on record to suggest that he evaded investigation at any stage; the offences alleged, though not trivial, do not involve violence against the person; and the witnesses cited are official or documentary in nature. On these facts, we are of the view that anticipatory bail may be granted, subject to appropriate conditions, and that further custodial interrogation would serve no purpose. [Demo paragraph — sample text]',
      },
      {
        no: 31,
        text: 'In the result, this application is allowed. In the event of arrest, the applicant shall be released on bail on executing a bond and furnishing sureties, subject to conditions imposed below. The application is disposed of as above. [Demo paragraph — sample text]',
      },
    ],
    authorities: [
      {
        caseName: 'Prakash Menon v. State of Kerala',
        court: 'Kerala High Court',
        citation: '2016:KER:DEMO-0443',
        relation: 'Relied upon',
        context:
          'Held (demo) that the filing of the final report does not by itself defeat an application for anticipatory bail.',
      },
      {
        caseName: 'Vijayakumar Pillai v. State of Kerala',
        court: 'Kerala High Court',
        citation: '2011:KER:DEMO-0287',
        relation: 'Distinguished',
        context:
          'Blanket orders of anticipatory bail without recording reasons were disapproved; the present order is conditioned and reasoned.',
      },
      {
        caseName: 'State of Kerala v. Rajan Nair',
        court: 'Kerala High Court',
        citation: '2020:KER:DEMO-0501',
        relation: 'Discussed',
        context:
          'On the meaning of "custody" for the purpose of the anticipatory bail provisions.',
      },
    ],
    treatment: [
      {
        relation: 'Followed by',
        caseName: 'Sneha Rose v. State of Kerala',
        court: 'Kerala High Court',
        citation: '2025:KER:DEMO-0340',
        note: 'Followed the proposition that the filing of the final report does not foreclose anticipatory bail. (Demo reference — citing judgment not included in the demo database.)',
      },
      {
        relation: 'Distinguished by',
        caseName: 'Karthik Menon v. State of Kerala',
        court: 'Kerala High Court',
        citation: '2025:KER:DEMO-0299',
        note: 'Distinguished on the ground that the applicant there had evaded investigation. (Demo reference — citing judgment not included in the demo database.)',
      },
      {
        relation: 'Referred to by',
        caseName: 'Mohammed Ashraf v. State of Kerala',
        court: 'Kerala High Court',
        citation: '2025:KER:DEMO-0367',
        note: 'Referred to the summary of principles in paragraph 18. (Demo reference — citing judgment not included in the demo database.)',
      },
    ],
    statutes: [
      { name: 'Bharatiya Nagarik Suraksha Sanhita, 2023', note: 'Provisions on anticipatory bail (demo reference)' },
      { name: 'Bharatiya Nyaya Sanhita, 2023', note: 'Offences invoked in the FIR (demo reference)' },
    ],
  },
  {
    id: 'j2',
    caseName: 'Mary Thomas v. Thomas Mathew',
    court: 'Kerala High Court',
    courtShort: 'KER',
    bench: 'Single Judge',
    date: '2025-01-28',
    citation: '2025:KER:DEMO-0187',
    area: 'Family',
    issue:
      'Whether the separate income of a wife disentitles her to interim maintenance, and how the quantum of interim maintenance should be assessed on a prima facie view.',
    held:
      'A wife’s own income is a relevant factor but not a bar to interim maintenance. The court must make a prima facie comparison of the needs of the claimant against the means and earning capacity of the respondent, without conducting a roving inquiry into evidence at the interim stage. Interim maintenance fixed at a moderate sum, adjustable in final proceedings.',
    keyParas: [
      { no: 9, title: 'Prima facie standard at the interim stage' },
      { no: 16, title: 'Effect of the claimant’s independent income' },
      { no: 22, title: 'Quantum fixed and directions' },
    ],
    text: [
      {
        no: 1,
        text: 'This revision petition challenges the order of the learned Magistrate allowing the claimant’s application for interim maintenance. [Demo paragraph — sample text]',
      },
      {
        no: 4,
        text: 'The claimant — the wife — sought interim maintenance on the allegation that she was deserted without any means of support. The respondent contended that the claimant is employed and independently earns sufficient income. [Demo paragraph — sample text]',
      },
      {
        no: 9,
        text: 'At the interim stage the inquiry is deliberately confined. The court is not to conduct a mini-trial on documents; it takes a prima facie view of the claimant’s need and the respondent’s means, and fixes a modest sum that keeps the claimant above destitution while the main proceedings mature. [Demo paragraph — sample text]',
      },
      {
        no: 16,
        text: 'On the question of the claimant’s income: independent earnings are a relevant consideration, but they do not extinguish the obligation altogether. The comparison is between the reasonable needs disclosed prima facie and the respondent’s earning capacity; a moderate interim amount, adjustable at the final stage, balances both. [Demo paragraph — sample text]',
      },
      {
        no: 22,
        text: 'Accordingly, the interim maintenance is fixed at a moderate monthly sum, subject to adjustment in the final order. The revision petition stands disposed of in the above terms. [Demo paragraph — sample text]',
      },
    ],
    authorities: [
      {
        caseName: 'Rajeev Mohan v. Lakshmi Amma',
        court: 'Kerala High Court',
        citation: '2018:KER:DEMO-0104',
        relation: 'Discussed',
        context: 'On the prima facie standard applicable at the interim stage of maintenance proceedings. (Demo authority)',
      },
    ],
    treatment: [
      {
        relation: 'Referred to by',
        caseName: 'Ansila Beevi v. Rasheed',
        court: 'Kerala High Court',
        citation: '2025:KER:DEMO-0355',
        note: 'Referred to the prima facie standard restated in paragraph 9. (Demo reference — citing judgment not included in the demo database.)',
      },
    ],
    statutes: [
      { name: 'Bharatiya Nagarik Suraksha Sanhita, 2023', note: 'Maintenance provisions (demo reference)' },
    ],
  },
  {
    id: 'j3',
    caseName: 'Abdul Rahman v. Sulekha Beevi',
    court: 'Kerala High Court',
    courtShort: 'KER',
    bench: 'Single Judge',
    date: '2025-01-15',
    citation: '2025:KER:DEMO-0163',
    area: 'Property',
    issue:
      'Whether a suit for partition is barred by limitation where the plaintiff claims continuous co-sharer possession and the defendant asserts an exclusive title set up years earlier.',
    held:
      'Possession of a co-sharer is possession on behalf of all co-sharers. Limitation in a suit for partition begins only from a definite, pleaded and proved ouster or clear denial of the plaintiff’s title. A vague assertion of exclusive title in a written statement, unsupported by acts of exclusive hostile possession, does not start limitation. Suit held within time.',
    keyParas: [
      { no: 12, title: 'Co-sharer possession and ouster' },
      { no: 19, title: 'When limitation begins to run' },
      { no: 26, title: 'Application to the facts and conclusion' },
    ],
    text: [
      {
        no: 1,
        text: 'The plaintiffs — co-sharers in a joint family property — seek partition of the scheduled property. The defendant resists the suit as barred by time, contending that her late husband had asserted exclusive title more than twelve years prior to the suit. [Demo paragraph — sample text]',
      },
      {
        no: 12,
        text: 'The position of a co-sharer in possession is well understood: possession of one co-sharer is possession on behalf of all. Adverse possession as against a co-sharer requires proof of open, hostile and continuous exclusion — a definite ouster brought home to the other co-sharers. [Demo paragraph — sample text]',
      },
      {
        no: 19,
        text: 'It follows that limitation in a partition suit does not begin to run merely with the passage of years, nor upon a bare assertion of title in pleadings. The clock starts only from a clear denial of the plaintiff’s right coupled with acts of exclusive possession, both pleaded and proved. [Demo paragraph — sample text]',
      },
      {
        no: 26,
        text: 'In the present case, the defendant relies on a statement in a prior written statement, but points to no concrete act of exclusive, hostile possession referable to a date certain. The suit is therefore within time, and the question of shares will stand referred to the trial court. Decreed in part; suit held within limitation. [Demo paragraph — sample text]',
      },
    ],
    authorities: [
      {
        caseName: 'Kunjavva v. Achuthan Nair',
        court: 'Kerala High Court',
        citation: '1990:KER:DEMO-0771',
        relation: 'Followed',
        context: 'Possession of a co-sharer is possession on behalf of all co-sharers. (Demo authority)',
      },
    ],
    treatment: [],
    statutes: [
      { name: 'Limitation Act, 1963', note: 'Schedule — articles on suits for possession (demo reference)' },
    ],
  },
  {
    id: 'j4',
    caseName: 'State of Kerala v. Jasim Mohammed',
    court: 'Kerala High Court',
    courtShort: 'KER',
    bench: 'Single Judge',
    date: '2024-12-20',
    citation: '2024:KER:DEMO-0421',
    area: 'Criminal',
    issue:
      'Whether bail can be granted under the NDPS Act where the alleged contraband is of commercial quantity, and what satisfies the “reason to believe” standard for complicity.',
    held:
      'The twin conditions of Section 37 of the NDPS Act must be strictly satisfied before bail is granted in offences involving commercial quantity. However, the “reason to believe” that the accused is guilty must rest on credible material, not on suspicion or the fact of recovery from a co-accused alone. On the materials placed, the belief was not adequately founded; bail upheld.',
    keyParas: [
      { no: 7, title: 'Twin conditions under Section 37' },
      { no: 14, title: 'The "reason to believe" standard' },
      { no: 20, title: 'Application and conclusion' },
    ],
    text: [
      {
        no: 1,
        text: 'This application under Section 439 of the Code of Criminal Procedure / corresponding provision of the new general criminal procedure seeks confirmation of bail granted to the respondent in a case arising under the Narcotic Drugs and Psychotropic Substances Act, 1985. [Demo paragraph — sample text]',
      },
      {
        no: 7,
        text: 'Where the contraband involved is of commercial quantity, Section 37 imposes a twin restriction: the court must be satisfied that there are reasonable grounds for believing that the accused is not guilty of such offence, and that he is not likely to commit any offence while on bail. These conditions are in addition to, and more stringent than, the ordinary considerations governing bail. [Demo paragraph — sample text]',
      },
      {
        no: 14,
        text: 'The phrase "reason to believe" imports an objective element. It cannot rest on conjecture, on the accusation in the FIR, or on the fact of recovery from a co-accused standing alone. The court must be able to point to material on record which would permit a reasonable person to form the belief. [Demo paragraph — sample text]',
      },
      {
        no: 20,
        text: 'Here, the recovery is attributed to a co-accused; the materials connecting the respondent are confined to call records of ambiguous probative value. That, in our view, does not cross the threshold. Bail confirmed, subject to stringent conditions including periodic reporting. [Demo paragraph — sample text]',
      },
    ],
    authorities: [
      {
        caseName: 'Farid Ahammad v. State of Kerala',
        court: 'Kerala High Court',
        citation: '2019:KER:DEMO-0366',
        relation: 'Relied upon',
        context: 'The twin conditions of Section 37 are mandatory and must be strictly satisfied. (Demo authority)',
      },
      {
        caseName: 'Union of India v. Anees Khan',
        court: 'Supreme Court of India',
        citation: '2021:SC:DEMO-0447',
        relation: 'Discussed',
        context: 'The "reason to believe" must rest on credible material, not suspicion. (Demo authority)',
      },
    ],
    treatment: [
      {
        relation: 'Distinguished by',
        caseName: 'State of Kerala v. Shibin',
        court: 'Kerala High Court',
        citation: '2025:KER:DEMO-0402',
        note: 'Distinguished on the footing that incriminating material was recovered from the accused himself. (Demo reference — citing judgment not included in the demo database.)',
      },
    ],
    statutes: [
      { name: 'Narcotic Drugs and Psychotropic Substances Act, 1985', note: 'Sections 37 and related bail restrictions (demo reference)' },
    ],
  },
  {
    id: 'j5',
    caseName: 'Thomas Abraham v. State of Kerala',
    court: 'Kerala High Court',
    courtShort: 'KER',
    bench: 'Division Bench',
    date: '2024-11-05',
    citation: '2024:KER:DEMO-0388',
    area: 'Constitutional',
    issue:
      'Whether demolition of a structure carried out without prior notice and hearing violates the principles of natural justice, and what remedy follows.',
    held:
      'Except in emergent situations recognised by law, deprivation of property through executive action without notice and an opportunity of being heard offends audi alteram partem. A post-decisional hearing is an inadequate substitute where the act is irreversible in character. The demolition is set aside insofar as practicable; compensation and restoration directions issued.',
    keyParas: [
      { no: 15, title: 'Natural justice in executive action' },
      { no: 28, title: 'Post-decisional hearing and irreversibility' },
      { no: 33, title: 'Directions issued' },
    ],
    text: [
      {
        no: 1,
        text: 'The petitioner assails the demolition of his commercial structure carried out by the local authority, contending that no notice was issued and no hearing was afforded before the act. [Demo paragraph — sample text]',
      },
      {
        no: 15,
        text: 'The rule that an authority exercising power affecting rights must hear the person affected is not a formality to be recited but a safeguard to be observed. Save for recognised emergent situations, unilateral action that destroys property without notice is antithetical to fair administration. [Demo paragraph — sample text]',
      },
      {
        no: 28,
        text: 'A post-decisional hearing presumes that the decision can be revisited. Where the act is irreversible — as demolition ordinarily is — offering a hearing afterwards is an empty formality. Irreversibility is therefore a central consideration in judging the adequacy of procedural protection. [Demo paragraph — sample text]',
      },
      {
        no: 33,
        text: 'We accordingly hold the demolition to be unsustainable in law. The authority shall assess and compensate the petitioner for the loss, and shall follow due process in any future action. Writ petition allowed in the above terms. [Demo paragraph — sample text]',
      },
    ],
    authorities: [
      {
        caseName: 'Citizens’ Forum v. Municipal Council',
        court: 'Supreme Court of India',
        citation: '2015:SC:DEMO-0618',
        relation: 'Relied upon',
        context: 'Natural justice is a safeguard of fair administration, not a technicality. (Demo authority)',
      },
    ],
    treatment: [],
    statutes: [
      { name: 'Constitution of India, 1950', note: 'Articles 14 and 300A (demo reference)' },
    ],
  },
  {
    id: 'j6',
    caseName: 'Prem Sagar v. Lily Transport Co.',
    court: 'Kerala High Court',
    courtShort: 'KER',
    bench: 'Single Judge',
    date: '2024-09-18',
    citation: '2024:KER:DEMO-0355',
    area: 'Motor Vehicles',
    issue:
      'The measure of “just compensation” for the death of a self-employed person, and whether future prospects in income should be added while computing the multiplier-based compensation.',
    held:
      'Just compensation must be assessed on a fair, realistic and moderate estimate. In the case of a self-employed deceased, the tribunals should not adopt the lowest plausible income; the notional income is fixed on the material on record, with the addition of future prospects in an appropriate percentage, and the multiplier corresponding to age applied.',
    keyParas: [
      { no: 6, title: 'The multiplier method' },
      { no: 11, title: 'Income of a self-employed deceased' },
      { no: 18, title: 'Computation and result' },
    ],
    text: [
      {
        no: 1,
        text: 'This appeal under Section 173 of the Motor Vehicles Act, 1988 arises from an award of the Motor Accidents Claims Tribunal, enhancing the compensation awarded to the claimants — the dependants of a self-employed deceased who died in a road accident. [Demo paragraph — sample text]',
      },
      {
        no: 6,
        text: 'The multiplier method remains the standard framework: the annual contribution of the deceased to the dependants, adjusted for personal expenses and future prospects, is multiplied by the factor corresponding to the age of the deceased. Deductions are made for statutory additions. [Demo paragraph — sample text]',
      },
      {
        no: 11,
        text: 'As regards the self-employed, the absence of salary slips is not a reason to default to the minimum. The tribunal should make a realistic estimate based on the material on record — nature of occupation, locality, and the standard of living disclosed. Future prospects are to be added in an appropriate percentage, as with a salaried deceased. [Demo paragraph — sample text]',
      },
      {
        no: 18,
        text: 'Applying the above, the notional income is restated, future prospects added, and the multiplier for the age of the deceased applied. The enhanced compensation, with interest at the rate fixed, shall be apportioned among the claimants as indicated. Appeal allowed in part. [Demo paragraph — sample text]',
      },
    ],
    authorities: [
      {
        caseName: 'Deepa Krishnan v. Kerala SRTC',
        court: 'Supreme Court of India',
        citation: '2017:SC:DEMO-0332',
        relation: 'Followed',
        context: 'Multiplier method is the standard framework for just compensation. (Demo authority)',
      },
      {
        caseName: 'Anand Menon v. New India Assurance Co. Ltd.',
        court: 'Kerala High Court',
        citation: '2022:KER:DEMO-0150',
        relation: 'Discussed',
        context: 'Future prospects applicable to self-employed and salaried deceased alike. (Demo authority)',
      },
    ],
    treatment: [],
    statutes: [
      { name: 'Motor Vehicles Act, 1988', note: 'Sections 166 and 173 (demo reference)' },
    ],
  },
  {
    id: 'j7',
    caseName: 'George Varghese v. Thrissur District Co-operative Bank',
    court: 'Kerala High Court',
    courtShort: 'KER',
    bench: 'Single Judge',
    date: '2024-08-02',
    citation: '2024:KER:DEMO-0312',
    area: 'Consumer',
    issue:
      'From what date limitation runs for a consumer complaint alleging deficiency in service by a financing bank, and whether the complainant’s contemporaneous correspondence saves the complaint.',
    held:
      'Limitation for a consumer complaint runs from the date on which the cause of action arises — typically the date of refusal or clear denial of service — and not from every subsequent correspondence. However, where the bank repeatedly entertained and addressed the grievance without a definitive refusal, the cause of action is a continuing one up to the final denial. Complaint held within time.',
    keyParas: [
      { no: 8, title: 'Accrual of the cause of action' },
      { no: 13, title: 'Continuing cause of action on the facts' },
    ],
    text: [
      {
        no: 1,
        text: 'The complainant — a borrower — alleged that the financing bank failed to release title documents after closure of the loan, and later levied charges without notice. The District Commission dismissed the complaint as barred by limitation; that order is under challenge. [Demo paragraph — sample text]',
      },
      {
        no: 8,
        text: 'For limitation purposes, the relevant question is when the cause of action arose: ordinarily, on the date of refusal or clear denial of the service sought. Subsequent reminders which merely repeat the grievance do not restart the clock. [Demo paragraph — sample text]',
      },
      {
        no: 13,
        text: 'On the facts, the bank’s replies do not disclose a definitive refusal at the earliest point; the grievance was entertained over a span of time and met with a final denial only later. In those circumstances the cause of action must be regarded as continuing, and the complaint, filed within two years of that final denial, is within time. Remitted for decision on merits. [Demo paragraph — sample text]',
      },
    ],
    authorities: [
      {
        caseName: 'Joseph Oomen v. South Indian Bank Ltd.',
        court: 'Supreme Court of India',
        citation: '2013:SC:DEMO-0455',
        relation: 'Relied upon',
        context: 'Limitation runs from refusal or deficiency of service. (Demo authority)',
      },
    ],
    treatment: [],
    statutes: [
      { name: 'Consumer Protection Act, 2019', note: 'Limitation for complaints (demo reference)' },
      { name: 'Limitation Act, 1963', note: 'General principles (demo reference)' },
    ],
  },
  {
    id: 'j8',
    caseName: 'Ramesh Chandra v. State of Bihar',
    court: 'Supreme Court of India',
    courtShort: 'SC',
    bench: 'Division Bench',
    date: '2024-03-14',
    citation: '2024:SC:DEMO-1187',
    area: 'Criminal',
    issue:
      'Whether prolonged custody of an undertrial, where the delay in trial is not attributable to him, is a relevant consideration in the grant of bail.',
    held:
      'Prolonged custody is a relevant — and at times decisive — consideration while considering bail. The object of custody is to secure the presence of the accused and the integrity of the trial, not to punish in anticipation of conviction. Where the delay in trial is not attributable to the accused and a substantial part of the maximum sentence stands undergone, continued incarceration ceases to serve any penal purpose. Bail granted.',
    keyParas: [
      { no: 10, title: 'Object of custody' },
      { no: 16, title: 'Prolonged custody as a relevant factor' },
      { no: 21, title: 'Conclusion and order' },
    ],
    text: [
      {
        no: 1,
        text: 'The appellant, in custody since [•], seeks bail. The trial has barely commenced; a substantial number of witnesses remain to be examined. [Demo paragraph — sample text]',
      },
      {
        no: 10,
        text: 'Custody during trial serves two objects: securing the presence of the accused and preventing interference with the course of justice. It is not, and cannot be, a substitute for the sentence which only a finding of guilt can attract. [Demo paragraph — sample text]',
      },
      {
        no: 16,
        text: 'Prolonged custody can be a relevant factor while considering bail. Where the delay in conclusion of the trial is not attributable to the accused, and the period already undergone bears a substantial proportion to the maximum sentence prescribed, continued detention degenerates into punishment before trial. Courts must weigh the length of incarceration, the likely time to conclusion, and the conduct of the accused. [Demo paragraph — sample text]',
      },
      {
        no: 21,
        text: 'Applying these considerations, we are of the view that the continued incarceration of the appellant serves no purpose reflective of the objects of custody. Bail is granted subject to conditions. Appeal disposed of. [Demo paragraph — sample text]',
      },
    ],
    authorities: [
      {
        caseName: 'Mohan Lal v. State of Madhya Pradesh',
        court: 'Supreme Court of India',
        citation: '2007:SC:DEMO-0219',
        relation: 'Followed',
        context: 'The object of custody is to secure presence, not to punish. (Demo authority)',
      },
    ],
    treatment: [
      {
        relation: 'Followed by',
        caseName: 'Sanjay Patil v. State of Maharashtra',
        court: 'Bombay High Court',
        citation: '2023:BOM:DEMO-0092',
        note: 'Followed on the relevance of prolonged custody at the bail stage.',
      },
    ],
    statutes: [
      { name: 'Bharatiya Nagarik Suraksha Sanhita, 2023', note: 'Bail and undertrial release provisions (demo reference)' },
    ],
  },
  {
    id: 'j9',
    caseName: 'Sanjay Patil v. State of Maharashtra',
    court: 'Bombay High Court',
    courtShort: 'BOM',
    bench: 'Single Judge',
    date: '2023-07-21',
    citation: '2023:BOM:DEMO-0092',
    area: 'Criminal',
    issue:
      'Whether an undertrial whose trial has remained stagnant for want of witnesses may be released on bail on the ground of prolonged custody alone.',
    held:
      'Prolonged custody of an undertrial, where the stagnation of the trial is attributable to the prosecution’s inability to produce witnesses and not to any conduct of the accused, tilts the balance in favour of release. Bail granted subject to conditions ensuring presence at trial.',
    keyParas: [
      { no: 9, title: 'Stagnation of trial and its attribution' },
      { no: 15, title: 'Order on bail' },
    ],
    text: [
      {
        no: 1,
        text: 'The applicant, an undertrial, points out that of the witnesses cited, only a fraction have been examined over several years, and that the adjournments sought were at the instance of the prosecution. [Demo paragraph — sample text]',
      },
      {
        no: 9,
        text: 'Where the stagnation of a trial is not the doing of the accused, the consequence of that stagnation — prolonged custody — cannot be visited upon him indefinitely. The attribution of delay is therefore the first inquiry. [Demo paragraph — sample text]',
      },
      {
        no: 15,
        text: 'On the facts, the blame for the delay is not traceable to the applicant. He is directed to be released on bail on executing a personal bond with sureties, and on conditions safeguarding his presence at trial. Application allowed. [Demo paragraph — sample text]',
      },
    ],
    authorities: [
      {
        caseName: 'Ramesh Chandra v. State of Bihar',
        court: 'Supreme Court of India',
        citation: '2024:SC:DEMO-1187',
        relation: 'Followed',
        context: 'Prolonged custody is a relevant consideration at the bail stage.',
      },
    ],
    treatment: [],
    statutes: [
      { name: 'Bharatiya Nagarik Suraksha Sanhita, 2023', note: 'Bail provisions (demo reference)' },
    ],
  },
  {
    id: 'j10',
    caseName: 'ABC v. State of Kerala',
    court: 'Kerala High Court',
    courtShort: 'KER',
    bench: 'Single Judge',
    date: '2023-06-09',
    citation: '2023 (2) KLT 456',
    citationAliases: ['2023:KER:DEMO-0101', '2023 2 KLT 456'],
    area: 'Criminal',
    issue:
      'Whether anticipatory bail may be granted in respect of an economic offence, and what conditions may be imposed to balance investigation with personal liberty.',
    held:
      'Anticipatory bail is not ruled out in economic offences, but the protection must be tailored: cooperation with investigation, joining inquiry as directed, and safeguards against alienation of assets may be imposed as conditions. Protection granted for a limited duration with liberty to apply for extension.',
    keyParas: [
      { no: 11, title: 'Economic offences and anticipatory bail' },
      { no: 17, title: 'Tailoring of conditions' },
    ],
    text: [
      {
        no: 1,
        text: 'The applicant — a director of the aggrieved company — apprehends arrest in a case alleging cheating and criminal breach of trust of a financial nature. [Demo paragraph — sample text. "ABC" is a placeholder party name used for demonstration.]',
      },
      {
        no: 11,
        text: 'The category of "economic offence" does not create a per se bar to anticipatory bail. The seriousness of the allegation is a weighty consideration, but it operates within the ordinary framework: gravity, cooperation, flight risk and the needs of investigation. [Demo paragraph — sample text]',
      },
      {
        no: 17,
        text: 'Where the offence is financial, conditions may be tailored to the risk: the applicant may be directed to cooperate with the inquiry, to remain present as directed, and to abstain from alienating assets during the currency of protection. Protection is accordingly granted for a limited duration. [Demo paragraph — sample text]',
      },
    ],
    authorities: [
      {
        caseName: 'Vijayakumar Pillai v. State of Kerala',
        court: 'Kerala High Court',
        citation: '2011:KER:DEMO-0287',
        relation: 'Followed',
        context: 'Conditions may be fashioned to suit the nature of the offence. (Demo authority)',
      },
    ],
    treatment: [
      {
        relation: 'Followed by',
        caseName: 'Deepak Rajan v. State of Kerala',
        court: 'Kerala High Court',
        citation: '2024:KER:DEMO-0499',
        note: 'Followed the tailoring of conditions in financial offence cases. (Demo reference — citing judgment not included in the demo database.)',
      },
      {
        relation: 'Distinguished by',
        caseName: 'Rasheed v. Union Bank of India',
        court: 'Kerala High Court',
        citation: '2025:KER:DEMO-0278',
        note: 'Distinguished where the magnitude of the alleged fraud pointed to a flight risk. (Demo reference — citing judgment not included in the demo database.)',
      },
      {
        relation: 'Referred to by',
        caseName: 'Anil Kumar v. State of Kerala',
        court: 'Kerala High Court',
        citation: '2025:KER:DEMO-0214',
        note: 'Referred to on the tailoring of conditions to the needs of investigation.',
      },
    ],
    statutes: [
      { name: 'Bharatiya Nyaya Sanhita, 2023', note: 'Cheating and criminal breach of trust (demo reference)' },
      { name: 'Bharatiya Nagarik Suraksha Sanhita, 2023', note: 'Anticipatory bail provisions (demo reference)' },
    ],
  },
]

export const judgmentById = (id: string): Judgment | undefined =>
  judgments.find((j) => j.id === id)

export const recentKeralaJudgments = [...judgments]
  .filter((j) => j.court === 'Kerala High Court')
  .sort((a, b) => (a.date < b.date ? 1 : -1))

/* ------------------------------------------------------------------ */
/* Research folders (demo)                                            */
/* ------------------------------------------------------------------ */

export const initialFolders: Folder[] = [
  {
    id: 'f1',
    name: 'Bail — NDPS',
    note: 'Authorities for anticipatory bail and NDPS bail applications. Sessions matters this month.',
    updatedAt: '2026-09-25T10:00:00+05:30',
  },
  {
    id: 'f2',
    name: 'Property Dispute',
    note: 'Partition and limitation points for the Kozhikode matter.',
    updatedAt: '2026-09-20T10:00:00+05:30',
  },
  {
    id: 'f3',
    name: 'Maintenance',
    note: 'Interim maintenance — quantum and prima facie standard.',
    updatedAt: '2026-09-08T10:00:00+05:30',
  },
  {
    id: 'f4',
    name: 'Constitutional Law',
    note: 'Natural justice, demolition and executive action.',
    updatedAt: '2026-09-26T10:00:00+05:30',
  },
  {
    id: 'f5',
    name: 'Client Research',
    note: 'Fresh matters from consultations — to be organised.',
    updatedAt: '2026-09-26T10:00:00+05:30',
  },
]

export const initialSaved: Record<string, SavedEntry> = {
  j4: {
    folderIds: ['f1'],
    note: 'Twin conditions under Section 37 — the “reason to believe” para is useful for the bail application listed next week.',
    savedAt: '2026-09-25T10:00:00+05:30',
  },
  j8: {
    folderIds: ['f1'],
    note: 'Para 16 — prolonged custody as a bail factor. Quote this in the undertrial matter.',
    savedAt: '2026-09-24T10:00:00+05:30',
  },
  j3: {
    folderIds: ['f2'],
    note: 'Co-sharer possession and ouster — answers the limitation objection in the partition suit.',
    savedAt: '2026-09-20T10:00:00+05:30',
  },
  j2: {
    folderIds: ['f3'],
    note: 'Prima facie standard at the interim stage — client’s maintenance revision.',
    savedAt: '2026-09-08T10:00:00+05:30',
  },
  j5: {
    folderIds: ['f4'],
    note: 'Irreversibility and post-decisional hearing — demolition matter.',
    savedAt: '2026-09-26T10:00:00+05:30',
  },
}

export const seedSearchHistory = [
  'Anticipatory Bail',
  'Property Dispute',
  'Maintenance',
  'NDPS',
  'Limitation',
]

/* ------------------------------------------------------------------ */
/* Example inputs shown as tappable chips                              */
/* ------------------------------------------------------------------ */

export const exampleSearches = [
  'Can anticipatory bail be granted after filing of chargesheet?',
  'co-sharer possession limitation partition',
  'interim maintenance wife income',
  'NDPS commercial quantity bail reason to believe',
]

export const examplePropositions = [
  'Prolonged custody can be a relevant factor while considering bail.',
  'Filing of the chargesheet does not foreclose anticipatory bail.',
]

export const exampleDraft = `The petitioner is entitled to seek anticipatory bail as of right, since the investigation is complete and the final report has already been filed. It is well settled that prolonged custody of an undertrial cannot be justified where the trial is unlikely to conclude in the near future. The de facto complainant has acted with mala fides in setting the criminal law in motion. Grant of anticipatory bail in these circumstances would meet the ends of justice.`
