import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Welcome back! Here's an overview of your performance.
        </p>
      </header>

      <div className="card-grid">
        <div className="stat-card">
          <p className="stat-label">Total Users</p>
          <p className="stat-value">24,521</p>
          <p className="stat-change positive">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            </svg>
            +12.5% from last month
          </p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Page Views</p>
          <p className="stat-value">1.2M</p>
          <p className="stat-change positive">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            </svg>
            +8.2% from last month
          </p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Bounce Rate</p>
          <p className="stat-value">32.1%</p>
          <p className="stat-change negative">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
            </svg>
            +2.4% from last month
          </p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Avg. Session</p>
          <p className="stat-value">4m 32s</p>
          <p className="stat-change positive">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            </svg>
            +18.7% from last month
          </p>
        </div>
      </div>
    </div>
  )
}
