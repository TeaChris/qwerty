import type { SaleStatusType } from '../../types';

interface SaleStatusBadgeProps {
      status: SaleStatusType;
}

export function SaleStatusBadge({ status }: SaleStatusBadgeProps) {
      const config = {
            upcoming: {
                  label: 'Upcoming',
                  className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
                  icon: (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                        </svg>
                  )
            },
            live: {
                  label: 'Live Now',
                  className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 animate-pulse-subtle',
                  icon: (
                        <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                  )
            },
            sold_out: {
                  label: 'Sold Out',
                  className: 'bg-red-500/20 text-red-400 border-red-500/30',
                  icon: (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                              />
                        </svg>
                  )
            }
      };

      const { label, className, icon } = config[status];

      return (
            <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${className}`}
                  role="status"
                  aria-label={`Sale status: ${label}`}
            >
                  {icon}
                  <span>{label}</span>
            </div>
      );
}
