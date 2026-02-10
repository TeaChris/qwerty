# UI Component Library

This directory contains reusable, accessible UI components that form the foundation of the FlashRush design system.

## Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@/components/ui';

// Primary button (default)
<Button onClick={handleClick}>Click me</Button>

// Secondary style
<Button variant="secondary">Cancel</Button>

// With loading state
<Button isLoading>Processing...</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// All variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
```

**Props:**

- `variant`?: `'primary' | 'secondary' | 'ghost' | 'danger'` - Visual style (default: `'primary'`)
- `size`?: `'sm' | 'md' | 'lg'` - Button size (default: `'md'`)
- `isLoading`?: `boolean` - Shows loading spinner (default: `false`)
- All standard HTML button attributes

**Accessibility:**

- Full keyboard support
- `aria-busy` when loading
- `aria-disabled` when disabled
- Visible focus indicators

---

### Input

An accessible form input with label, error, and helper text support.

```tsx
import { Input } from '@/components/ui';

// Basic input
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
/>

// With error
<Input
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
/>

// With helper text
<Input
  label="Username"
  helperText="Choose a unique username"
/>

// Fully controlled
<Input
  label="Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

**Props:**

- `label`?: `string` - Input label
- `error`?: `string` - Error message (displays in red)
- `helperText`?: `string` - Helper text (displays when no error)
- All standard HTML input attributes

**Accessibility:**

- Automatic ID generation for label association
- `aria-invalid` when error present
- `aria-describedby` linking to error/helper text
- `role="alert"` on error messages for screen reader announcements

---

### Skeleton

Loading placeholder component for better perceived performance.

```tsx
import { Skeleton } from '@/components/ui';

// Text skeleton
<Skeleton variant="text" width="200px" />

// Circular avatar
<Skeleton variant="circular" width={40} height={40} />

// Rectangular card
<Skeleton variant="rectangular" height="200px" />

// Custom styling
<Skeleton className="my-4" width="100%" height="300px" />
```

**Props:**

- `variant`?: `'text' | 'circular' | 'rectangular'` - Shape (default: `'rectangular'`)
- `width`?: `string | number` - Width in px or CSS unit
- `height`?: `string | number` - Height in px or CSS unit
- `className`?: `string` - Additional CSS classes

**Accessibility:**

- `aria-busy="true"` to indicate loading
- `aria-live="polite"` for screen reader announcements

---

### ErrorBoundary

React error boundary for graceful error handling.

```tsx
import { ErrorBoundary } from '@/components/ui';

// Wrap your component tree
<ErrorBoundary>
  <YourApp />
</ErrorBoundary>

// With custom fallback
<ErrorBoundary fallback={<CustomErrorUI />}>
  <YourApp />
</ErrorBoundary>

// With error handler callback
<ErrorBoundary onError={(error, errorInfo) => {
  logErrorToService(error, errorInfo);
}}>
  <YourApp />
</ErrorBoundary>
```

**Props:**

- `children`: `ReactNode` - Components to wrap
- `fallback`?: `ReactNode` - Custom error UI (optional)
- `onError`?: `(error: Error, errorInfo: ErrorInfo) => void` - Error callback

**Features:**

- User-friendly error message
- "Try Again" and "Go Home" recovery options
- Development mode shows error stack trace
- Contact support link

---

## Design Principles

All components in this library follow these principles:

1. **Accessible by Default**: WCAG 2.1 AA compliant out of the box
2. **Composable**: Can be combined to create complex UIs
3. **Typed**: Full TypeScript support with IntelliSense
4. **Consistent**: Follow the same API patterns
5. **Responsive**: Work well on all screen sizes
6. **Themeable**: Respect dark/light mode via CSS variables

## Styling

Components use Tailwind CSS with custom design tokens defined in `src/index.css`:

- **Colors**: `--color-accent`, `--color-bg-primary`, etc.
- **Typography**: Space Grotesk (display) and DM Sans (body)
- **Spacing**: Consistent padding and margins
- **Animations**: Smooth transitions with reduced motion support

## Adding New Components

When creating new UI components:

1. Create component file in `src/components/ui/`
2. Export from `src/components/ui/index.ts`
3. Add documentation here
4. Include usage examples
5. Ensure accessibility compliance
6. Add TypeScript types

## Testing

(To be implemented)

Test all components for:

- Accessibility (keyboard nav, screen readers)
- Different states (loading, error, disabled)
- Responsiveness
- TypeScript type safety

---

**Last Updated**: February 2026
