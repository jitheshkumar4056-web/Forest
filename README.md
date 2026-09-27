# LEX Kerala

**Legal research, without the digging.**

A mobile-first legal research app designed for lawyers and law students in Kerala, India — built as a realistic, clickable prototype.

![Prototype](https://img.shields.io/badge/status-prototype%20%2F%20demo--data-only-C8A75F)

## What's inside

| Area | What it does |
| --- | --- |
| **Home** | Greeting, universal search bar, quick actions, Kerala High Court recent decisions, "continue researching" topics |
| **Search** | Natural-language and term search with filters for court, year, legal area and bench; results show the relevant paragraph and honest, computed relevance indicators |
| **Judgment detail** | Overview (issue, held, important paragraphs, authorities relied upon), full judgment text with paragraph navigation, citations & later treatment, and personal notes |
| **Verify Citation** | Checks a citation against the bundled database; reports *Found / Not verified* honestly, with later treatment where known |
| **Find Authority** | Enter a legal proposition; get responding paragraphs grouped by court (SC / Kerala HC / other HCs) with *exact phrase match / same legal issue / similar factual context* indicators — no ranking, no confidence scores |
| **Draft Analyser** | Flags sentences in your draft that may need supporting authority and links them to Find Authority, with one-tap citation insertion |
| **Summarizer** | Paste or upload a judgment; get case overview, facts, issues, arguments, reasoning, decision, important paragraphs, cases and statutes |
| **Research folders** | Create / rename / delete folders, per-folder notes, and a "Why I saved this authority" note on every saved judgment |
| **Legal Library** | Index of important Indian legislation with search-within-act and related demo judgments |

## Trust & safety — read this first

This is a **prototype populated entirely with clearly-labelled demo data**.

- No real judgments, citations, quotations or statutory text are included.
- Every citation embeds the marker `DEMO`, and every case card carries a **Demo Data** badge.
- "Verified" in the citation verifier means *matched against the bundled demo database* — nothing more. Unknown citations are reported as **Not verified — no source available**, never invented.
- Relevance indicators are computed from the actual text of each paragraph; results are never ranked or given confidence scores.
- Statute pages show a demo index only — the official text is not bundled; users are directed to India Code.
- The disclaimer appears on Home, Profile and tool screens: *LEX Kerala is a legal research and information tool. It does not provide legal advice. Always verify judgments, statutes, citations and amendments against authoritative sources before relying on them.*

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
```

## Getting it on your phone (no coding needed)

The app is a **web app** — there is no Play Store / App Store file. "Installing" it means putting it on your home screen, after which it opens full-screen with its own icon, like a normal app.

**Easiest way — free permanent link (about 5 minutes):**

1. Download **`LEX-Kerala-app.zip`** from the workspace and double-click it — you get a folder called `LEX-Kerala`.
2. Go to **netlify.com** → sign up free (email is enough).
3. On the Sites page, **drag the `LEX-Kerala` folder** onto the page.
4. After ~30 seconds it gives you a link like `lex-kerala-xyz.netlify.app`.
5. Open that link **on your phone** → tap **Share → Add to Home Screen**.

Done — the icon (gold scales on charcoal) appears on your home screen, the app opens full-screen, and it even works without internet once opened once, because it ships with offline support (a service worker + web app manifest are included in the build).

> Note: your GitHub repository is private, so GitHub Pages hosting isn't available for it on a free plan — Netlify (above) doesn't mind private repos and needs no configuration.

## Tech

- React 18 + TypeScript + Vite
- Tailwind CSS v4 (custom charcoal / forest-green / gold theme)
- Fonts bundled locally via Fontsource (Inter, Source Serif 4, IBM Plex Mono)
- No backend, no analytics — all state lives in memory on the device

## Structure

```
src/
  data/        demo corpus, statutes, sample texts
  lib/         search engine, citation lookup, draft & summary heuristics
  store.tsx    navigation stack, folders, saved items, notes, history
  components/  UI kit, judgment cards, save sheet, bottom nav, toasts
  screens/     one file per screen (20 screens)
scripts/       offline smoke tests (logic + SSR render of every screen)
```

`node scripts` are dev-only checks: `scripts/smoke.ts` exercises the search / verification / analysis engines, `scripts/ssr-check.tsx` renders every screen to catch crashes.
