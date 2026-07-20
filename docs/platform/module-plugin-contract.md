# Module Plugin Contract

Each intelligence module is a folder under `src/modules/<module-id>` with a `module.config.js` export.

Required fields:

- `id`: stable module identifier and route segment.
- `title`: visible module name.
- `route`: route under `/intelligence`.
- `summary`: short module description.
- `icon`: icon key used by the module sidebar.
- `accent`: platform color tone.
- `permissions`: framework permissions used by RBAC.
- `metrics`: dashboard counters.
- `controlGroups`: secondary rail and page control groups.
- `reportPacks`: seed reports or ideas that ship with the module.

Add the module to `src/modules/index.js` so the framework can render it in navigation and route generation.

Runtime reports may be registered through an implementation-specific service. Mutable report records must stay outside the code plugin contract and be exposed only through an authenticated, authorized API chosen by the deployment.
