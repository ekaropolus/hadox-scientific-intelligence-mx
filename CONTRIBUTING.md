# Contributing

Thank you for improving Hadox Scientific Intelligence.

## Good first contributions

- Clarify a data or module contract.
- Add tests or schema validation.
- Implement a source adapter using redistributable public data.
- Build an accessible UI component that does not depend on the excluded legacy template.
- Improve provenance, privacy, confidence, or human-review controls.

## Workflow

1. Open an issue describing the problem, affected evidence boundary, and proposed change.
2. Fork the repository and create a focused branch.
3. Add tests or a reproducible verification note where practical.
4. Use synthetic data in fixtures and examples.
5. If the concept note changes, run `python tools/build_concept_note.py` and commit both the Markdown and regenerated PDF.
6. Submit a pull request explaining what changed, why, and how it was verified.

## Data safety

Do not commit credentials, private datasets, personal emails or phone numbers, named prospect lists, client records, private addresses, or source material without explicit redistribution rights. A useful contribution can describe a schema or adapter without publishing protected records.

Do not reintroduce the excluded legacy authentication/admin code. Identity changes must use a maintained provider or include a focused security review, server-side authorization tests, rate limits, and documented trust boundaries.

By contributing, you agree that your contribution is licensed under Apache-2.0.
