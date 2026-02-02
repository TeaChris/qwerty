import type { LeaderboardEntry } from '../../types/sale.types';

interface LeaderboardItemProps {
      entry: LeaderboardEntry;
}

export function LeaderboardItem({ entry }: LeaderboardItemProps) {
      const isTopThree = entry.rank <= 3;

      const getRankStyles = () => {
            switch (entry.rank) {
                  case 1:
                        return 'bg-amber-500/20 text-amber-500 border-amber-500/30 ring-2 ring-amber-500/20 shadow-[0_0_15px_-3px_rgba(245,158,11,0.3)]';
                  case 2:
                        return 'bg-slate-400/20 text-slate-400 border-slate-400/30 shadow-[0_0_15px_-3px_rgba(148,163,184,0.2)]';
                  case 3:
                        return 'bg-orange-500/20 text-orange-500 border-orange-500/30 shadow-[0_0_15px_-3px_rgba(249,115,22,0.2)]';
                  default:
                        return 'bg-slate-800 text-slate-400 border-slate-700';
            }
      };

      const formatTimestamp = (isoString: string) => {
            const date = new Date(isoString);
            return new Intl.DateTimeFormat('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false
            }).format(date);
      };

      return (
            <div
                  className={`flex items-center gap-4 p-4 rounded-2xl bg-slate-800/30 border border-slate-700/30 transition-all duration-300 hover:bg-slate-800/50 hover:border-slate-600/50 group ${isTopThree ? 'scale-[1.02] -translate-y-0.5' : ''}`}
            >
                  <div
                        className={`
        shrink-0 w-10 h-10 rounded-full border flex items-center justify-center font-bold text-sm
        ${getRankStyles()}
      `}
                  >
                        {entry.rank}
                  </div>

                  <div className="grow min-w-0">
                        <p className="text-slate-200 font-medium truncate group-hover:text-white transition-colors">
                              {entry.username.split('@')[0].slice(0, 3)}***@{entry.username.split('@')[1]}
                        </p>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                              Successful Buyer
                        </p>
                  </div>

                  <div className="text-right">
                        <p className="text-sm font-mono text-orange-500/80">{formatTimestamp(entry.purchasedAt)}</p>
                        <p className="text-[10px] text-slate-600 uppercase">Timestamp</p>
                  </div>
            </div>
      );
}
