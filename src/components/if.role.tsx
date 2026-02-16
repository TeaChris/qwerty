import { useAuthStore } from '../stores/auth.store';

interface IfRoleProps {
      roles: Array<'ADMIN' | 'USER'>;
      children: React.ReactNode;
      fallback?: React.ReactNode;
}

/**
 * Conditionally render content based on user role
 * @example
 * <IfRole roles={['ADMIN']}>
 *   <AdminPanel />
 * </IfRole>
 */
export const IfRole = ({ roles, children, fallback = null }: IfRoleProps) => {
      const { user } = useAuthStore();

      if (!user || !roles.includes(user.role)) {
            return <>{fallback}</>;
      }

      return <>{children}</>;
};

/**
 * Convenience component for admin-only content
 * @example
 * <IfAdmin>
 *   <button>Create Product</button>
 * </IfAdmin>
 */
export const IfAdmin = ({ children, fallback }: Omit<IfRoleProps, 'roles'>) => {
      return (
            <IfRole roles={['ADMIN']} fallback={fallback}>
                  {children}
            </IfRole>
      );
};
