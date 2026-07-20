#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { csvFormat, csvParse } from 'd3-dsv'

const ROOT = path.resolve(process.cwd())
const privateRoot = path.resolve(process.env.MX_HADOX_PRIVATE_ROOT || path.join(ROOT, 'private-data'))
const reportSourceRoot = path.resolve(process.env.MX_HADOX_REPORT_SOURCE_ROOT || path.join(privateRoot, 'report-source'))
const publicReportRoot = path.resolve(process.env.MX_HADOX_PUBLIC_REPORT_ROOT || path.join(ROOT, 'public', 'reports'))
const sniiSourcePath = path.resolve(process.env.MX_HADOX_SNII_CSV || path.join(privateRoot, 'snii.csv'))
const privateCrosswalkPath = path.resolve(process.env.MX_HADOX_SNII_CROSSWALK || path.join(privateRoot, 'snii-crosswalk.csv'))
const privateUnresolvedPath = path.resolve(process.env.MX_HADOX_SNII_UNRESOLVED || path.join(privateRoot, 'snii-unresolved.csv'))

for (const [label, privatePath] of [
  ['MX_HADOX_SNII_CROSSWALK', privateCrosswalkPath],
  ['MX_HADOX_SNII_UNRESOLVED', privateUnresolvedPath],
]) {
  if (privatePath === publicReportRoot || privatePath.startsWith(`${publicReportRoot}${path.sep}`)) {
    throw new Error(`${label} must remain outside the public report directory`)
  }
}

const PUBLIC_REFERENCE_RE = /^(?:SNI ref|SNII\/CVU|SNII|CVU)\s+[\w.-]+$/i

const personFields = new Set([
  'full_name',
  'openalex_display_name',
  'selected_profile_name',
  'match_query',
])

const listPersonFields = new Set(['anchor_researchers', 'top_researchers'])
const urlPersonFields = new Set(['source_urls', 'source_url', 'member_urls_sample'])

const stripDiacritics = (value) => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const normalizeKey = (value) =>
  stripDiacritics(value)
    .toUpperCase()
    .replace(/\b(DR|DRA|DR\.|DRA\.|MTRA|MTRO|MC|M\.C\.|PH\.?D\.?)\b/g, ' ')
    .replace(/[^A-ZÑ\s,]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const normalizeInstitution = (value) =>
  normalizeKey(value)
    .replace(/\b(UNIVERSIDAD|AUTONOMA|NACIONAL|INSTITUTO|CENTRO|CENTRO DE|DE|DEL|LA|EL|LOS|LAS|Y|A C|AC|SC|S C)\b/g, ' ')
    .replace(/\b(UNAM|UAEM|IPN|SECIHTI|CONAHCYT|TECNM)\b/g, ' $1 ')
    .replace(/\s+/g, ' ')
    .trim()

const nameVariants = (value) => {
  const raw = String(value ?? '').trim()
  if (!raw) return []
  const variants = new Set([normalizeKey(raw)])
  if (raw.includes(',')) {
    const [family, given] = raw.split(',', 2).map((part) => part.trim())
    variants.add(normalizeKey(`${family} ${given}`))
    variants.add(normalizeKey(`${given} ${family}`))
  }
  return [...variants].filter((item) => item.length >= 6)
}

const sniiNameVariants = (row) => {
  const given = row.nombre ?? ''
  const family1 = row.apellido1 ?? ''
  const family2 = row.apellido2 ?? ''
  return [
    ...nameVariants(`${family1} ${family2}, ${given}`),
    ...nameVariants(`${family1} ${family2} ${given}`),
    ...nameVariants(`${given} ${family1} ${family2}`),
  ]
}

const splitList = (value) =>
  String(value ?? '')
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean)

const stableReferenceNumber = (value) => {
  const text = String(value ?? 'unknown')
  let hash = 0
  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) - hash + text.charCodeAt(index)) | 0
  }
  return String((Math.abs(hash) % 900000) + 100000)
}

const compactWhitespace = (value) => String(value ?? '').replace(/\s+/g, ' ').trim()

const readCsv = (filePath) => csvParse(fs.readFileSync(filePath, 'utf8'))

const walkCsv = (dirPath) => {
  const files = []
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const entryPath = path.join(dirPath, entry.name)
    if (entry.isDirectory()) files.push(...walkCsv(entryPath))
    if (entry.isFile() && entry.name.endsWith('.csv')) files.push(entryPath)
  }
  return files.sort()
}

