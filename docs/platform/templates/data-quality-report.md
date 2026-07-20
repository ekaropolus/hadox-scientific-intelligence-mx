# Data Quality Report

Country:
Package date:
Prepared by:
Reviewed by:
Status: Draft

## Executive Summary

- Regions covered:
- Modules supported:
- Highest-confidence sources:
- Main gaps:
- Privacy posture:
- Deployment recommendation:

## Source Coverage

| Category | Source IDs | Coverage | License status | Risk |
| --- | --- | --- | --- | --- |
| Companies and establishments |  |  |  |  |
| Industry classification |  |  |  |  |
| Geodata |  |  |  |  |
| Researcher registry |  |  |  |  |
| Publications and outputs |  |  |  |  |
| Official signals |  |  |  |  |
| Trade and investment context |  |  |  |  |
| Pilot clients |  |  |  |  |

## Region Packages

| Region | Package path | Core tables complete | Detail tables complete | Map join | Public export status |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Table Inventory

| Table | Region | Rows | Required headers present | Source-linked | Privacy-reviewed | Notes |
| --- | --- | ---: | --- | --- | --- | --- |
| sector_summary |  |  |  |  |  |  |
| municipality_summary or local_unit_summary |  |  |  |  |  |  |
| offer_line_summary |  |  |  |  |  |  |
| strategic_vehicle_summary |  |  |  |  |  |  |
| line_operating_prospective |  |  |  |  |  |  |
| line_financial_roadmap |  |  |  |  |  |  |
| priority_line_execution_portfolio |  |  |  |  |  |  |
| priority_line_execution_cards |  |  |  |  |  |  |
| grounded_capability_packages |  |  |  |  |  |  |
| grounded_package_90d_plans |  |  |  |  |  |  |
| grounded_package_pilot_clients_concrete |  |  |  |  |  |  |
| opportunity_graph |  |  |  |  |  |  |
| researcher_product_intelligence |  |  |  |  |  |  |
| researcher_external_outputs |  |  |  |  |  |  |
| researcher_resolution_status |  |  |  |  |  |  |
| official_signal_assessment |  |  |  |  |  |  |
| grounded_capability_matrix |  |  |  |  |  |  |

## Header And Type Validation

- CSV encoding:
- Header language:
- Numeric parse issues:
- Date parse issues:
- Currency parse issues:
- Empty critical fields:
- Duplicate IDs:
- Invalid region codes:
- Invalid local-unit codes:

## Geodata Validation

- Boundary source:
- Geometry ID field:
- CRS:
- Region join success rate:
- Local-unit join success rate:
- Coordinate status:
- Missing coordinates:
- Geometry/license issues:

## Entity Resolution

### Companies

- Deterministic matches:
- Fuzzy matches:
- Manual review required:
- Duplicate companies:
- Contact privacy status:

### Researchers

- Registry ID matches:
- ORCID matches:
- OpenAlex matches:
- Fuzzy matches:
- Unresolved identities:
- Public anonymization status:
- Private crosswalk location:

## Derived KPI Validation

| KPI | Methodology file | Inputs complete | Confidence field present | Notes |
| --- | --- | --- | --- | --- |
| market_entry_score |  |  |  |  |
| science_readiness_score |  |  |  |  |
| investment_readiness_score |  |  |  |  |
| proof_feasibility_score |  |  |  |  |
| international_investment_fit |  |  |  |  |

## Module Readiness

| Module | Data ready | Controls supported | Downloads ready | Main gap |
| --- | --- | --- | --- | --- |
| Investment Dashboard |  |  |  |  |
| Market Intelligence |  |  |  |  |
| Science Capacity |  |  |  |  |
| Product Lines |  |  |  |  |
| Roadmap |  |  |  |  |
| Priority Execution |  |  |  |  |
| Grounded Packages |  |  |  |  |
| 90-Day Board |  |  |  |  |
| Pilot Clients |  |  |  |  |

## Privacy Review

- Researcher names public:
- Researcher IDs anonymized:
- Researcher levels/registry numbers approved:
- Personal emails removed:
- Personal phones removed:
- Private addresses removed:
- Company contacts approved:
- Sensitive fields removed:
- Private crosswalk stored outside public repo:

## Open Risks

| Risk | Severity | Affected module/table | Mitigation | Owner |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Final Checks

- [ ] Source ledger complete.
- [ ] Raw data checksummed.
- [ ] Public CSV headers match the data contract.
- [ ] All user-facing labels are English.
- [ ] All derived KPIs documented.
- [ ] Privacy review complete.
- [ ] Map joins validated.
- [ ] Raw downloads available for visible data.
- [ ] `npm run build` passes.
- [ ] Build, health, and authorization checks pass for the selected deployment target.
- [ ] Protected route checks pass.

## Decision

Recommended status:

- [ ] Approved for platform wiring.
- [ ] Approved for staging deployment.
- [ ] Blocked pending source review.
- [ ] Blocked pending privacy review.
- [ ] Blocked pending data repair.

Reviewer notes:
