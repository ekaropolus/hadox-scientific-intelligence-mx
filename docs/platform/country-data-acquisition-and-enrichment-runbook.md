# Country Data Acquisition And Enrichment Runbook

Use this runbook before building a new Scientific Intelligence country platform from the open web, official data portals, private datasets, or already prepared reports.

This document closes the gap between "we know what the platform needs" and "an AI agent can find, process, enrich, validate, and package the information for another country."

## Required Inputs

Before an agent starts, it must receive or create:

- `docs/templates/country-platform-spec.yaml`
- `docs/templates/source-ledger.yaml`
- `docs/templates/derived-kpi-methodology.yaml`
- `docs/templates/data-quality-report.md`

The agent must not start app implementation until the source ledger has enough coverage to support at least the Market Intelligence, Science Capacity, Product Lines, and Investment Dashboard modules.

## Acquisition Principles

- Prefer official sources over scraped aggregators.
- Prefer bulk downloads and APIs over browser scraping.
- Record license and terms before collecting data.
- Capture source date, access date, and refresh cadence.
- Keep raw data immutable.
- Separate raw, normalized, enriched, and public-export layers.
- Never put secrets, API keys, private crosswalks, or sensitive source dumps inside `public`.
- Do not publish personal data unless the project has a documented legal basis.
- Use source citations and confidence notes in every derived table.
- If a metric is inferred or modeled, label it as inferred or modeled.

## Source Priority Matrix

| Domain | Tier 1 | Tier 2 | Tier 3 | Avoid unless approved |
| --- | --- | --- | --- | --- |
| Companies and establishments | National business registry, official economic census, official open-data portal | Licensed business directory, sector association registry | Company websites and public search results | Contact databases with unclear consent |
| Industry classification | National statistical classification, official crosswalk to ISIC/NACE/NAICS/SCIAN | International classification crosswalk | Analyst-created taxonomy | Unmapped text categories |
| Geodata | National mapping agency, official statistical boundaries | Regional government GeoJSON, international open boundaries when license allows | Curated centroids with source notes | Hand-drawn or fake shapes |
| Researcher registry | National researcher registry, grant agency registry, public university staff directories | ORCID, OpenAlex, Crossref, institutional repositories | Search engine enrichment with source URLs | Private CVs or personal profiles without approval |
| Publications and outputs | OpenAlex, Crossref, PubMed, national repositories, university repositories | Publisher metadata where license allows | Project-specific scraping with citation | Full-text extraction that violates terms |
| Patents and IP | National patent office, international patent offices, university technology transfer pages | University spinout and commercialization pages | Company patent pages | Unlicensed patent databases |
| Public funding and grants | National science agency, regional funds, official procurement/grants portals | International donor portals, development banks | News mentions with source notes | Claims without source URL |
| Trade and investment context | National statistics office, central bank, investment promotion agency | International economic organizations and development banks | Consulting/news summaries | Paywalled text copied into outputs |
| Institutions and infrastructure | Official institution pages, ministries, university research center listings | Knowledge transfer offices, incubator directories | News releases with source notes | Unverified directory listings |

## Discovery Workflow

### 1. Administrative Geography

Find:

- Country ISO codes.
- Region level used by the platform selector.
- Local unit level used by maps and market concentration.
- Official codes for each region and local unit.
- Boundary geometry and centroid data.
- Name aliases, accents, historical names, and code changes.

Deliverables:

- Region registry rows for `reportConfig.js`.
- Geodata source entry in the source ledger.
- A region/local-unit mapping table.

### 2. Market Demand Base

Find:

- Company or establishment registry.
- Industry classification and crosswalk.
- Company size field or proxy.
- Location fields and coordinates.
- Contact fields, if legally usable.
- Sector or activity descriptions.

Normalize into:

- `sector_summary`
- `municipality_summary` or country-specific local-unit summary.
- `offer_line_summary`
- `strategic_vehicle_summary`
- `opportunity_graph`

If coordinates are missing, use official geocoding, official locality centroids, or a documented geocoding service. Mark coordinates as exact, geocoded, centroid, or missing.

### 3. Science Capacity Base

Find:

- Researcher registry or equivalent.
- Public researcher levels, grant levels, or registry IDs.
- Institution affiliations.
- Disciplines, topics, areas, labs, centers, or departments.
- Publication/output identifiers.
- ORCID/OpenAlex/Crossref matching fields.

Normalize into:

