import { createFileRoute } from '@tanstack/react-router'

const StatCard = ({
  label,
  value,
  change,
  isPositive,
}: {
  label: string
  value: string
  change: string
  isPositive: boolean
}) => {
  return (
    <article
      className="bg-bg-secondary border border-border rounded-xl p-6"
      aria-label={`${label}: ${value}, ${change}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
        {label}
      </p>
      <p className="text-3xl font-bold text-text-primary leading-tight">
        {value}
      </p>
      <p
        className={`text-sm mt-2 flex items-center gap-1 ${isPositive ? 'text-success' : 'text-danger'}`}
        aria-label={isPositive ? 'Positive trend' : 'Negative trend'}
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
          role="img"
        >
          {isPositive ? (
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          ) : (
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
          )}
        </svg>
        <span>{change}</span>
      </p>
    </article>
  )
}

const IndexComponent = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Dashboard
        </h1>
        <p className="mt-1 text-base text-text-secondary">
          Welcome back! Here's an overview of your performance.
        </p>
      </header>

      {/* Stats Grid */}
      <section aria-label="Performance statistics">
        <h2 className="sr-only">Key Metrics</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          <StatCard
            label="Total Users"
            value="24,521"
            change="+12.5% from last month"
            isPositive
          />
          <StatCard
            label="Page Views"
            value="1.2M"
            change="+8.2% from last month"
            isPositive
          />
          <StatCard
            label="Bounce Rate"
            value="32.1%"
            change="+2.4% from last month"
            isPositive={false}
          />
          <StatCard
            label="Avg. Session"
            value="4m 32s"
            change="+18.7% from last month"
            isPositive
          />
        </div>
      </section>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: IndexComponent,
})
