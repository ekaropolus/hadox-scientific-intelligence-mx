export const dataAdapters = {
  file: {
    id: 'file',
    label: 'Runtime JSON files',
    status: 'active',
    description: 'Fallback zero-dependency adapter for local experiments and constrained deployments.',
  },
  sqlite: {
    id: 'sqlite',
    label: 'SQLite',
    status: 'planned',
    description: 'Single-file database adapter for stronger local installs and small deployments.',
  },
  postgres: {
    id: 'postgres',
    label: 'Postgres',
    status: 'active',
    description: 'Production database adapter backed by JSONB runtime documents and event streams.',
  },
}

export function getActiveDataAdapter() {
  const requested = String(process.env.IAF_DATA_ADAPTER || 'file').trim().toLowerCase()
  return dataAdapters[requested] ?? dataAdapters.file
}

export function getDataLayerStatus() {
  return {
    active: getActiveDataAdapter(),
    adapters: Object.values(dataAdapters),
  }
}
