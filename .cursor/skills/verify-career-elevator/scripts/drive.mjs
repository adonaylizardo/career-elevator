#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
function parseArgs(argv) {
  const out = {
    baseUrl: 'http://127.0.0.1:4173/career-elevator',
    artifactDir: 'artifacts/verify-career-elevator/run',
    paypalExpected: 'https://paypal.me/adolizardo/49',
  }
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--base-url') out.baseUrl = argv[++i].replace(/\/$/, '')
    else if (argv[i] === '--artifact-dir') out.artifactDir = argv[++i]
    else if (argv[i] === '--paypal-expected') out.paypalExpected = argv[++i]
  }
  return out
}

async function loadPlaywright() {
  return import('playwright')
}

async function shot(page, path) {
  await mkdir(dirname(path), { recursive: true })
  await page.screenshot({ path, fullPage: true })
}

async function fillStep1(page) {
  await page.locator('#full_name').fill('Verify User')
  await page.locator('#email').fill('verify@example.com')
  await page.locator('#cv_url').fill('https://example.com/cv.pdf')
  await page.locator('#portfolio_url').fill('https://example.com/portfolio')
  await page.locator('#linkedin_url').fill('https://linkedin.com/in/verifyuser')
}

async function fillStep2(page) {
  await page.getByPlaceholder('Title 1').fill('Product Designer')
  await page.locator('#work_from_country').fill('Spain')
  await page.locator('#languages').fill('English (fluent)')
  await page.locator('#work_auth').fill('EU citizen, no sponsorship needed')
  await page.locator('#constraints').fill('No gambling or ad-tech.')
  await page.locator('#timeline').fill('Available immediately')
  await page.locator('#goal_one_liner').fill('Mid-level product design role in SaaS.')
  await page.locator('#pay_floor').fill('75000')
}

async function driveViewport(browser, baseUrl, artifactDir, viewport, prefix, proof) {
  const context = await browser.newContext({ viewport })
  const page = await context.newPage()

  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' })
  await page.getByRole('heading', { level: 1 }).first().waitFor({ state: 'visible' })
  await shot(page, join(artifactDir, `${prefix}-landing.png`))
  proof.pages.push({ viewport: prefix, route: '/', file: `${prefix}-landing.png` })

  await page.goto(`${baseUrl}/checkout`, { waitUntil: 'networkidle' })
  await page.getByRole('heading', { name: 'Checkout' }).waitFor()
  const paypal = page.getByRole('link', { name: /Pay with PayPal/i })
  const href = await paypal.getAttribute('href')
  if (!href || !href.startsWith('https://')) {
    throw new Error(`PayPal link missing or invalid href: ${href}`)
  }
  proof.paypalHref[prefix] = href
  await shot(page, join(artifactDir, `${prefix}-checkout.png`))
  proof.pages.push({ viewport: prefix, route: '/checkout', file: `${prefix}-checkout.png`, paypalHref: href })

  await page.goto(`${baseUrl}/intake`, { waitUntil: 'networkidle' })
  await page.getByText('1 / 3').waitFor()
  await page.getByText('Tú y tus links').waitFor()
  await shot(page, join(artifactDir, `${prefix}-intake-step-1.png`))
  proof.pages.push({ viewport: prefix, route: '/intake', step: 1, file: `${prefix}-intake-step-1.png` })

  await fillStep1(page)
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByText('2 / 3').waitFor()
  await page.getByText('Rol y logística').waitFor()
  await shot(page, join(artifactDir, `${prefix}-intake-step-2.png`))
  proof.pages.push({ viewport: prefix, route: '/intake', step: 2, file: `${prefix}-intake-step-2.png` })

  await fillStep2(page)
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByText('3 / 3').waitFor()
  await page.getByText('Preferencias').waitFor()
  await shot(page, join(artifactDir, `${prefix}-intake-step-3.png`))
  proof.pages.push({ viewport: prefix, route: '/intake', step: 3, file: `${prefix}-intake-step-3.png` })

  await context.close()
}

async function main() {
  const { baseUrl, artifactDir, paypalExpected } = parseArgs(process.argv)
  await mkdir(artifactDir, { recursive: true })

  const { chromium } = await loadPlaywright()
  const browser = await chromium.launch({ headless: true })

  const proof = {
    baseUrl,
    capturedAt: new Date().toISOString(),
    paypalExpected,
    paypalHref: {},
    pages: [],
  }

  try {
    await driveViewport(browser, baseUrl, artifactDir, { width: 1280, height: 800 }, 'desktop-1280', proof)
    await driveViewport(browser, baseUrl, artifactDir, { width: 375, height: 812 }, 'mobile-375', proof)

    for (const [vp, href] of Object.entries(proof.paypalHref)) {
      if (href !== paypalExpected) {
        throw new Error(`${vp}: PayPal href ${href} !== expected ${paypalExpected}`)
      }
    }

    await writeFile(join(artifactDir, 'proof.json'), `${JSON.stringify(proof, null, 2)}\n`)
    console.log(`drive: ok artifacts in ${artifactDir}`)
  } finally {
    await browser.close()
  }
}

main().catch((err) => {
  console.error('drive:', err.message)
  process.exit(1)
})
