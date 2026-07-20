import pg from 'pg'

const { Pool } = pg

let pool = null
let initPromise = null

export function shouldUsePostgres() {
  return String(process.env.IAF_DATA_ADAPTER || '').trim().toLowerCase() === 'postgres'
}

function getConnectionString() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || ''
}

export function getPostgresPool() {
  if (!pool) {
    const connectionString = getConnectionString()
    if (!connectionString) throw new Error('POSTGRES_URL_REQUIRED')
    pool = new Pool({ connectionString })
  }
  return pool
}

export async function ensurePostgresSchema() {
  if (!shouldUsePostgres()) return
  if (!initPromise) {
    initPromise = getPostgresPool().query(`
      create table if not exists iaf_runtime_documents (
        key text primary key,
        value jsonb not null,
        updated_at timestamptz not null default now()
      );

      create table if not exists iaf_runtime_events (
        id bigserial primary key,
        stream text not null,
        value jsonb not null,
        created_at timestamptz not null default now()
      );

      create index if not exists iaf_runtime_events_stream_id_idx
        on iaf_runtime_events (stream, id desc);
    `)
  }
  await initPromise
}

export async function readPostgresJson(key, fallbackValue) {
  await ensurePostgresSchema()
  const result = await getPostgresPool().query('select value from iaf_runtime_documents where key = $1', [key])
  if (result.rows[0]) return result.rows[0].value
  await writePostgresJson(key, fallbackValue)
  return fallbackValue
}

export async function writePostgresJson(key, payload) {
  await ensurePostgresSchema()
  await getPostgresPool().query(
    `
      insert into iaf_runtime_documents (key, value, updated_at)
      values ($1, $2::jsonb, now())
      on conflict (key) do update set value = excluded.value, updated_at = now()
    `,
    [key, JSON.stringify(payload)],
  )
}

export async function appendPostgresJsonLine(stream, payload) {
  await ensurePostgresSchema()
  await getPostgresPool().query('insert into iaf_runtime_events (stream, value) values ($1, $2::jsonb)', [
    stream,
    JSON.stringify(payload),
  ])
}

export async function readPostgresJsonLines(stream, limit = 100) {
  await ensurePostgresSchema()
  const result = await getPostgresPool().query(
    'select value from iaf_runtime_events where stream = $1 order by id desc limit $2',
    [stream, limit],
  )
  return result.rows.map((row) => row.value)
}
