// Builds the live stat badges shown on project cards from public/stats.json.
// Every builder returns null instead of throwing when data is missing,
// malformed or stale, so a bad stats file can only hide a badge.

export const STALE_AFTER_MS = 7 * 24 * 60 * 60 * 1000

const isNum = (n) => typeof n === 'number' && Number.isFinite(n)

export function formatCount(n) {
  if (!isNum(n)) return null
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (n >= 1000) return Math.round(n / 1000) + 'K'
  return String(n)
}

// A source is fresh if it was fetched within STALE_AFTER_MS. Files written
// before per-source timestamps existed fall back to the file's updatedAt.
export function isFresh(stats, key, now = Date.now()) {
  const stamp =
    stats?.fetchedAt?.[key] ?? (stats?.fetchedAt ? null : stats?.updatedAt)
  const t = Date.parse(stamp)
  return Number.isFinite(t) && now - t <= STALE_AFTER_MS
}

function fresh(stats, key, now) {
  return isFresh(stats, key, now) ? stats[key] : null
}

const builders = {
  unionbank: (stats, now) => {
    const s = fresh(stats, 'unionbank', now)
    const count = formatCount(s?.count)
    if (!isNum(s?.rating) || !count) return null
    return `${s.rating}★ · ${count} ratings`
  },
  ocm: (stats, now) => {
    const s = fresh(stats, 'ocm', now)
    if (!isNum(s?.floor)) return null
    const eth = fresh(stats, 'ethUsd', now)
    const usd = isNum(eth)
      ? ` (~$${Math.round(s.floor * eth).toLocaleString('en-US')})`
      : ''
    return `Floor: ${s.floor} ETH${usd}`
  },
  squatopia: (stats, now) => {
    const s = fresh(stats, 'squatopia', now)
    if (!isNum(s?.rating) || !isNum(s?.count)) return null
    return `${s.rating}★ · ${s.count} ratings`
  }
}

export function liveBadge(id, stats, now = Date.now()) {
  const build = builders[id]
  if (!build || !stats) return null
  try {
    return build(stats, now)
  } catch {
    return null
  }
}
