import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/analytics')({
  component: AnalyticsComponent,
})

function AnalyticsComponent() {
  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">Analytics</h1>
        <p className="page-subtitle">
          Detailed insights into your application performance.
        </p>
      </header>

      <div className="card">
        <h2
          style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600 }}
        >
          Traffic Overview
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Detailed analytics and charts will be displayed here.
        </p>
      </div>
    </div>
  )
}
