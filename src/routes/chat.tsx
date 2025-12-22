import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/chat')({
  component: ChatComponent,
})

function ChatComponent() {
  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Messages
        </h1>
        <p className="mt-1 text-base text-text-secondary">
          Connect with your team and users.
        </p>
      </header>

      <section
        className="flex-1 bg-bg-secondary border border-border rounded-xl p-6 flex items-center justify-center text-text-muted"
        aria-label="Chat interface"
      >
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto mb-4 opacity-50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <p className="text-lg">Select a conversation to start chatting</p>
        </div>
      </section>
    </div>
  )
}
