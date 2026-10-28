import { describe, it, expect } from 'vitest'
import { formatCount, isFresh, liveBadge, STALE_AFTER_MS } from './badges'

const NOW = Date.parse('2026-10-28T08:00:00Z')
const recent = '2026-10-28T07:00:00Z'
const old = new Date(NOW - STALE_AFTER_MS - 1000).toISOString()

const full = {
  updatedAt: recent,
  fetchedAt: {
    unionbank: recent,
    ocm: recent,
    ethUsd: recent,
    squatopia: recent
  },
  unionbank: { rating: 4.7, count: 178950 },
  ocm: { floor: 0.2, currency: 'ETH' },
  ethUsd: 2369.73,
  squatopia: { rating: 4.2, count: 50 }
}

describe('formatCount', () => {
  it('abbreviates thousands and millions', () => {
    expect(formatCount(950)).toBe('950')
    expect(formatCount(178950)).toBe('179K')
    expect(formatCount(2000000)).toBe('2M')
    expect(formatCount(2500000)).toBe('2.5M')
  })

  it('returns null instead of throwing on bad input', () => {
    expect(formatCount(undefined)).toBeNull()
    expect(formatCount(null)).toBeNull()
    expect(formatCount('12')).toBeNull()
    expect(formatCount(NaN)).toBeNull()
  })
})

describe('liveBadge', () => {
  it('builds every badge from complete, fresh stats', () => {
    expect(liveBadge('unionbank', full, NOW)).toBe('4.7★ · 179K ratings')
    expect(liveBadge('ocm', full, NOW)).toBe('Floor: 0.2 ETH (~$474)')
    expect(liveBadge('squatopia', full, NOW)).toBe('4.2★ · 50 ratings')
  })

  it('hides a badge when a field is missing', () => {
    const partial = { ...full, unionbank: { rating: 4.7 }, squatopia: {} }
    expect(liveBadge('unionbank', partial, NOW)).toBeNull()
    expect(liveBadge('squatopia', partial, NOW)).toBeNull()
  })

  it('drops the USD estimate when the ETH price is missing or stale', () => {
    const noEth = { ...full, ethUsd: undefined }
    expect(liveBadge('ocm', noEth, NOW)).toBe('Floor: 0.2 ETH')
    const staleEth = { ...full, fetchedAt: { ...full.fetchedAt, ethUsd: old } }
    expect(liveBadge('ocm', staleEth, NOW)).toBe('Floor: 0.2 ETH')
  })

  it('hides a badge whose source has not refreshed in over a week', () => {
    const stale = { ...full, fetchedAt: { ...full.fetchedAt, unionbank: old } }
    expect(liveBadge('unionbank', stale, NOW)).toBeNull()
    expect(liveBadge('squatopia', stale, NOW)).toBe('4.2★ · 50 ratings')
  })

  it('returns null for unknown ids, missing stats and garbage', () => {
    expect(liveBadge('bettergov', full, NOW)).toBeNull()
    expect(liveBadge('unionbank', null, NOW)).toBeNull()
    expect(liveBadge('unionbank', 'not json', NOW)).toBeNull()
    expect(liveBadge('ocm', { ...full, ocm: 5 }, NOW)).toBeNull()
  })
})

describe('isFresh', () => {
  it('falls back to updatedAt for files without per-source stamps', () => {
    expect(isFresh({ updatedAt: recent }, 'unionbank', NOW)).toBe(true)
    expect(isFresh({ updatedAt: old }, 'unionbank', NOW)).toBe(false)
  })

  it('treats a source missing from fetchedAt as stale', () => {
    expect(isFresh({ updatedAt: recent, fetchedAt: {} }, 'ocm', NOW)).toBe(
      false
    )
  })
})
