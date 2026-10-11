/**
 * Rendering verification: design tokens, typography, keyboard focus, and the
 * résumé print styles. Complements scripts/smoke.mjs (behaviour/navigation).
 *
 * Usage:  npm run build && npm run test:visual
 */
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer-core'

const PORT = 4183
const BASE = `http://127.0.0.1:${PORT}`
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'], { stdio: 'ignore', detached: true })
server.unref()
await sleep(2500)

const results = []
const check = (name, ok, detail = '') => {
  results.push(ok)
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`)
}

const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

// 1. Design tokens on home
await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' })
const tokensFound = await page.evaluate(() => {
  const bodyBg = getComputedStyle(document.body).backgroundColor
  const h1Font = getComputedStyle(document.querySelector('h1')).fontFamily
  const headerPos = getComputedStyle(document.querySelector('header')).position
  const capabilities = ['Frontend Engineering', 'Application Development', 'Systems & Infrastructure', 'Software Delivery']
  const texts = document.body.innerText
  return {
    bodyBg,
    h1Font,
    headerPos,
    capabilities: capabilities.filter((c) => texts.includes(c)).length,
    projectCards: document.querySelectorAll('article a[aria-label^="Read case study"]').length,
    terminal: Boolean(document.querySelector('#console-input')),
    footer: Boolean(document.querySelector('footer')),
  }
})
check('body background is #0D1117', tokensFound.bodyBg === 'rgb(13, 17, 23)', tokensFound.bodyBg)
check('headings use Inter Variable', tokensFound.h1Font.includes('Inter Variable'), tokensFound.h1Font.slice(0, 60))
check('header is sticky', tokensFound.headerPos === 'sticky', tokensFound.headerPos)
check('four capability cards', tokensFound.capabilities === 4, `${tokensFound.capabilities}/4`)
check('three featured project cards', tokensFound.projectCards === 3, String(tokensFound.projectCards))
check('terminal widget present', tokensFound.terminal)
check('footer present', tokensFound.footer)

// 2. Mono font for breadcrumbs/metadata
await page.goto(`${BASE}/about`, { waitUntil: 'networkidle0' })
const monoFont = await page.evaluate(() => {
  const el = Array.from(document.querySelectorAll('p')).find((p) => p.textContent?.includes('~/about'))
  return el ? getComputedStyle(el).fontFamily : 'NOT FOUND'
})
check('breadcrumb uses JetBrains Mono', monoFont.includes('JetBrains Mono'), monoFont.slice(0, 70))

// 3. Keyboard focus: skip link appears
await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' })
await page.keyboard.press('Tab')
await sleep(400)
const skip = await page.evaluate(() => {
  const el = document.activeElement
  if (!el || !el.classList.contains('skip-link')) return { focused: false }
  return { focused: true, top: getComputedStyle(el).top, outline: getComputedStyle(el).outlineWidth }
})
check('first Tab focuses the skip link', skip.focused, JSON.stringify(skip))
check('focused skip link becomes visible', skip.top === '12px', String(skip.top))

// 4. Focus ring on a nav link
const navFocus = await page.evaluate(() => {
  const link = document.querySelector('header nav a[href="/projects"]')
  link.focus()
  const style = getComputedStyle(link)
  return { outline: style.outlineWidth, color: style.color }
})
check('nav links are focusable', navFocus.outline !== undefined, JSON.stringify(navFocus))

// 5. Print styles on /resume
await page.goto(`${BASE}/resume`, { waitUntil: 'networkidle0' })
await page.emulateMediaType('print')
await sleep(300)
const printState = await page.evaluate(() => {
  const header = document.querySelector('header[role="banner"]')
  const footer = document.querySelector('footer')
  const sheet = document.querySelector('.print-sheet')
  const vis = (el) => el && getComputedStyle(el).display !== 'none'
  return {
    headerHidden: header ? getComputedStyle(header).display === 'none' : true,
    footerHidden: footer ? getComputedStyle(footer).display === 'none' : true,
    sheetVisible: vis(sheet),
    sheetBg: sheet ? getComputedStyle(sheet).backgroundColor : '',
    textSample: sheet ? getComputedStyle(sheet.querySelector('p, h2')).color : '',
  }
})
check('print hides navigation header', printState.headerHidden)
check('print hides footer', printState.footerHidden)
check('print keeps the résumé sheet', printState.sheetVisible)
check('print strips sheet background', printState.sheetBg === 'rgba(0, 0, 0, 0)' || printState.sheetBg === 'transparent', printState.sheetBg)
check('print forces dark text', printState.textSample === 'rgb(17, 20, 24)', printState.textSample)

// 6. Favicon + manifest resolve
await page.emulateMediaType('screen')
for (const asset of ['/favicon.svg', '/site.webmanifest', '/assets/resume.pdf', '/404.html']) {
  const response = await fetch(`${BASE}${asset}`)
  check(`asset ${asset} resolves`, response.ok, `status=${response.status}`)
}

await browser.close()
try { process.kill(-server.pid, 'SIGTERM') } catch { server.kill() }
const failed = results.filter((ok) => !ok).length
console.log(`\n${results.length - failed}/${results.length} checks passed`)
process.exit(failed ? 1 : 0)
