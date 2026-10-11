#!/usr/bin/env node
import { readFile } from 'node:fs/promises'

const host = process.env.PREVIEW_HOST ?? '127.0.0.1'
const port = process.env.PREVIEW_PORT ?? '4173'
const basePath = (process.env.VITE_BASE ?? '/career-elevator').replace(/\/$/, '')
const landingUrl = `http://${host}:${port}${basePath}/`
const stateDir = process.env.VERIFY_STATE_DIR

async function pidAlive(pid) {
  try {
    process.kill(Number(pid), 0)
    return true
  } catch {
    return false
  }
}

async function main() {
  if (stateDir) {
    try {
      const pid = (await readFile(`${stateDir}/preview.pid`, 'utf8')).trim()
      if (pid && !(await pidAlive(pid))) {
        console.error(`doctor: preview pid ${pid} is not running`)
        process.exit(1)
      }
    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.error('doctor: could not read preview.pid', err.message)
        process.exit(1)
      }
    }
  }

  let res
  try {
    res = await fetch(landingUrl)
  } catch (err) {
    console.error(`doctor: fetch failed for ${landingUrl}:`, err.message)
    process.exit(1)
  }

  if (!res.ok) {
    console.error(`doctor: ${landingUrl} returned ${res.status}`)
    process.exit(1)
  }

  const html = await res.text()
  if (!html.includes('root')) {
    console.error('doctor: landing HTML missing #root mount')
    process.exit(1)
  }

  console.log(`doctor: ok ${landingUrl}`)
}

main()
