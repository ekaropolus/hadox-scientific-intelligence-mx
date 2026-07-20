# Open-core manifest

## Included

- `reference/framework/`: Hadox framework configuration, RBAC vocabulary, and region-selection state contracts.
- `reference/modules/`: report-package registry and module definitions.
- `reference/server-services/`: audit, report registry, runtime storage, data adapter, and Postgres reference services.
- `docs/platform/`: evidence, governance, module, and country-replication contracts.
- `docs/concept-note.md` and `docs/concept-note.pdf`: product rationale grounded in the included source.
- `tools/build_concept_note.py`: reproducible PDF build from the tracked Markdown source.

## Excluded by design

- The inherited third-party Next/Bootstrap administrative template and its assets.
- The former authentication, invitation, session, navigation, and admin-console implementation. It is not an endorsed security reference.
- `.env` files, secrets, keys, tokens, credentials, and deployment state.
- Operational databases and `runtime-data`.
- `public/reports` and other exports that can contain personal, client, contact, or licensed source data.
- Private entity-resolution tables and named outreach lists.

Authentication and authorization are an integration boundary. A deployment must use a maintained identity provider or a separately reviewed implementation; the RBAC file in this repository is only a permission vocabulary.

## Contribution boundary

Contributions must use synthetic or clearly redistributable example data. Never submit personal contact data, client-confidential material, credentials, or source data whose redistribution terms are unclear.
