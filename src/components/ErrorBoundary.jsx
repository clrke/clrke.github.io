import { Component } from 'react'

// Keeps a render error from blanking the whole page. With no boundary,
// React unmounts the entire tree on an uncaught error.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('Render error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <main className="app" role="alert">
            <h1>Clarke Plumo</h1>
            <p>
              Something went wrong loading this page. Please refresh, or visit{' '}
              <a href="https://github.com/clrke">github.com/clrke</a>.
            </p>
          </main>
        )
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
