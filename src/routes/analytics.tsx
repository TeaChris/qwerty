import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/analytics')({
  component: AnalyticsComponent,
})

function AnalyticsComponent() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Analytics
        </h1>
        <p className="mt-1 text-base text-text-secondary">
          Detailed insights into your application performance.
        </p>
      </header>

      <section aria-label="Traffic overview">
        <article className="bg-bg-secondary border border-border rounded-xl p-6 hover:border-border-light hover:shadow-lg transition-all">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Traffic Overview
          </h2>
          <p className="text-text-secondary">
            Detailed analytics and charts will be displayed here.
          </p>
        </article>
      </section>
    </div>
  )
}