- `researcher_product_intelligence`
- `researcher_external_outputs`
- `researcher_resolution_status`
- `sector_candidates`

For public platform exports, replace names with anonymized researcher IDs unless the spec approves named publication.

### 4. Institutional And Official Signals

Find:

- University technology transfer pages.
- Research center pages.
- Public innovation infrastructure.
- Labs, equipment centers, incubators, accelerators, testbeds.
- Public grants, contracts, patent pages, spinout listings.

Normalize into:

- `official_signal_assessment`
- enriched fields in `refined_line_match_enriched`
- official signal counts and categories in product-line tables.

### 5. Product Line Construction

Use the market and science bases to build product/service lines.

Required logic:

- Cluster market demand by sector, theme, buyer problem, local unit, and company size.
- Cluster science capacity by discipline, methods, outputs, application domains, institutions, and evidence strength.
- Match demand clusters to science clusters.
- Write a short investor thesis per line.
- Assign recommended commercialization vehicle.
- Estimate readiness, budget band, time to first revenue, risk pressure, and 12/24/36-month milestones.

Normalize into:

- `line_operating_prospective`
- `line_financial_roadmap`
- `refined_line_match_enriched`

### 6. Grounded Package Construction

Create grounded packages from product lines and researcher/institution evidence.

Required logic:

- Each package must connect to a product line.
- Each package must include institution evidence.
- Each package must include anonymized researcher evidence or approved public names.
- Each package must include evidence boundary language.
- Each package must have a product/service direction.

Normalize into:

- `grounded_capability_packages`
- `grounded_capability_matrix`
- `grounded_capability_package_members`
- `grounded_package_portfolio`
- `grounded_package_priority_top4`

### 7. Execution And Pilot Construction

Create proof-ready actions.

Required logic:

- Rank packages and lines by investor relevance.
- Identify first deliverables and 90-day gates.
- Assign owner roles, not personal names, unless approved.
- Match packages to pilot client profiles and concrete accounts when allowed.
- Define go/no-go criteria.

Normalize into:

- `priority_line_execution_portfolio`
- `priority_line_execution_cards`
- `grounded_package_90d_plans`
- `grounded_package_weekly_board_summary`
- `grounded_package_weekly_board`
- `grounded_package_named_summary`
- `grounded_package_named_weekly_board`
- `grounded_package_pilot_clients_concrete`

## Working Directory Model

Do not use `public/reports` as the working data lake. Use it only for the final curated package.

Recommended local build layout:

```text
working-data/{country-code}/
  00_source-ledger/
  01_raw/
  02_normalized/
  03_enriched/
  04_scoring/
  05_public_exports/
  06_quality_reports/
  07_private_crosswalks/
```

Large generated data should live under a configurable workspace such as `working-data/` or an external managed volume, not inside tracked source directories. Keep private crosswalks and secrets outside the app repository.

Only copy deployment-ready, privacy-reviewed files into:

```text
public/reports/{region-slug}
```

## ETL Rules

### Raw Layer

Store original files exactly as received:

- source filename.
- source URL or access path.
- access date.
- checksum.
- source license.
- collection method.

Never edit raw files.

### Normalized Layer

Normalize:

- encoding to UTF-8.
- column names to English snake_case.
- date formats to ISO.
- numbers to parseable numeric fields.
- currency fields to amount plus currency code or budget band plus currency code.
- country, region, and local-unit codes.
- industry codes and labels.
- missing values to empty string or null, consistently.

### Enriched Layer

Add:

- geocodes or geometry IDs.
- industry crosswalks.
- sector family.
- theme.
- offer line candidates.
- strategic vehicle candidates.
- researcher output matching.
- institution signal categories.
- evidence confidence.
- source citations.
- privacy status.

### Scoring Layer

Calculate:

- `market_entry_score`
- `science_readiness_score`
- `investment_readiness_score`
- `proof_feasibility_score`
- `international_investment_fit`

Every score must reference `docs/templates/derived-kpi-methodology.yaml`.

### Public Export Layer

Before exporting:

- remove private columns.
- anonymize people.
- keep allowed company fields only.
- keep source and confidence fields.
- ensure all headers match `docs/country-platform-data-contract.md`.
- ensure the app can download every table.

## Enrichment Methods

### Entity Resolution

Use deterministic matching before fuzzy matching.

Company matching order:

1. official company ID.
2. tax or registration ID when legally usable.
3. normalized legal name plus address/local unit.
4. normalized website domain.
5. fuzzy name match with manual review flag.

