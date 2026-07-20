# Hadox / Polisplexity concept-note editorial guide

- **Version:** 1.0
- **Effective:** 2026-07-20
- **Status:** Canonical for this repository family
- **Owner:** Hadox Research Labs

This is the reusable production standard for short Hadox / Polisplexity concept notes. It is intentionally operational: a note is not complete merely because it compiles; it must also pass editorial, evidence, and page-by-page visual review.

## 1. Purpose and document contract

A concept note is a compact decision instrument. It should let a serious reader understand the problem, proposed capability, evidence boundary, maturity, and next verifiable step without reading the repository first.

For this family of scientific-intelligence notes, the non-negotiable contract is:

- US Letter (`8.5 × 11 in`), exactly **3 pages**.
- Hadox institutional identity and the approved Hadox Research Labs lockup.
- A dense but readable layout; no standalone cover page and no decorative empty page.
- Claims traceable to code, an included artifact, or a cited authoritative source.
- Explicit separation between implemented, documented, proposed, and not yet validated work.
- A source Markdown file, reproducible PDF build, automated preflight, and manual visual QA.

## 2. Identity and lockup

Use `docs/assets/hadox-research-labs-lockup.png` in the compact page-one header. Preserve its aspect ratio, clear space, and legibility. Do not redraw it, recolor it, stretch it, place it over a busy background, or invent a country/program logo.

The visual language is Hadox: navy for structure, teal for emphasis, restrained neutral fills, thin rules, and small high-information tables. The lockup identifies the publisher; the title identifies the initiative. Do not create a full-bleed or black title cover.

Typography, colors, spacing, headers, and footers are controlled by `tools/concept-note/preamble.tex`. Content authors should use the established semantic components rather than one-off visual styling.

## 3. Density and hierarchy

Every page must advance the decision. Prefer a table, short callout, or compact diagram when it makes relationships clearer than prose. Keep paragraphs short and use section headings that carry meaning. Avoid slogans, repeated introductions, giant headings, raw README dumps, long inventories, and unexplained acronyms.

Target hierarchy:

1. title and decision purpose;
2. thesis and bounded proposition;
3. evidence-to-decision mechanism;
4. maturity, safeguards, and route to validation;
5. an explicit next action.

If the note exceeds three pages, edit the argument before shrinking type or margins. If it is underfilled, strengthen evidence, limitations, decision products, or validation milestones—not decoration.

## 4. Required three-page structure

### Page 1 — Decision frame

- Compact Hadox lockup, title, descriptive subtitle, date/version, geography, audience, and canonical repository URL.
- A context table answering: problem, intended user, decision supported, evidence scope, and current maturity.
- One-sentence thesis: what governed capability is proposed and why it matters.
- “Why this note exists”: the decision or conversation it is meant to enable.
- Two-column proposition and boundary: what the capability does / what it does not claim to do.
- One concrete decision example or tightly bounded use case.

### Page 2 — Mechanism and evidence

- A legible evidence-to-decision flow: sources → normalization → provenance/quality → analytical modules → reviewable products.
- Modules grouped by decision function, not copied as an undifferentiated feature list.
- Architecture/components table showing responsibilities and interfaces at the appropriate level.
- Country- or domain-specific evidence sources, access method, refresh assumptions, and known limitations.
- Safeguards where relevant: privacy, access control, provenance, human review, audit trail, and reproducibility.

### Page 3 — Maturity and route forward

- A claim/maturity ledger using the vocabulary in section 5.
- A `0–30 / 31–60 / 61–90 day` validation route with an observable output for each period.
- Public/private boundary and governance responsibilities.
- Open-contribution route: repository, issues, license, and contribution expectations.
- A single next step with owner/participant type and success condition.
- Compact sources and contact/canonical links.

## 5. Evidence language and maturity ledger

Write as an analyst, not as an advertiser. Every material statement must say what is known and how it is known. Use the following controlled vocabulary:

