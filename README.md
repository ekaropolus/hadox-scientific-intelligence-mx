# Hadox Scientific Intelligence - Mexico

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-open%20research%20prototype-146B55.svg)](docs/concept-note.pdf)

An open research and engineering reference for building evidence-backed regional capability intelligence in Mexico. The project explores how public evidence, explicit methodologies, and reviewable workflows can support science-to-market opportunity discovery without hiding uncertainty behind a single opaque score.

## Start here

- [Concept note (PDF)](docs/concept-note.pdf)
- [Concept note source](docs/concept-note.md)
- [Concept-note editorial guide](docs/CONCEPT_NOTE_EDITORIAL_GUIDE.md)
- [Open-core manifest](OPEN_CORE_MANIFEST.md)
- [Contribution guide](CONTRIBUTING.md)
- [Data and third-party terms](DATA_LICENSES.md)
- [Security and responsible disclosure](SECURITY.md)

## What is open

- Country and regional data contracts
- Module plugin and data-package contracts
- Source-ledger, KPI-methodology, and data-quality templates
- Reference framework configuration, RBAC vocabulary, report registry, audit, and data-adapter services
- Mexico state-package registry for Morelos, Queretaro, and Tlaxcala

## What is not in this repository

This is a clean public export. It intentionally excludes credentials, operational databases, private runtime data, client/contact records, raw report packages, the former custom authentication/admin implementation, and the inherited third-party administrative UI shell. Those exclusions prevent personal data, insecure reference deployments, and separately licensed interface code from being redistributed.

The open core is therefore a contribution surface and architectural reference, not a turnkey copy of the former hosted application.

## Where contributions help

- Source adapters for official Mexican datasets
- Transparent confidence and evidence-boundary models
- Region-package validators and reproducibility checks
- Accessible open UI components independent of the legacy shell
- Privacy-safe entity resolution and human-review workflows
- Tests, documentation, and example packages containing synthetic data only

## Rebuild the concept note

The PDF is generated from the tracked Markdown source with the canonical Hadox concept-note style. The build produces a compact three-page US Letter document and runs `pdfinfo` and `pdftotext` preflight checks.

Required tools are Pandoc, XeLaTeX, Poppler, and TeX Gyre Heros. On Ubuntu/Debian:

```bash
sudo apt-get install pandoc texlive-xetex texlive-latex-extra \
  texlive-fonts-recommended poppler-utils fonts-texgyre
make concept-note
```

Use `make concept-note-check` to render into `build/` without replacing the tracked PDF, or `make concept-note-lint` to preflight the tracked source and PDF. The source-to-PDF tooling lives in [`tools/concept-note/`](tools/concept-note/), and the reusable editorial contract is documented in [`docs/CONCEPT_NOTE_EDITORIAL_GUIDE.md`](docs/CONCEPT_NOTE_EDITORIAL_GUIDE.md).

Commit both `docs/concept-note.md` and the regenerated `docs/concept-note.pdf` when the note changes.

## License

Hadox-authored code and documentation in this clean export are licensed under the [Apache License 2.0](LICENSE). The Hadox names, logos, lockups, and other brand identifiers are not granted under Apache-2.0. No dataset is relicensed by this repository. External datasets and third-party dependencies retain their own terms. See [NOTICE](NOTICE), [DATA_LICENSES.md](DATA_LICENSES.md), and the [open-core manifest](OPEN_CORE_MANIFEST.md).
