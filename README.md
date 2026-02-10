# FlashRush - Live Flash Sale Platform

A high-performance, production-grade flash sale application built with React, TypeScript, and modern web technologies. Features real-time inventory tracking, live leaderboards, and a distinctive, accessible UI.

## 🚀 Features

- **Real-time Flash Sales**: Live inventory tracking with WebSocket updates
- **Competitive Leaderboards**: See top purchasers in real-time
- **Secure Authentication**: Email verification with secure session management
- **Accessible Design**: WCAG 2.1 AA compliant with full keyboard navigation
- **Distinctive UI**: Custom typography (Space Grotesk + DM Sans) and refined visual design
- **Performance Optimized**: Lazy loading, code splitting, and optimal bundle sizes
- **Error Resilient**: Graceful error handling with user-friendly recovery options

## 🛠️ Tech Stack

- **Frontend**: React 19.2 + TypeScript 5.9
- **Routing**: TanStack Router (file-based routing)
- **Styling**: Tailwind CSS 4.1
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Build Tool**: Vite 7.2
- **Analytics**: Vercel Speed Insights

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Generate route types
npm run generate-routes
```

### Environment Variables

Create a `.env` file in the client directory:

```env
VITE_API_URL=http://localhost:8000/api
```

## 📁 Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── ui/              # Shared UI components (Button, Input, etc.)
│   │   ├── auth/            # Authentication forms
│   │   └── flash-sale/      # Flash sale specific components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   │   └── a11y-utils.ts    # Accessibility utilities
│   ├── routes/              # File-based routes
│   ├── services/            # API services
│   ├── stores/              # Zustand state stores
│   ├── types/               # TypeScript type definitions
│   ├── index.css            # Global styles & design tokens
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
└── index.html              # HTML entry point
```

## 🎨 Design System

### Typography

- **Display/Headings**: Space Grotesk (400-700)
- **Body Text**: DM Sans (300-700)
- Distinctive, modern fonts chosen per frontend design skill guidelines

### Colors

**Light Mode:**

- Primary: `#f8fafc` (Background)
- Secondary: `#ffffff`
- Accent: `#6366f1` (Indigo)

**Dark Mode** (Default):

- Primary: `#0f0f11`
- Secondary: `#16161a`
- Accent: `#f97316` (Orange)

### Components

All UI components follow consistent patterns:

- **Accessible by default**: ARIA labels, keyboard navigation, screen reader support
- **Responsive**: Mobile-first design
- **Typed**: Full TypeScript support
- **Documented**: Prop types and usage examples

See `src/components/ui/README.md` for detailed component documentation.

## ♿ Accessibility

This application follows WCAG 2.1 AA standards:

- **Keyboard Navigation**: Full keyboard support (Tab, Enter, Escape, Arrow keys)
- **Screen Reader Support**: Proper ARIA labels and live regions
- **Focus Management**: Visible focus indicators and focus trapping where needed
- **Color Contrast**: AA-compliant contrast ratios
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Form Accessibility**: Proper labels, error announcements, and autocomplete

### Testing Accessibility

1. **Keyboard Test**: Navigate the entire app using only keyboard
2. **Screen Reader**: Test with NVDA (Windows) or VoiceOver (Mac)
3. **Lighthouse**: Run accessibility audit in Chrome DevTools
4. **axe DevTools**: Use the axe browser extension

## 🧪 Testing

```bash
# Run unit tests (once implemented)
npm run test

# Run tests in watch mode
npm run test:watch

# Run accessibility tests
npm run test:a11y
```

## 🏗️ Architecture Patterns

### Component Composition

Components follow a clear separation of concerns:

- **UI Components** (`components/ui/`): Pure presentation, no business logic
- **Feature Components** (`components/flash-sale/`, `components/auth/`): Business logic and API integration
- **Custom Hooks** (`hooks/`): Reusable stateful logic

### State Management

- **Local State**: React useState for component-specific state
- **Global State**: Zustand for app-wide state (auth, sale status)
- **Server State**: No caching layer yet (consider React Query for future enhancement)

### Error Handling

- **ErrorBoundary**: Catches React errors and displays user-friendly fallback UI
- **API Errors**: Handled in hooks with toast notifications (via sonner)
- **Validation Errors**: Displayed inline with forms

## 🔒 Security

- **Password Requirements**: Min 8 chars,uppercase, lowercase, number, special char
- **Autocomplete**: Proper `autocomplete` attributes on all form fields
- **XSS Protection**: React's built-in XSS protection
- **HTTPS Only**: Production deployment should use HTTPS

## 📈 Performance

- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: Lazy loading with `loading="lazy"`
- **Bundle Size**: Optimized with Vite's build settings
- **Core Web Vitals**: Monitored with Vercel Speed Insights

### Performance Budgets

- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Total Blocking Time (TBT): < 200ms
- Cumulative Layout Shift (CLS): < 0.1

## 🐛 Troubleshooting

### Dev Server Won't Start

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Regenerate route types
npm run generate-routes

# Check TypeScript directly
npx tsc --noEmit
```

### Build Failures

```bash
# Check for lint errors
npm run lint

# Build with verbose output
npm run build -- --debug
```

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TanStack Router Docs](https://tanstack.com/router)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🤝 Contributing

See `CONTRIBUTING.md` for contribution guidelines (to be created).

## 📄 License

Proprietary - All rights reserved

---

**Built with ❤️ following frontend skill best practices for accessibility, architecture, design,performance, and user experience.**
