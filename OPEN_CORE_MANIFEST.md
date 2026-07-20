# Open-core manifest

## Included

- `reference/framework/`: Hadox framework configuration, RBAC vocabulary, and region-selection state contracts.
- `reference/modules/`: report-package registry and module definitions.
- `reference/server-services/`: audit, report registry, runtime storage, data adapter, and Postgres reference services.
- `docs/platform/`: evidence, governance, module, and country-replication contracts.
- `docs/concept-note.md` and `docs/concept-note.pdf`: product rationale grounded in the included source.
- `docs/CONCEPT_NOTE_EDITORIAL_GUIDE.md`: reusable Hadox/Polisplexity production and QA standard for this document family.
- `tools/concept-note/`: reproducible Pandoc/XeLaTeX build and PDF preflight from the tracked Markdown source.
- `docs/assets/hadox-research-labs-lockup.png`: document identity asset, included for official Hadox rendering but excluded from the Apache-2.0 trademark grant.

## Excluded by design

- The inherited third-party Next/Bootstrap administrative template and its assets.
- The former authentication, invitation, session, navigation, and admin-console implementation. It is not an endorsed security reference.
- `.env` files, secrets, keys, tokens, credentials, and deployment state.
- Operational databases and `runtime-data`.
- `public/reports` and other exports that can contain personal, client, contact, or licensed source data.
- Private entity-resolution tables and named outreach lists.
- Any right to use Hadox names, logos, lockups, or other brand identifiers outside unmodified copies of this repository's official documents.

Authentication and authorization are an integration boundary. A deployment must use a maintained identity provider or a separately reviewed implementation; the RBAC file in this repository is only a permission vocabulary.

## Contribution boundary

Contributions must use synthetic or clearly redistributable example data. Never submit personal contact data, client-confidential material, credentials, or source data whose redistribution terms are unclear.
