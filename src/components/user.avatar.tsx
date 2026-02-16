import type { FC } from 'react';

interface UserAvatarProps {
      username: string;
      size?: 'sm' | 'md' | 'lg';
      className?: string;
}

export const UserAvatar: FC<UserAvatarProps> = ({ username, size = 'md', className = '' }) => {
      const initial = username?.[0]?.toUpperCase() ?? '?';

      const sizeClasses = {
            sm: 'w-8 h-8 text-sm',
            md: 'w-10 h-10 text-base',
            lg: 'w-12 h-12 text-lg'
      };

      return (
            <div
                  className={`
                        ${sizeClasses[size]}
                        flex items-center justify-center
                        font-black
                        bg-linear-to-br from-(--accent-primary) to-(--accent-secondary)]
                        text-white
                        transition-all duration-300
                        hover:scale-110 hover:rotate-12
                        cursor-pointer
                        ${className}
                  `}
                  style={{
                        clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                  }}
                  title={username}
            >
                  {initial}
            </div>
      );
};
