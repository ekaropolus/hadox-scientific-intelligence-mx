# Agent Country Build Brief

Use this as the starting instruction for an AI developer/data agent.

## Mission

Build a Scientific Intelligence platform for:

- Country:
- Deployment domain:
- Region selector unit:
- Local map unit:
- Target audience:

The output must be an investor-facing scientific intelligence platform, not a generic dashboard and not a digital twin.

## Read First

Read these files before taking action:

- `docs/country-platform-data-contract.md`
- `docs/country-data-acquisition-and-enrichment-runbook.md`
- `docs/templates/country-platform-spec.yaml`
- `docs/templates/source-ledger.yaml`
- `docs/templates/derived-kpi-methodology.yaml`
- `docs/templates/data-quality-report.md`
- `reference/modules/mx-states/reportConfig.js`
- `reference/framework/state/MxStateSelection.jsx`
- `reference/framework/config/platformInfo.js`
- `OPEN_CORE_MANIFEST.md`

## Required Work

1. Fill the country platform spec.
2. Discover official and trusted sources.
3. Fill the source ledger.
4. Ingest raw data into a non-public working area.
5. Normalize headers and entities.
6. Enrich market, science, institutional, geospatial, and pilot-client evidence.
7. Document derived KPI methodology.
8. Produce privacy-reviewed public report packages under `public/reports/{region-slug}`.
9. Create or adapt the country report registry.
10. Replace country-specific selector and map assumptions.
11. Wire all nine modules.
12. Ensure every module has module-specific controls and raw downloads.
13. Select a maintained identity provider and document authorization boundaries; do not copy the excluded legacy auth implementation.
14. Update branding, legal, status, feedback, and deployment configuration.
15. Run build, pipeline, authorization, and deployment smoke tests.

## Hard Rules

- Do not publish secrets, private crosswalks, or raw sensitive data.
- Do not invent sources, companies, researchers, coordinates, or scores.
- Do not ship fake maps.
- Do not use tables as the main story when a chart, flow, map, radar, or board is the right visual.
- Do not reuse Mexico labels unless the platform is for Mexico.
- Do not use digital twin language unless the project is explicitly a twin.
- Do not publish personal researcher names unless approved.
- Do not publish company contact details unless approved.
- Do not leave user-facing text in a non-English language unless specified.

## Stop Gates

Stop and report before continuing when:

- No official source exists for a required dataset.
- License or terms are unclear.
- A source contains personal data.
- Geodata cannot be joined to report units.
- Derived scoring requires assumptions not in the methodology.
- Required module data is missing.
- Build, authorization, or deployment checks fail.

## Final Response Required

The final response must include:

- Source ledger path.
- Country spec path.
- KPI methodology path.
- Data quality report path.
- Report package paths.
- App files changed.
- Data gaps.
- Privacy decisions.
- Build and deployment results.
- Remaining human review items.
