#!/usr/bin/env node
/**
 * Fetches live stats for portfolio project cards.
 * Run via GitHub Actions cron or manually: node scripts/fetch-stats.mjs
 * Writes to public/stats.json.
 *
 * Each source gets its own timestamp in `fetchedAt`. When a source fails,
 * its previous value and timestamp are kept, so the site can hide badges
 * that have gone stale instead of showing frozen numbers. Failures are
 * printed as GitHub Actions warnings so they show up on the run.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

const STATS_FILE = 'public/stats.json'
export const SOURCES = ['squatopia', 'unionbank', 'ocm', 'ethUsd']

const round = (n, places) => Math.round(n * 10 ** places) / 10 ** places
const isNum = (n) => typeof n === 'number' && Number.isFinite(n)

// ---- Parsers: pure, return null when the payload is unusable ----

export function parseSquatopiaHtml(html) {
  const rating = html?.match(/"ratingValue"\s*:\s*"?([\d.]+)/)
  const count = html?.match(/"ratingCount"\s*:\s*"?(\d+)/)
  if (!rating || !count) return null
  const value = { rating: parseFloat(rating[1]), count: parseInt(count[1], 10) }
  return isNum(value.rating) && isNum(value.count) ? value : null
}

export function parseAppStoreLookup(data) {
  const app = data?.results?.[0]
  if (!isNum(app?.averageUserRating) || !isNum(app?.userRatingCount)) {
    return null
  }
  return { rating: round(app.averageUserRating, 1), count: app.userRatingCount }
}

export function parseOpenSeaStats(data) {
  const floor = data?.total?.floor_price
  return isNum(floor) ? { floor: round(floor, 2), currency: 'ETH' } : null
}

export function parseCoinGeckoNft(data) {
  const floor = data?.floor_price?.native_currency
  return isNum(floor) ? { floor: round(floor, 2), currency: 'ETH' } : null
}

export function parseEthPrice(data) {
  const usd = data?.ethereum?.usd
  return isNum(usd) && usd > 0 ? usd : null
}

// ---- Merge: fresh values win, failed sources keep their old value ----

export function buildStats(results, existing = {}, now = new Date()) {
  const iso = now.toISOString()
  const oldStamps = existing.fetchedAt ?? {}
  const stats = { updatedAt: iso, fetchedAt: {} }
  const failed = []

  for (const key of SOURCES) {
    const value = results[key]
    if (value != null) {
      stats[key] = value
      stats.fetchedAt[key] = iso
    } else {
      failed.push(key)
      if (existing[key] != null) {
        stats[key] = existing[key]
        // Files from before per-source stamps only have updatedAt.
        stats.fetchedAt[key] = oldStamps[key] ?? existing.updatedAt ?? null
      }
    }
  }
  return { stats, failed }
}

// ---- Network ----

async function fetchJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url}: ${res.status}`)
  return res.json()
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; stats-bot/1.0)' }
  })
  if (!res.ok) throw new Error(`${url}: ${res.status}`)
  return res.text()
}

function warn(message) {
  // GitHub Actions turns this into a visible annotation on the run.
  if (process.env.GITHUB_ACTIONS)
    console.log(`::warning title=Stats::${message}`)
  else console.warn(`warning: ${message}`)
}

async function attempt(label, fn) {
  try {
    const value = await fn()
    if (value == null) warn(`${label}: response had no usable data`)
    return value
  } catch (e) {
    warn(`${label}: ${e.message}`)
    return null
  }
}

async function fetchAll() {
  const [squatopia, unionbank, ocm, ethUsd] = await Promise.all([
    attempt('Squatopia (Meta store)', async () =>
      parseSquatopiaHtml(
        await fetchText(
          'https://www.meta.com/experiences/squatopia-infinite-action-roguelike/5461039960620791/'
        )
      )
    ),
    attempt('UnionBank (App Store)', async () =>
      parseAppStoreLookup(
        await fetchJSON(
          'https://itunes.apple.com/lookup?id=1242291412&country=ph'
        )
      )
    ),
    (async () =>
      (await attempt('OCM floor (OpenSea)', async () =>
        parseOpenSeaStats(
          await fetchJSON(
            'https://api.opensea.io/api/v2/collections/onchainmonkey/stats'
          )
        )
      )) ??
      (await attempt('OCM floor (CoinGecko fallback)', async () =>
        parseCoinGeckoNft(
          await fetchJSON('https://api.coingecko.com/api/v3/nfts/onchainmonkey')
        )
      )))(),
    attempt('ETH price (CoinGecko)', async () =>
      parseEthPrice(
        await fetchJSON(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        )
      )
    )
  ])
  return { squatopia, unionbank, ocm, ethUsd }
}

async function main() {
  let existing = {}
  try {
    existing = JSON.parse(readFileSync(STATS_FILE, 'utf8'))
  } catch {
    // First run or unreadable file: start empty.
  }

  console.log('Fetching stats...')
  const { stats, failed } = buildStats(await fetchAll(), existing)
  writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2) + '\n')
  console.log('Stats written to', STATS_FILE)
  console.log(JSON.stringify(stats, null, 2))
  if (failed.length) warn(`kept previous values for: ${failed.join(', ')}`)
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
}
