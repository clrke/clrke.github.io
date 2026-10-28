import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Projects from './Projects'
import ErrorBoundary from './ErrorBoundary'

function mockStats(body, ok = true) {
  vi.stubGlobal(
    'fetch',
    vi.fn(() => Promise.resolve({ ok, json: () => Promise.resolve(body) }))
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

const now = new Date().toISOString()

describe('Projects stat badges', () => {
  it('shows live badges from fresh stats', async () => {
    mockStats({
      updatedAt: now,
      fetchedAt: { unionbank: now, squatopia: now, ocm: now, ethUsd: now },
      unionbank: { rating: 4.7, count: 178950 },
      squatopia: { rating: 4.2, count: 50 },
      ocm: { floor: 0.2, currency: 'ETH' },
      ethUsd: 2000
    })
    render(<Projects />)
    expect(await screen.findByText('4.7★ · 179K ratings')).toBeInTheDocument()
    expect(screen.getByText('4.2★ · 50 ratings')).toBeInTheDocument()
    expect(screen.getByText('Floor: 0.2 ETH (~$400)')).toBeInTheDocument()
  })

  it('still renders every card when stats fields are missing', async () => {
    mockStats({ updatedAt: now, unionbank: { rating: 4.7 }, ocm: {} })
    render(<Projects />)
    expect(await screen.findByText('$5M seed')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /UnionBank Online/ })
    ).toBeInTheDocument()
    expect(screen.queryByText(/ratings/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Floor:/)).not.toBeInTheDocument()
  })

  it('renders without badges when stats.json is unavailable', async () => {
    mockStats(null, false)
    render(<Projects />)
    expect(await screen.findByText('$5M seed')).toBeInTheDocument()
    expect(screen.queryByText(/★/)).not.toBeInTheDocument()
  })

  it('no longer shows the BetterGov star badge', async () => {
    mockStats({ updatedAt: now, bettergov: { stars: 541, forks: 273 } })
    render(<Projects />)
    expect(await screen.findByText('$5M seed')).toBeInTheDocument()
    expect(screen.queryByText(/541/)).not.toBeInTheDocument()
  })
})

describe('ErrorBoundary', () => {
  it('shows a fallback instead of a blank page', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    function Boom() {
      throw new Error('boom')
    }
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong')
  })
})
