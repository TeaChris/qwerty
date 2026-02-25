import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/payment/callback')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/payment/callback"!</div>
}
