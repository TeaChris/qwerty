import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings')({
  component: SettingsComponent,
})

function SettingsComponent() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Settings
        </h1>
        <p className="mt-1 text-base text-text-secondary">
          Manage your application preferences.
        </p>
      </header>

      <div className="bg-bg-secondary border border-border rounded-xl p-6 hover:border-border-light hover:shadow-lg transition-all">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Preferences
        </h2>
        <p className="text-text-secondary">
          Application settings and configurations will be displayed here.
        </p>
      </div>
    </div>
  )
}