Researcher matching order:

1. national researcher registry ID.
2. ORCID.
3. OpenAlex author ID.
4. institution email or official profile URL, if public and allowed.
5. normalized full name plus institution plus discipline.
6. fuzzy name match with manual review flag.

Every unresolved or fuzzy match must appear in `researcher_resolution_status` or a matching quality table.

### Topic And Product Inference

Allowed inference inputs:

- publication titles.
- abstracts when license allows.
- keywords.
- public project descriptions.
- institution/lab descriptions.
- patent abstracts.
- public grant descriptions.
- company activity descriptions.

For each inferred product hypothesis:

- include evidence text summary.
- include source URLs.
- include confidence score.
- include inference boundary.
- avoid claiming operational readiness without official signal evidence.

### Web Enrichment

When using the web:

- capture the URL and access date.
- prefer official pages.
- do not copy long copyrighted text into outputs.
- summarize in original words.
- cite the source in source fields.
- respect robots, terms, and rate limits.
- keep screenshots or HTML only when license and project policy allow it.

### LLM Enrichment

LLMs can help classify, summarize, and generate hypotheses, but final tables need source-grounded evidence.

Allowed LLM tasks:

- translate labels to English.
- classify activity descriptions into themes.
- propose offer lines.
- propose strategic vehicles.
- summarize public evidence.
- identify missing fields.
- draft investor theses from structured evidence.

Not allowed without human review:

- inventing companies, institutions, researchers, budgets, or contacts.
- assigning researcher levels without source.
- creating coordinates without geodata or geocoding source.
- labeling a project investment-ready without evidence.
- publishing personal data extracted from unapproved sources.

## Derived KPI Formulas

Default scoring should use 0-100 scales.

Recommended KPIs:

- `market_entry_score`: demand scale, sector concentration, local concentration, company size diversity, contactability, buyer-problem clarity.
- `science_readiness_score`: researcher depth, institutional depth, output evidence, official signals, identity resolution, application fit.
- `investment_readiness_score`: market entry, science readiness, time to revenue, budget feasibility, risk pressure, international fit.
- `proof_feasibility_score`: deliverable clarity, gate clarity, client availability, owner completeness, budget clarity, risk manageability.
- `international_investment_fit`: exportability, foreign partner fit, defensibility, applied science depth, buyer urgency.

Use `docs/templates/derived-kpi-methodology.yaml` to document final weights.

## Quality Gates

The data package is not ready until all are true:

- Source ledger covers every source used by public exports.
- Raw files are immutable and checksummed.
- Normalized files use English snake_case headers.
- Every public table has source fields or source references.
- Every derived metric has a documented formula.
- Every person field is anonymized or explicitly approved.
- Company contact fields are approved or removed.
- Geodata joins succeed for every mapped unit.
- At least one module-relevant dataset exists for each allowed region.
- Each module can download its raw tables.
- App build passes.
- The selected deployment target passes its smoke test.
- A data quality report exists for the country and each region.

## Autonomous Agent Workflow

An AI agent should run the project in phases and stop for review at each gate.

| Phase | Work | Required output | Gate |
| --- | --- | --- | --- |
| 0. Brief | Read docs and fill initial assumptions. | Country spec draft, source search plan, risks. | Human approves scope. |
| 1. Source discovery | Find official and trusted sources. | Source ledger, rejected sources, coverage gaps. | Human approves source set and privacy posture. |
| 2. Ingestion and normalization | Collect raw data and normalize tables. | Raw inventory, normalized tables, checksums. | Headers, row counts, and licenses reviewed. |
| 3. Enrichment and scoring | Resolve entities, enrich web evidence, calculate KPIs. | Enriched tables, resolution report, KPI methodology. | Scoring and confidence reviewed. |
| 4. Report package generation | Create public package. | `public/reports/{region-slug}`, quality report. | Privacy/export review passes. |
| 5. Platform wiring | Update registry, selector, maps, modules, legal/support. | App changes and module downloads. | `npm run build` passes. |
| 6. Deployment smoke test | Build the selected target and test the service. | Health, identity-provider, authorization, module, and feedback checks. | Deployment approval. |

## Minimum Agent Final Report

Every autonomous build attempt must finish with:

- country and region list.
- source ledger path.
- generated report package paths.
- tables created and row counts.
- derived KPIs and methodology path.
- privacy removals/anonymization notes.
- unresolved data gaps.
- files changed.
- commands run.
- build and deployment-target status.
- recommended next human review.
