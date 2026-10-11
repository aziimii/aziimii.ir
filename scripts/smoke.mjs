/**
 * Headless-browser smoke test for the production build.
 *
 * Usage:  npm run build && npm test
 *
 * Verifies, against the real built site:
 *   - every required route renders with a unique title and no console errors
 *   - desktop navigation, project filters, project detail navigation
 *   - résumé PDF asset + print button
 *   - the console widget navigates to real routes
 *   - mobile navigation drawer works at a phone viewport
 *   - the 404 page renders for unknown paths
 *   - every internal link found in the built HTML resolves
 */
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer-core'

const PORT = Number(process.env.PORT || 4179)
const BASE = `http://127.0.0.1:${PORT}`

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean)
const chromePath = CHROME_CANDIDATES.find((candidate) => existsSync(candidate))

if (!chromePath) {
  console.error('FAIL: no Chrome/Chromium binary found (set CHROME_PATH).')
  process.exit(1)
}
if (!existsSync('dist/index.html')) {
  console.error('FAIL: dist/index.html missing. Run `npm run build` first.')
  process.exit(1)
}

const results = []
function check(name, ok, detail = '') {
  results.push({ name, ok, detail })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`)
}

async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      if (response.status > 0) return
    } catch {
      /* not up yet */
    }
    await sleep(250)
  }
  throw new Error(`preview server did not start at ${url}`)
}

const server = spawn(
  'npx',
  ['vite', 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'],
  { stdio: 'ignore', detached: true },
)
server.unref()

const consoleErrors = []
let browser

try {
  await waitForServer(`${BASE}/`)

  browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  })

  const page = await browser.newPage()
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(`console.error: ${message.text()}`)
  })
  page.on('pageerror', (error) => consoleErrors.push(`pageerror: ${error.message}`))
  page.on('requestfailed', (request) => {
    const failure = request.failure()?.errorText ?? ''
    // Aborts are caused by the test navigating away mid-request, not by the app.
    if (failure.includes('ERR_ABORTED')) return
    consoleErrors.push(`requestfailed: ${request.url()} (${failure})`)
  })

  await page.setViewport({ width: 1440, height: 900 })

  /* ---------- 1. Route rendering + titles ---------- */
  const routes = [
    { path: '/', titleIncludes: 'Ahmad Azimi', heading: 'Building software with engineering discipline.' },
    { path: '/about', titleIncludes: 'About', heading: 'About' },
    { path: '/projects', titleIncludes: 'Projects', heading: 'Projects' },
    { path: '/projects/sherafat-gold-platform', titleIncludes: 'Sherafat Gold Platform' },
    { path: '/resume', titleIncludes: 'Résumé', heading: 'Résumé' },
    { path: '/notes', titleIncludes: 'Engineering Notes' },
    { path: '/notes/designing-a-maintainable-react-application', titleIncludes: 'Designing a Maintainable React Application' },
    { path: '/contact', titleIncludes: 'Contact' },
  ]

  for (const route of routes) {
    consoleErrors.length = 0
    await page.goto(`${BASE}${route.path}`, { waitUntil: 'networkidle0' })
    await page.waitForSelector('h1', { timeout: 8000 })
    if (route.path === '/resume') {
      // Wait for the PDF availability check so it is not cancelled by navigation.
      await page.waitForSelector('a[download]', { timeout: 8000 }).catch(() => {})
      await sleep(400)
    }
    const title = await page.title()
    const h1 = await page.$eval('h1', (el) => el.textContent?.trim() ?? '')
    check(
      `route ${route.path} renders`,
      title.includes(route.titleIncludes) && h1.length > 0,
      `title="${title}" h1="${h1.slice(0, 60)}"`,
    )
    check(`route ${route.path} has no console errors`, consoleErrors.length === 0, consoleErrors.join(' | '))
  }

  /* ---------- 2. 404 page ---------- */
  consoleErrors.length = 0
  await page.goto(`${BASE}/definitely-not-a-page`, { waitUntil: 'networkidle0' })
  const notFoundText = await page.evaluate(() => document.body.innerText)
  check(
    'unknown route shows the 404 page',
    notFoundText.includes('This route does not exist.') && notFoundText.includes('error 404'),
  )
  check('404 route has no console errors', consoleErrors.length === 0, consoleErrors.join(' | '))

  /* ---------- 3. Desktop navigation ---------- */
  consoleErrors.length = 0
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' })
  await page.click('header nav a[href="/projects"]')
  await page.waitForFunction(() => window.location.pathname === '/projects', { timeout: 5000 })
  await page.waitForSelector('input[aria-label^="Search projects"]', { timeout: 8000 })
  check('desktop nav navigates to /projects', (await page.url()).endsWith('/projects'))

  const activeCount = await page.$$eval('header nav a[aria-current="page"]', (els) => els.length)
  check('active route indicator present', activeCount === 1, `aria-current count=${activeCount}`)

  /* ---------- 4. Project filters (real metadata) ---------- */
  const countText = async () =>
    page.$eval('[aria-live="polite"]', (el) => el.textContent?.trim() ?? '')

  const before = await countText()
  check('filter shows all projects initially', before.includes('3 of 3'), before)

  await page.type('input[aria-label^="Search projects"]', 'docker')
  await sleep(250)
  const afterSearch = await countText()
  check(
    'search filter narrows results',
    afterSearch.includes('of 3') && !afterSearch.includes('3 of 3'),
    afterSearch,
  )

  await page.click('button[aria-label="Clear search text"]')
  await sleep(200)
  await page.evaluate(() => {
    const chips = Array.from(
      document.querySelectorAll('[aria-label="Filter projects by category"] [role="button"]'),
    )
    const target = chips.find((chip) => chip.textContent?.trim() === 'Frontend')
    if (target) target.click()
  })
  await sleep(250)
  const afterCategory = await countText()
  check(
    'category filter narrows results',
    afterCategory.includes('1 of 3'),
    afterCategory,
  )

  const shownTitles = await page.$$eval('article h3', (els) => els.map((el) => el.textContent ?? ''))
  check(
    'category filter shows only frontend project',
    shownTitles.length === 1 && shownTitles[0].includes('Frontend Engineering'),
    shownTitles.join(', '),
  )

  /* ---------- 5. Project detail navigation ---------- */
  await page.evaluate(() => {
    const reset = Array.from(document.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('reset filters'),
    )
    if (reset) reset.click()
  })
  await sleep(250)
  await page.click('article a[aria-label^="Read case study"]')
  await page.waitForFunction(() => window.location.pathname.startsWith('/projects/'), {
    timeout: 5000,
  })
  await page.waitForSelector('nav[aria-label="Case study sections"] a', { timeout: 8000 })
  check('project card opens a case study page', page.url().includes('/projects/'))

  const sectionNav = await page.$$eval('nav[aria-label="Case study sections"] a', (els) => els.length)
  check('case study section navigation renders', sectionNav >= 8, `${sectionNav} section links`)

  /* ---------- 6. Résumé: PDF asset + print ---------- */
  consoleErrors.length = 0
  await page.goto(`${BASE}/resume`, { waitUntil: 'networkidle0' })
  await sleep(600)
  const pdfHref = await page.$eval('a[download]', (el) => el.getAttribute('href')).catch(() => null)
  check('résumé exposes a download link', Boolean(pdfHref), String(pdfHref))
  if (pdfHref) {
    const pdfResponse = await fetch(`${BASE}${pdfHref}`)
    const contentType = pdfResponse.headers.get('content-type') ?? ''
    const bytes = (await pdfResponse.arrayBuffer()).byteLength
    check(
      'résumé PDF asset is reachable and non-empty',
      pdfResponse.ok && bytes > 10_000,
      `status=${pdfResponse.status} bytes=${bytes} type=${contentType}`,
    )
  }
  const printButton = await page.$('button[aria-label="Print this résumé page"]')
  check('résumé exposes a print action', Boolean(printButton))

  const resumeText = await page.evaluate(() => document.body.innerText.toLowerCase())
  check(
    'résumé contains experience and skills sections',
    resumeText.includes('professional experience') &&
      resumeText.includes('technical skills') &&
      resumeText.includes('ghasdak peyk shahr'),
  )

  /* ---------- 7. Console widget navigation ---------- */
  consoleErrors.length = 0
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' })
  await page.focus('#console-input')
  await page.keyboard.type('about')
  await page.keyboard.press('Enter')
  await page.waitForFunction(() => window.location.pathname === '/about', { timeout: 5000 })
  await page.waitForSelector('section#principles', { timeout: 8000 })
  check('console command "about" navigates to /about', page.url().endsWith('/about'))

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' })
  await page.focus('#console-input')
  await page.keyboard.type('not-a-command')
  await page.keyboard.press('Enter')
  await sleep(200)
  const consoleText = await page.$eval('[aria-label="Console output"]', (el) => el.textContent ?? '')
  check(
    'console rejects unknown commands honestly',
    consoleText.includes('command not found'),
  )
  check('console commands run with no console errors', consoleErrors.length === 0, consoleErrors.join(' | '))

  /* ---------- 8. Mobile navigation ---------- */
  consoleErrors.length = 0
  await page.setViewport({ width: 375, height: 812, isMobile: true })
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' })
  const menuButton = await page.$('button[aria-label="Open navigation menu"]')
  check('mobile menu button present', Boolean(menuButton))
  await menuButton.click()
  await page.waitForSelector('#mobile-navigation a[href="/contact"]', { timeout: 5000 })
  check('mobile drawer opens', true)
  await page.click('#mobile-navigation a[href="/contact"]')
  await page.waitForFunction(() => window.location.pathname === '/contact', { timeout: 5000 })
  await page.waitForSelector('section, article', { timeout: 8000 })
  check('mobile drawer navigates to /contact', page.url().endsWith('/contact'))

  const horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  check('no horizontal overflow at 375px', horizontalOverflow <= 1, `overflow=${horizontalOverflow}px`)
  check('mobile route has no console errors', consoleErrors.length === 0, consoleErrors.join(' | '))

  /* ---------- 9. Tablet width sanity ---------- */
  await page.setViewport({ width: 768, height: 1024 })
  await page.goto(`${BASE}/projects`, { waitUntil: 'networkidle0' })
  const tabletOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  check('no horizontal overflow at 768px', tabletOverflow <= 1, `overflow=${tabletOverflow}px`)

  /* ---------- 10. Accessibility basics ---------- */
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' })
  const a11y = await page.evaluate(() => ({
    skipLink: Boolean(document.querySelector('a.skip-link')),
    mainLandmark: Boolean(document.querySelector('main#main-content')),
    navLabel: document.querySelector('nav[aria-label="Primary"]') !== null,
    lang: document.documentElement.lang,
    h1Count: document.querySelectorAll('h1').length,
  }))
  check('skip link present', a11y.skipLink)
  check('main landmark present', a11y.mainLandmark)
  check('primary navigation labelled', a11y.navLabel)
  check('html lang set', a11y.lang === 'en', `lang=${a11y.lang}`)
  check('exactly one h1 on home', a11y.h1Count === 1, `h1 count=${a11y.h1Count}`)

  /* ---------- 11. Internal links resolve ---------- */
  const hrefs = new Set()
  for (const route of ['/', '/about', '/projects', '/resume', '/notes', '/contact']) {
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle0' })
    const found = await page.$$eval('a[href]', (anchors) =>
      anchors.map((a) => a.getAttribute('href') ?? ''),
    )
    found
      .filter((href) => href.startsWith('/') && !href.includes(':'))
      .forEach((href) => hrefs.add(href.split('#')[0]))
  }
  const broken = []
  for (const href of hrefs) {
    const response = await fetch(`${BASE}${href}`)
    if (!response.ok) broken.push(`${href} → ${response.status}`)
  }
  check(
    `all ${hrefs.size} internal links resolve`,
    broken.length === 0,
    broken.join(', '),
  )

  const totalConsoleErrors = consoleErrors.length
  check('no console errors accumulated at end', totalConsoleErrors === 0)
} catch (error) {
  check('smoke test executed without runtime errors', false, String(error))
} finally {
  if (browser) await browser.close()
  try {
    process.kill(-server.pid, 'SIGTERM')
  } catch {
    server.kill('SIGTERM')
  }
}

const failed = results.filter((result) => !result.ok)
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
if (failed.length > 0) {
  console.log('Failed checks:')
  failed.forEach((failure) => console.log(`  - ${failure.name}: ${failure.detail}`))
  process.exit(1)
}
console.log('All smoke checks passed.')
process.exit(0)
