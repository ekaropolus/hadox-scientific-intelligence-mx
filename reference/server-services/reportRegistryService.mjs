import crypto from 'node:crypto'
import { readRuntimeJson, writeRuntimeJson } from './runtimeStore.mjs'

const REPORTS_FILE = 'reports/reports.json'

function defaultReportsState() {
  return { version: 1, reports: [] }
}

function nowIso() {
  return new Date().toISOString()
}

function normalizeReport(raw = {}) {
  const moduleId = String(raw.moduleId || '').trim()
  const title = String(raw.title || '').trim()
  if (!moduleId) throw new Error('MODULE_ID_REQUIRED')
  if (!title) throw new Error('REPORT_TITLE_REQUIRED')

  return {
    id: raw.id || crypto.randomUUID(),
    moduleId,
    title,
    type: String(raw.type || 'report').trim() || 'report',
    status: String(raw.status || 'draft').trim() || 'draft',
    summary: String(raw.summary || '').trim(),
    href: String(raw.href || '').trim(),
    tags: Array.isArray(raw.tags) ? raw.tags.map((tag) => String(tag).trim()).filter(Boolean) : [],
    createdAt: raw.createdAt || nowIso(),
    updatedAt: nowIso(),
  }
}

export async function listReports({ moduleId } = {}) {
  const state = await readRuntimeJson(REPORTS_FILE, defaultReportsState())
  const reports = state.reports ?? []
  return moduleId ? reports.filter((report) => report.moduleId === moduleId) : reports
}

export async function upsertReport(rawReport) {
  const state = await readRuntimeJson(REPORTS_FILE, defaultReportsState())
  const report = normalizeReport(rawReport)
  const exists = state.reports.some((entry) => entry.id === report.id)
  const reports = exists
    ? state.reports.map((entry) => (entry.id === report.id ? { ...entry, ...report, createdAt: entry.createdAt } : entry))
    : [...state.reports, report]
  await writeRuntimeJson(REPORTS_FILE, { ...state, reports })
  return report
}

export async function getReportRegistryStatus() {
  const reports = await listReports()
  return {
    total: reports.length,
    ready: reports.filter((report) => report.status === 'ready').length,
    draft: reports.filter((report) => report.status === 'draft').length,
    archived: reports.filter((report) => report.status === 'archived').length,
  }
}