const sniiRows = readCsv(sniiSourcePath).map((row) => ({
  cvu: compactWhitespace(row.cvu),
  nombre: row.nombre,
  apellido1: row.apellido1,
  apellido2: row.apellido2,
  fullName: compactWhitespace([row.apellido1, row.apellido2, row.nombre].filter(Boolean).join(' ')),
  level: compactWhitespace(row.nivel),
  category: compactWhitespace(row.categoria),
  area: compactWhitespace(row.area_conocimiento),
  discipline: compactWhitespace(row.disciplina),
  institution: compactWhitespace(row.institucion_acreditacion_comision),
  entity: compactWhitespace(row.entidad_acreditacion_comision),
  source: 'datos.gob.mx/snii-s191-2s-2025',
}))

const sniiByName = new Map()
for (const row of sniiRows) {
  for (const key of sniiNameVariants(row)) {
    if (!sniiByName.has(key)) sniiByName.set(key, new Map())
    sniiByName.get(key).set(row.cvu, row)
  }
}

const uniqueRows = (rows) => [...new Map(rows.map((row) => [row.cvu, row])).values()]

const overlapScore = (left, right) => {
  const leftTokens = new Set(normalizeInstitution(left).split(' ').filter((token) => token.length > 2))
  const rightTokens = new Set(normalizeInstitution(right).split(' ').filter((token) => token.length > 2))
  if (!leftTokens.size || !rightTokens.size) return 0
  let overlap = 0
  for (const token of leftTokens) if (rightTokens.has(token)) overlap += 1
  return overlap / Math.max(leftTokens.size, rightTokens.size)
}

const chooseSniiMatch = (name, context = {}) => {
  if (!name || PUBLIC_REFERENCE_RE.test(String(name).trim())) return null
  const candidates = uniqueRows(nameVariants(name).flatMap((key) => [...(sniiByName.get(key)?.values() ?? [])]))
  if (!candidates.length) return null
  if (candidates.length === 1) {
    return { row: candidates[0], method: 'exact_name_unique', confidence: 0.98 }
  }

  const contextInstitution = context.institution_name || context.institution || context.openalex_last_institution || ''
  const scored = candidates
    .map((candidate) => ({
      candidate,
      score: Math.max(overlapScore(contextInstitution, candidate.institution), overlapScore(contextInstitution, candidate.entity)),
    }))
    .sort((a, b) => b.score - a.score)

  if (scored[0]?.score >= 0.35 && scored[0].score > (scored[1]?.score ?? 0)) {
    return { row: scored[0].candidate, method: 'exact_name_institution', confidence: 0.96 }
  }

  return { ambiguous: true, candidates }
}

const reportFiles = walkCsv(reportSourceRoot)
const researcherIdLabels = new Map()
const nameLabels = new Map()
const crosswalkRecords = new Map()
const unresolvedRecords = new Map()

const sourceDatasetUrl = 'https://repodatos.atdt.gob.mx/api_update/secretaria_ciencia_tecnologia/sistema_nacional_investigadoras_investigadores_snii_s191/s191_snii_2s_2025.csv'

const recordMatch = (stateSlug, reportName, context, match) => {
  if (!match?.row?.cvu) return
  const key = `${stateSlug}|${normalizeKey(reportName)}|${match.row.cvu}`
  if (crosswalkRecords.has(key)) return
  crosswalkRecords.set(key, {
    state_slug: stateSlug,
    report_researcher_id: context.researcher_id || '',
    report_name: reportName,
    report_institution: context.institution_name || context.institution || '',
    public_reference: `SNII/CVU ${match.row.cvu}`,
    snii_cvu: match.row.cvu,
    snii_level: match.row.level,
    snii_category: match.row.category,
    snii_area: match.row.area,
    snii_discipline: match.row.discipline,
    snii_institution: match.row.institution,
    snii_entity: match.row.entity,
    match_method: match.method,
    match_confidence: match.confidence,
    source_dataset: sourceDatasetUrl,
  })
}

const recordUnresolved = (stateSlug, reportName, context, reason = 'not_found') => {
  if (!reportName || PUBLIC_REFERENCE_RE.test(String(reportName).trim())) return
  const key = `${stateSlug}|${normalizeKey(reportName)}|${context.researcher_id || ''}|${reason}`
  if (unresolvedRecords.has(key)) return
  unresolvedRecords.set(key, {
    state_slug: stateSlug,
    report_researcher_id: context.researcher_id || '',
    report_name: reportName,
    report_institution: context.institution_name || context.institution || '',
    fallback_reference: fallbackReference(reportName, context),
    reason,
  })
}

function fallbackReference(name, context = {}) {
  const explicit = context.researcher_id || context.openalex_author_id || context.openalex_orcid || name
  return `SNI ref ${stableReferenceNumber(explicit)}`
}

const stateSlugFromFile = (filePath) => {
  const relative = path.relative(reportSourceRoot, filePath)
  return relative.split(path.sep)[0] || ''
}

