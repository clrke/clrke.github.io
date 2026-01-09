import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(document.querySelector('.app')).toBeInTheDocument()
  })

  it('renders the header', () => {
    render(<App />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders the main content area', () => {
    render(<App />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders the About section', () => {
    render(<App />)
    expect(screen.getByText('Clarke Plumo')).toBeInTheDocument()
  })

  it('renders the Skills section', () => {
    render(<App />)
    expect(screen.getByText('Skills')).toBeInTheDocument()
  })

  it('renders the Contact section', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument()
  })
})
