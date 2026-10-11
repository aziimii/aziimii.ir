/**
 * Generates public/assets/resume.pdf from the production build.
 *
 * Usage:  npm run build && npm run resume:pdf
 *
 * It serves `dist/` locally, opens the résumé route in headless Chrome, and
 * prints the page with print media applied (navigation removed, monochrome
 * text) so the PDF is ATS-friendly and text-based.
 */
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, copyFileSync } from 'node:fs'
import { setTimeout as sleep } from 'node:timers/promises'
import path from 'node:path'
import puppeteer from 'puppeteer-core'

const PORT = Number(process.env.PORT || 4178)
const BASE = `http://127.0.0.1:${PORT}`
const DIST = path.resolve('dist')
const OUT_PUBLIC = path.resolve('public/assets/resume.pdf')
const OUT_DIST = path.resolve('dist/assets/resume.pdf')

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean)

const chromePath = CHROME_CANDIDATES.find((candidate) => existsSync(candidate))
if (!chromePath) {
  console.error('No Chrome/Chromium binary found. Set CHROME_PATH and retry.')
  process.exit(1)
}

if (!existsSync(DIST)) {
  console.error('dist/ not found. Run `npm run build` first.')
  process.exit(1)
}

async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      if (response.ok || response.status === 404) return
    } catch {
      /* not up yet */
    }
    await sleep(250)
  }
  throw new Error(`Preview server did not start at ${url}`)
}

const server = spawn(
  'npx',
  ['vite', 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'],
  { stdio: 'ignore', detached: true },
)
server.unref()

let browser
let exitCode = 1
try {
  await waitForServer(`${BASE}/resume`)

  browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1240, height: 1754, deviceScaleFactor: 1 })
  await page.goto(`${BASE}/resume`, { waitUntil: 'networkidle0' })

  // Apply print styles so navigation and decorative UI are removed.
  await page.emulateMediaType('print')
  await page.waitForTimeout?.(250)
  await sleep(300)

  mkdirSync(path.dirname(OUT_PUBLIC), { recursive: true })
  await page.pdf({
    path: OUT_PUBLIC,
    format: 'A4',
    printBackground: false,
    preferCSSPageSize: false,
    margin: { top: '15mm', bottom: '15mm', left: '14mm', right: '14mm' },
  })

  copyFileSync(OUT_PUBLIC, OUT_DIST)
  console.log(`PDF written to ${OUT_PUBLIC} (and copied to ${OUT_DIST})`)
  exitCode = 0
} catch (error) {
  console.error('PDF generation failed:', error)
  exitCode = 1
} finally {
  if (browser) await browser.close()
  try {
    process.kill(-server.pid, 'SIGTERM')
  } catch {
    server.kill('SIGTERM')
  }
  process.exit(exitCode)
}
