#!/usr/bin/env node
/**
 * Fetches live stats for portfolio project cards.
 * Run via GitHub Actions cron or manually: node scripts/fetch-stats.mjs
 * Writes to public/stats.json
 */

const STATS_FILE = 'public/stats.json'

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

async function getSquatopiaStats() {
  try {
    const html = await fetchText(
      'https://www.meta.com/experiences/squatopia-infinite-action-roguelike/5461039960620791/'
    )
    const ratingMatch = html.match(/"ratingValue"\s*:\s*([\d.]+)/)
    const countMatch = html.match(/"ratingCount"\s*:\s*(\d+)/)
    if (ratingMatch && countMatch) {
      return { rating: parseFloat(ratingMatch[1]), count: parseInt(countMatch[1]) }
    }
  } catch (e) {
    console.error('Squatopia fetch failed:', e.message)
  }
  return null
}

async function getUnionBankStats() {
  try {
    // Apple lookup API - no auth needed
    const data = await fetchJSON(
      'https://itunes.apple.com/lookup?id=1242291412&country=ph'
    )
    if (data.results?.[0]) {
      const app = data.results[0]
      return {
        rating: Math.round(app.averageUserRating * 10) / 10,
        count: app.userRatingCount
      }
    }
  } catch (e) {
    console.error('UnionBank fetch failed:', e.message)
  }
  return null
}

async function getOCMFloorPrice() {
  try {
    // OpenSea API v2 - no auth needed for basic collection stats
    const data = await fetchJSON(
      'https://api.opensea.io/api/v2/collections/onchainmonkey/stats'
    )
    if (data.total?.floor_price != null) {
      return { floor: Math.round(data.total.floor_price * 100) / 100, currency: 'ETH' }
    }
  } catch (e) {
    console.error('OCM floor fetch failed:', e.message)
  }
  // Fallback: try CoinGecko
  try {
    const data = await fetchJSON(
      'https://api.coingecko.com/api/v3/nfts/onchainmonkey'
    )
    if (data.floor_price?.native_currency != null) {
      return {
        floor: Math.round(data.floor_price.native_currency * 100) / 100,
        currency: 'ETH'
      }
    }
  } catch (e) {
    console.error('OCM CoinGecko fallback failed:', e.message)
  }
  return null
}

async function main() {
  const fs = await import('fs')

  // Load existing stats as fallback
  let existing = {}
  try {
    existing = JSON.parse(fs.readFileSync(STATS_FILE, 'utf8'))
  } catch {}

  console.log('Fetching stats...')

  const [squatopia, unionbank, ocm] = await Promise.allSettled([
    getSquatopiaStats(),
    getUnionBankStats(),
    getOCMFloorPrice()
  ])

  const stats = {
    updatedAt: new Date().toISOString(),
    squatopia: squatopia.value || existing.squatopia || { rating: 4.4, count: 46 },
    unionbank: unionbank.value || existing.unionbank || { rating: 4.7, count: 151267 },
    ocm: ocm.value || existing.ocm || { floor: 0.33, currency: 'ETH' }
  }

  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2) + '\n')
  console.log('Stats written to', STATS_FILE)
  console.log(JSON.stringify(stats, null, 2))
}

main().catch(console.error)
