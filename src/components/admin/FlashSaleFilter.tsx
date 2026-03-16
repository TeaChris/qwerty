interface FlashSaleFilterProps {
      statusFilter: string;
      setStatusFilter: (filter: string) => void;
}

export function FlashSaleFilter({ statusFilter, setStatusFilter }: FlashSaleFilterProps) {
      const filters = [
            { id: '', label: 'ALL' },
            { id: 'scheduled', label: 'SCHEDULED' },
            { id: 'active', label: 'ACTIVE' },
            { id: 'ended', label: 'ENDED' },
            { id: 'cancelled', label: 'CANCELLED' }
      ];

      return (
            <div className="glass border-2 border-(--border-default) p-4 mb-6">
                  <div className="flex gap-4">
                        {filters.map(filter => (
                              <button
                                    key={filter.id}
                                    onClick={() => setStatusFilter(filter.id)}
                                    className={`px-4 py-2 font-bold text-sm ${
                                          statusFilter === filter.id
                                                ? 'bg-(--accent-primary) text-white'
                                                : 'bg-(--bg-elevated) border-2 border-(--border-default) text-(--text-secondary) hover:border-(--accent-primary)'
                                    } transition-colors`}
                              >
                                    {filter.label}
                              </button>
                        ))}
                  </div>
            </div>
      );
}
