import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/check-email')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/check-email"!</div>
}
