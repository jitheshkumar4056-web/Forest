import type { Statute } from '../types'

/*
 * DEMO LIBRARY NOTICE
 * The official text of these Acts is NOT included in this prototype.
 * Each statute page shows a short demo index (clearly labelled) so that the
 * navigation and search experience can be demonstrated. Users are directed to
 * India Code / official gazette for authoritative text.
 */

export const LIBRARY_NOTICE =
  'The official text of the Acts is not included in this prototype. The section index below is a demo extract — always read the authoritative text on India Code (indiacode.nic.in) or the official Gazette.'

export const statutes: Statute[] = [
  {
    id: 'constitution',
    name: 'Constitution of India',
    shortName: 'Constitution',
    year: '1950',
    category: 'Constitution',
    sections: [
      { no: 'Art. 14', heading: 'Equality before law' },
      { no: 'Art. 19', heading: 'Protection of certain rights regarding freedom of speech, etc.' },
      { no: 'Art. 21', heading: 'Protection of life and personal liberty' },
      { no: 'Art. 32', heading: 'Remedies for enforcement of rights conferred by this Part (Supreme Court)' },
      { no: 'Art. 136', heading: 'Special leave to appeal by the Supreme Court' },
      { no: 'Art. 141', heading: 'Law declared by Supreme Court to be binding on all courts' },
      { no: 'Art. 226', heading: 'Writ powers of the High Courts' },
    ],
    relatedJudgmentIds: ['j5'],
  },
  {
    id: 'bns',
    name: 'Bharatiya Nyaya Sanhita, 2023',
    shortName: 'BNS',
    year: '2023',
    category: 'Criminal Law',
    sections: [
      { no: 'S. 1', heading: 'Short title, extent and commencement' },
      { no: 'S. 2', heading: 'Definitions' },
      { no: 'S. 3', heading: 'General explanations' },
      { no: 'Ch. II', heading: 'Of punishments (chapter heading)' },
      { no: 'S. 100', heading: 'Culpable homicide (demo index entry — verify on India Code)' },
      { no: 'S. 101', heading: 'Murder (demo index entry — verify on India Code)' },
    ],
    relatedJudgmentIds: ['j1', 'j10'],
  },
  {
    id: 'bnss',
    name: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
    shortName: 'BNSS',
    year: '2023',
    category: 'Criminal Law',
    sections: [
      { no: 'S. 1', heading: 'Short title, extent and commencement' },
      { no: 'S. 2', heading: 'Definitions' },
      { no: 'S. 479', heading: 'Maximum period for which an undertrial may be detained (corresponding to s.436A CrPC — demo note)' },
      { no: 'S. 482', heading: 'Direction for grant of bail to person apprehending arrest (anticipatory bail; corresponding to s.438 CrPC — demo note)' },
      { no: 'S. 187', heading: 'Procedure when investigation cannot be completed in twenty-four hours (remand and custody; corresponding to s.167 CrPC — demo note)' },
    ],
    relatedJudgmentIds: ['j1', 'j8', 'j9', 'j10', 'j2'],
  },
  {
    id: 'bsa',
    name: 'Bharatiya Sakshya Adhiniyam, 2023',
    shortName: 'BSA',
    year: '2023',
    category: 'Criminal Law',
    sections: [
      { no: 'S. 1', heading: 'Short title, extent and commencement' },
      { no: 'S. 2', heading: 'Definitions' },
      { no: 'Ch. II', heading: 'Of relevancy of facts (chapter heading)' },
      { no: 'Ch. V', heading: 'Of opinions (chapter heading)' },
    ],
    relatedJudgmentIds: [],
  },
  {
    id: 'cpc',
    name: 'Code of Civil Procedure, 1908',
    shortName: 'CPC',
    year: '1908',
    category: 'Civil Law',
    sections: [
      { no: 'S. 1', heading: 'Short title, extent and commencement' },
      { no: 'S. 2', heading: 'Definitions' },
      { no: 'S. 96', heading: 'Appeal from original decree' },
      { no: 'S. 100', heading: 'Second appeal on a substantial question of law' },
      { no: 'O. VII R. 11', heading: 'Rejection of plaint' },
      { no: 'S. 151', heading: 'Saving of inherent powers of court' },
    ],
    relatedJudgmentIds: ['j3'],
  },
  {
    id: 'limitation',
    name: 'Limitation Act, 1963',
    shortName: 'Limitation Act',
    year: '1963',
    category: 'Civil Law',
    sections: [
      { no: 'S. 3', heading: 'Bar of limitation' },
      { no: 'S. 5', heading: 'Extension of prescribed period in certain cases' },
      { no: 'S. 12', heading: 'Exclusion of time in legal proceedings' },
      { no: 'Schedule', heading: 'Periods of limitation (articles for suits for possession, accounts, etc.)' },
    ],
    relatedJudgmentIds: ['j3', 'j7'],
  },
  {
    id: 'sra',
    name: 'Specific Relief Act, 1963',
    shortName: 'SRA',
    year: '1963',
    category: 'Civil Law',
    sections: [
      { no: 'S. 1', heading: 'Short title, extent and commencement' },
      { no: 'S. 2', heading: 'Definitions' },
      { no: 'S. 14', heading: 'Contracts not specifically enforceable' },
      { no: 'S. 38', heading: 'Perpetual injunctions' },
      { no: 'S. 41', heading: 'When injunction cannot be granted' },
    ],
    relatedJudgmentIds: [],
  },
  {
    id: 'tpa',
    name: 'Transfer of Property Act, 1882',
    shortName: 'TPA',
    year: '1882',
    category: 'Civil Law',
    sections: [
      { no: 'S. 54', heading: 'Sale' },
      { no: 'S. 58', heading: 'Mortgage' },
      { no: 'S. 105', heading: 'Lease' },
      { no: 'S. 122', heading: 'Gift' },
    ],
    relatedJudgmentIds: ['j3'],
  },
  {
    id: 'hma',
    name: 'Hindu Marriage Act, 1955',
    shortName: 'HMA',
    year: '1955',
    category: 'Family Law',
    sections: [
      { no: 'S. 13', heading: 'Divorce' },
      { no: 'S. 13B', heading: 'Divorce by mutual consent' },
      { no: 'S. 24', heading: 'Maintenance pendent lite and expenses of proceedings' },
      { no: 'S. 25', heading: 'Permanent alimony and maintenance' },
    ],
    relatedJudgmentIds: ['j2'],
  },
  {
    id: 'hsa',
    name: 'Hindu Succession Act, 1956',
    shortName: 'HSA',
    year: '1956',
    category: 'Family Law',
    sections: [
      { no: 'S. 6', heading: 'Devolution of interest in coparcenary property (as amended, 2005)' },
      { no: 'S. 8', heading: 'General rules of succession in the case of males' },
      { no: 'S. 15', heading: 'General rules of succession in the case of female Hindus' },
    ],
    relatedJudgmentIds: [],
  },
  {
    id: 'sma',
    name: 'Special Marriage Act, 1954',
    shortName: 'SMA',
    year: '1954',
    category: 'Family Law',
    sections: [
      { no: 'S. 4', heading: 'Conditions relating to solemnization of special marriages' },
      { no: 'S. 5', heading: 'Notice of intended marriage' },
      { no: 'S. 6 ff.', heading: 'Solemnization and registration provisions (demo index)' },
    ],
    relatedJudgmentIds: [],
  },
  {
    id: 'pwdva',
    name: 'Protection of Women from Domestic Violence Act, 2005',
    shortName: 'DV Act',
    year: '2005',
    category: 'Family Law',
    sections: [
      { no: 'S. 3', heading: 'Definition of domestic violence' },
      { no: 'S. 18', heading: 'Protection orders' },
      { no: 'S. 22', heading: 'Monetary relief' },
      { no: 'S. 31', heading: 'Penalty for breach of protection order' },
    ],
    relatedJudgmentIds: ['j2'],
  },
  {
    id: 'ndps',
    name: 'Narcotic Drugs and Psychotropic Substances Act, 1985',
    shortName: 'NDPS Act',
    year: '1985',
    category: 'Special Laws',
    sections: [
      { no: 'S. 2', heading: 'Definitions (incl. “small quantity” and “commercial quantity”)' },
      { no: 'S. 20', heading: 'Punishment for contravention in relation to opium, etc.' },
      { no: 'S. 37', heading: 'Offences to be cognizable and non-bailable — restrictions on bail' },
      { no: 'S. 50', heading: 'Conditions under which search of persons shall be conducted' },
      { no: 'S. 64A', heading: 'Immunity from prosecution to addicts volunteering for treatment' },
    ],
    relatedJudgmentIds: ['j4'],
  },
  {
    id: 'pocso',
    name: 'Protection of Children from Sexual Offences Act, 2012',
    shortName: 'POCSO Act',
    year: '2012',
    category: 'Special Laws',
    sections: [
      { no: 'S. 1', heading: 'Short title, extent and commencement' },
      { no: 'S. 2', heading: 'Definitions' },
      { no: 'S. 4', heading: 'Punishment for penetrative sexual assault' },
      { no: 'S. 19', heading: 'Reporting of offences' },
    ],
    relatedJudgmentIds: [],
  },
  {
    id: 'mva',
    name: 'Motor Vehicles Act, 1988',
    shortName: 'MV Act',
    year: '1988',
    category: 'Special Laws',
    sections: [
      { no: 'S. 166', heading: 'Application for compensation' },
      { no: 'S. 163A', heading: 'Special provisions as to payment of compensation on structured formula basis' },
      { no: 'S. 173', heading: 'Appeals' },
    ],
    relatedJudgmentIds: ['j6'],
  },
  {
    id: 'cpa',
    name: 'Consumer Protection Act, 2019',
    shortName: 'CPA',
    year: '2019',
    category: 'Special Laws',
    sections: [
      { no: 'S. 2', heading: 'Definitions' },
      { no: 'S. 35', heading: 'Manner in which complaint shall be made' },
      { no: 'S. 38 ff.', heading: 'Complaints where value of goods/services exceeds limits (demo index)' },
      { no: 'S. 69', heading: 'Limitation period for filing of complaint (demo index entry — verify on India Code)' },
    ],
    relatedJudgmentIds: ['j7'],
  },
]

export const statuteCategories = [
  'Constitution',
  'Criminal Law',
  'Civil Law',
  'Family Law',
  'Special Laws',
]

export const statuteById = (id: string): Statute | undefined =>
  statutes.find((s) => s.id === id)
