#!/usr/bin/env node
import { readFile } from 'node:fs/promises'

const stateDir = process.env.VERIFY_STATE_DIR

async function main() {
  if (!stateDir) {
    console.log('cleanup: VERIFY_STATE_DIR unset; nothing to stop')
    return
  }

  let pid
  try {
    pid = (await readFile(`${stateDir}/preview.pid`, 'utf8')).trim()
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('cleanup: no preview.pid')
      return
    }
    throw err
  }

  if (!pid) return

  try {
    process.kill(Number(pid), 'SIGTERM')
    console.log(`cleanup: sent SIGTERM to preview pid ${pid}`)
  } catch (err) {
    if (err.code === 'ESRCH') {
      console.log(`cleanup: pid ${pid} already exited`)
      return
    }
    throw err
  }
}

main()
