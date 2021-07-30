import React from 'react'

interface ErrorBoundaryProps {
  url: string
  children: React.ReactNode
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch() {
    // You can also log the error to an error reporting service
    console.error(
      `The above error occurred during the execution of the remote component from ${this.props.url}`
    )
  }

  render() {
    if (this.state.hasError) {
      return <h2>Unavailable component</h2>
    }

    return this.props.children
  }
}
