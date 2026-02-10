/**
 * Accessibility Utilities
 *
 * Common functions for improving accessibility throughout the application
 */

/**
 * Announces a message to screen readers via an ARIA live region
 * @param message - The message to announce
 * @param priority - 'polite' (default) or 'assertive' for interrupting announcements
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', priority);
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      liveRegion.textContent = message;

      document.body.appendChild(liveRegion);

      // Remove after announcement
      setTimeout(() => {
            document.body.removeChild(liveRegion);
      }, 1000);
}

/**
 * Generates a unique ID for associating labels with form controls
 * @param prefix - Optional prefix for the ID
 */
export function generateId(prefix: string = 'a11y'): string {
      return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Traps focus within a container element (useful for modals/dialogs)
 * @param container - The container element to trap focus within
 * @returns Cleanup function to remove the trap
 */
export function trapFocus(container: HTMLElement): () => void {
      const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
      ].join(', ');

      const focusableElements = Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors));

      if (focusableElements.length === 0) return () => {};

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                  // Shift + Tab
                  if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                  }
            } else {
                  // Tab
                  if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                  }
            }
      };

      container.addEventListener('keydown', handleKeyDown);

      // Focus first element
      firstElement.focus();

      // Return cleanup function
      return () => {
            container.removeEventListener('keydown', handleKeyDown);
      };
}

/**
 * Checks if the user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
