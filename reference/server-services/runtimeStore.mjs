import fs from 'node:fs'
import path from 'node:path'
import {
  appendPostgresJsonLine,
  readPostgresJson,
  readPostgresJsonLines,
  shouldUsePostgres,
  writePostgresJson,
} from './postgresService.mjs'

export function getRuntimeDir() {
  return process.env.IAF_RUNTIME_DIR
    ? path.resolve(process.env.IAF_RUNTIME_DIR)
    : path.resolve(process.cwd(), 'runtime-data')
}

export function ensureRuntimeDir(...segments) {
  const dir = path.join(getRuntimeDir(), ...segments)
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

export async function readRuntimeJson(relativePath, fallbackValue) {
  if (shouldUsePostgres()) return readPostgresJson(relativePath, fallbackValue)
  const filePath = path.join(getRuntimeDir(), relativePath)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch {
    fs.writeFileSync(filePath, `${JSON.stringify(fallbackValue, null, 2)}\n`)
    return fallbackValue
  }
}

export async function writeRuntimeJson(relativePath, payload) {
  if (shouldUsePostgres()) return writePostgresJson(relativePath, payload)
  const filePath = path.join(getRuntimeDir(), relativePath)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`)
}

export async function appendRuntimeJsonLine(relativePath, payload) {
  if (shouldUsePostgres()) return appendPostgresJsonLine(relativePath, payload)
  const filePath = path.join(getRuntimeDir(), relativePath)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.appendFileSync(filePath, `${JSON.stringify(payload)}\n`)
}

export async function readRuntimeJsonLines(relativePath, limit = 100) {
  if (shouldUsePostgres()) return readPostgresJsonLines(relativePath, limit)
  const filePath = path.join(getRuntimeDir(), relativePath)
  try {
    return fs
      .readFileSync(filePath, 'utf8')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(-limit)
      .map((line) => JSON.parse(line))
      .reverse()
  } catch {
    return []
  }
}
