import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { routeTree } from './routeTree.gen'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Create the router instance
const router = createRouter({ routeTree })

// Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <SpeedInsights framework="react" />
  </StrictMode>
)
