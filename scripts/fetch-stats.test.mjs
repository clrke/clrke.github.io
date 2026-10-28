import { describe, it, expect } from 'vitest'
import {
  SOURCES,
  buildStats,
  parseAppStoreLookup,
  parseCoinGeckoNft,
  parseEthPrice,
  parseOpenSeaStats,
  parseSquatopiaHtml
} from './fetch-stats.mjs'

describe('parsers', () => {
  it('reads the Meta store JSON-LD rating, quoted or not', () => {
    const html = '<script>{"ratingValue": 4.2, "ratingCount": 50}</script>'
    expect(parseSquatopiaHtml(html)).toEqual({ rating: 4.2, count: 50 })
    const quoted = '{"ratingValue":"4.4","ratingCount":"46"}'
    expect(parseSquatopiaHtml(quoted)).toEqual({ rating: 4.4, count: 46 })
    expect(parseSquatopiaHtml('<html>no rating</html>')).toBeNull()
    expect(parseSquatopiaHtml(undefined)).toBeNull()
  })

  it('reads the App Store lookup and rounds the rating', () => {
    const data = {
      results: [{ averageUserRating: 4.6812, userRatingCount: 178950 }]
    }
    expect(parseAppStoreLookup(data)).toEqual({ rating: 4.7, count: 178950 })
    expect(parseAppStoreLookup({ results: [] })).toBeNull()
    expect(
      parseAppStoreLookup({ results: [{ averageUserRating: 4.7 }] })
    ).toBeNull()
  })

  it('reads OpenSea and CoinGecko floors', () => {
    expect(parseOpenSeaStats({ total: { floor_price: 0.1987 } })).toEqual({
      floor: 0.2,
      currency: 'ETH'
    })
    expect(parseOpenSeaStats({ total: {} })).toBeNull()
    expect(
      parseCoinGeckoNft({ floor_price: { native_currency: 0.199 } })
    ).toEqual({
      floor: 0.2,
      currency: 'ETH'
    })
    expect(parseCoinGeckoNft({})).toBeNull()
  })

  it('reads the ETH price and rejects zero or missing', () => {
    expect(parseEthPrice({ ethereum: { usd: 2369.73 } })).toBe(2369.73)
    expect(parseEthPrice({ ethereum: { usd: 0 } })).toBeNull()
    expect(parseEthPrice({})).toBeNull()
  })
})

describe('buildStats', () => {
  const now = new Date('2026-10-28T08:00:00Z')
  const iso = now.toISOString()
  const fresh = {
    squatopia: { rating: 4.2, count: 50 },
    unionbank: { rating: 4.7, count: 178950 },
    ocm: { floor: 0.2, currency: 'ETH' },
    ethUsd: 2369.73
  }

  it('stamps every source when all fetches succeed', () => {
    const { stats, failed } = buildStats(fresh, {}, now)
    expect(failed).toEqual([])
    expect(stats.updatedAt).toBe(iso)
    for (const key of SOURCES) expect(stats.fetchedAt[key]).toBe(iso)
    expect(stats.unionbank).toEqual(fresh.unionbank)
  })

  it('keeps the old value and old timestamp for a failed source', () => {
    const existing = {
      updatedAt: '2026-10-20T08:00:00Z',
      fetchedAt: { ocm: '2026-10-19T08:00:00Z' },
      ocm: { floor: 0.33, currency: 'ETH' }
    }
    const { stats, failed } = buildStats({ ...fresh, ocm: null }, existing, now)
    expect(failed).toEqual(['ocm'])
    expect(stats.ocm).toEqual({ floor: 0.33, currency: 'ETH' })
    expect(stats.fetchedAt.ocm).toBe('2026-10-19T08:00:00Z')
  })

  it('migrates a legacy file by using its updatedAt as the old stamp', () => {
    const legacy = {
      updatedAt: '2026-10-21T08:00:00Z',
      ethUsd: 2091,
      bettergov: {}
    }
    const { stats } = buildStats({ ...fresh, ethUsd: null }, legacy, now)
    expect(stats.ethUsd).toBe(2091)
    expect(stats.fetchedAt.ethUsd).toBe('2026-10-21T08:00:00Z')
    expect(stats).not.toHaveProperty('bettergov')
  })

  it('omits a failed source that never had a value', () => {
    const { stats, failed } = buildStats({ ...fresh, squatopia: null }, {}, now)
    expect(failed).toEqual(['squatopia'])
    expect(stats).not.toHaveProperty('squatopia')
    expect(stats.fetchedAt).not.toHaveProperty('squatopia')
  })
})