| Status | Use when | Preferred expression |
|---|---|---|
| Implemented | The referenced code/configuration exists in the public repository and can be inspected | “Implemented in the repository” |
| Reproduced | The included workflow was run and its current output is present and reviewable | “Reproduced from the included pipeline on [date/version]” |
| Documented | A design, schema, or historical result is described, but the present note does not reproduce it | “Documented; not reproduced in this release” |
| Proposed | The capability, integration, service, or operating model is a forward design | “Proposed for validation” |
| Requires validation | Performance, coverage, usefulness, or fitness has not been established | “Requires validation with [data/user/context]” |
| Out of scope | The release deliberately excludes the item | “Not included in the public release” |

The ledger should identify the claim/capability, status, evidence location, limitation, and next validation action. A historical result is not current evidence. A configuration is not a deployed service. A schema is not populated coverage. A scoring method prioritizes review; it does not prove causality, eligibility, quality, or investability.

## 6. Prohibited or bounded claims

Do not state or imply any of the following without direct, current, cited evidence:

- a live production platform, current dashboard, complete geographic coverage, or continuously refreshed data;
- customers, institutional adoption, partnerships, endorsements, revenue, impact, or service-level guarantees;
- validated predictions, causal effects, investability, legal eligibility, scientific quality, or automated due diligence;
- completeness or accuracy of third-party registers;
- the presence of outputs, datasets, identities, private packages, or licensed assets that are not included;
- security, privacy, or compliance certification merely because controls are proposed or configured.

Never expose secrets, credentials, personal data, private paths, licensed UI assets, or internal client material. State the boundary plainly instead of filling gaps with optimistic language.

## 7. Sources, links, and citations

Prefer primary and authoritative sources: official statistical agencies, registries, standards, program documentation, peer-reviewed methods, and the exact repository artifact supporting a technical claim. Link to the specific page or file, not a generic homepage when a precise target exists.

- Keep source labels human-readable and URLs functional.
- Distinguish external evidence from repository evidence.
- Include access or release dates when information can change.
- Use the canonical public repository and issue tracker links.
- Do not cite a source for a stronger claim than the source supports.
- Verify all links before release; remove placeholders and local filesystem paths.

## 8. Build and automated preflight

From the repository root:

```bash
make concept-note
```

The build must use the repository's Pandoc/XeLaTeX pipeline and produce `docs/concept-note.pdf`. Do not replace it with ReportLab, a browser print, or a manually edited binary.

Automated preflight/lint must fail on, at minimum:

- a page count other than three or a page size other than Letter;
- missing Hadox identity asset;
- missing required sections or maturity vocabulary;
- unresolved placeholders, malformed links, local paths, HTML leakage, broken Unicode, `undefined`/`NaN`, or LaTeX errors;
- accidental secrets or sensitive/private material;
- a PDF from which expected text cannot be extracted.

Also run `git diff --check` and review the staged diff so the source, generated PDF, assets, and tooling changes are intentional.

## 9. Mandatory visual QA

Render the final PDF to images with Poppler and inspect **all three pages**, at normal reading size and zoomed in. This review cannot be replaced by a successful build or extracted-text check.

Release only when all of the following are true:

- the lockup is sharp, proportional, and correctly placed;
- no text, table, callout, diagram, URL, header, or footer clips or overlaps;
- type is readable and hierarchy is consistent across all pages;
- page breaks are intentional; no orphan headings, stranded labels, or nearly blank areas remain;
- tables and diagrams can be understood without magnification gymnastics;
- accents, symbols, links, page numbers, and dates render correctly;
- the PDF's visible content matches the source and the maturity ledger;
- every page looks like part of the same Hadox institutional document.

Any visual defect blocks publication. Fix the Markdown or canonical preamble, rebuild, rerender, and inspect all pages again.

## 10. Release checklist

- [ ] Exactly 3 Letter pages; compact Hadox lockup present.
- [ ] Page-one thesis, proposition, and boundary are explicit.
- [ ] Page-two mechanism is evidence-to-decision, not a feature dump.
- [ ] Page-three ledger and 90-day route use observable milestones.
- [ ] Every material claim has a status and evidence location.
- [ ] Limitations and excluded material are plainly stated.
- [ ] Repository, license, issue tracker, sources, and next step are valid.
- [ ] `make concept-note`, lint/preflight, and `git diff --check` pass.
- [ ] Every rendered page has been visually inspected after the final build.