const labelForPerson = (rawName, context = {}, stateSlug = '') => {
  const raw = compactWhitespace(rawName)
  if (!raw) return raw
  if (PUBLIC_REFERENCE_RE.test(raw)) return raw

  const researcherId = compactWhitespace(context.researcher_id)
  if (researcherId && researcherIdLabels.has(researcherId)) return researcherIdLabels.get(researcherId)

  const canonicalName = compactWhitespace(context.full_name) || raw
  const canonicalKey = normalizeKey(canonicalName)
  if (canonicalKey && nameLabels.has(canonicalKey)) return nameLabels.get(canonicalKey)

  const match = chooseSniiMatch(canonicalName, context)
  if (match?.row?.cvu) {
    const label = `SNII/CVU ${match.row.cvu}`
    if (researcherId) researcherIdLabels.set(researcherId, label)
    if (canonicalKey) nameLabels.set(canonicalKey, label)
    for (const variant of nameVariants(raw)) nameLabels.set(variant, label)
    recordMatch(stateSlug, canonicalName, context, match)
    return label
  }
  if (match?.ambiguous) recordUnresolved(stateSlug, canonicalName, context, 'ambiguous_name')

  const rawMatch = raw !== canonicalName ? chooseSniiMatch(raw, context) : null
  if (rawMatch?.row?.cvu) {
    const label = `SNII/CVU ${rawMatch.row.cvu}`
    if (researcherId) researcherIdLabels.set(researcherId, label)
    if (canonicalKey) nameLabels.set(canonicalKey, label)
    for (const variant of nameVariants(raw)) nameLabels.set(variant, label)
    recordMatch(stateSlug, raw, context, rawMatch)
    return label
  }
  if (rawMatch?.ambiguous) recordUnresolved(stateSlug, raw, context, 'ambiguous_name')

  recordUnresolved(stateSlug, canonicalName, context, 'not_found')
  return fallbackReference(canonicalName, context)
}

const sanitizeTopResearchers = (value, context, stateSlug) =>
  splitList(value)
    .map((item, index) => {
      const match = item.match(/^(.+?)\s*(\[[^\]]+\].*)$/)
      const itemContext = { ...context, full_name: context.full_name || (match ? match[1] : item), researcher_id: context.researcher_id || `${stateSlug}-top-${index}` }
      if (!match) return labelForPerson(item, itemContext, stateSlug)
      return `${labelForPerson(match[1], itemContext, stateSlug)} ${match[2]}`
    })
    .join('; ')

const sanitizeRow = (row, stateSlug) => {
  const sanitized = {}
  for (const [key, value] of Object.entries(row)) {
    const normalizedKey = key.toLowerCase()
    const context = { ...row }
    if (!value) {
      sanitized[key] = value
    } else if (normalizedKey === 'anchor_researchers') {
      sanitized[key] = splitList(value)
        .map((name, index) => labelForPerson(name, { ...context, full_name: name, researcher_id: `${stateSlug}-anchor-${index}-${normalizeKey(name)}` }, stateSlug))
        .join('; ')
    } else if (normalizedKey === 'top_researchers') {
      sanitized[key] = sanitizeTopResearchers(value, context, stateSlug)
    } else if (personFields.has(normalizedKey) || normalizedKey.endsWith('_owner_name')) {
      sanitized[key] = labelForPerson(value, context, stateSlug)
    } else if (urlPersonFields.has(normalizedKey)) {
      sanitized[key] = String(value).replace(/crossref:([^|;]+)/gi, (_match, name) => `crossref:${labelForPerson(name.trim(), context, stateSlug)}`)
    } else {
      sanitized[key] = value
    }
  }
  return sanitized
}

for (const sourceFile of reportFiles) {
  const relativePath = path.relative(reportSourceRoot, sourceFile)
  const destinationFile = path.join(publicReportRoot, relativePath)
  const stateSlug = stateSlugFromFile(sourceFile)
  const rows = readCsv(sourceFile).map((row) => sanitizeRow(row, stateSlug))
  fs.mkdirSync(path.dirname(destinationFile), { recursive: true })
  fs.writeFileSync(destinationFile, `${csvFormat(rows)}\n`)
}

fs.mkdirSync(path.dirname(privateCrosswalkPath), { recursive: true })
fs.writeFileSync(privateCrosswalkPath, `${csvFormat([...crosswalkRecords.values()])}\n`)
fs.writeFileSync(privateUnresolvedPath, `${csvFormat([...unresolvedRecords.values()])}\n`)

console.log(JSON.stringify({
  reportFiles: reportFiles.length,
  sniiRows: sniiRows.length,
  matchedPeople: crosswalkRecords.size,
  unresolvedPeople: unresolvedRecords.size,
  publicReportRoot,
  privateCrosswalkPath,
  privateUnresolvedPath,
}, null, 2))
