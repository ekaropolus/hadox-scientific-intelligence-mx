import crypto from 'node:crypto'
import { appendRuntimeJsonLine, readRuntimeJsonLines } from './runtimeStore.mjs'

const AUDIT_FILE = 'audit/audit-log.jsonl'

export async function writeAuditEvent({ actor = null, action, target = null, metadata = {}, request = null }) {
  const event = {
    id: crypto.randomUUID(),
    action,
    target,
    actor: actor
      ? {
          id: actor.id ?? null,
          email: actor.email ?? null,
          roles: actor.roles ?? [],
        }
      : null,
    metadata,
    ip: request?.ip ?? request?.headers?.['x-forwarded-for'] ?? null,
    userAgent: request?.headers?.['user-agent'] ?? null,
    createdAt: new Date().toISOString(),
  }
  await appendRuntimeJsonLine(AUDIT_FILE, event)
  return event
}

export async function listAuditEvents({ limit = 100 } = {}) {
  return readRuntimeJsonLines(AUDIT_FILE, limit)
}
