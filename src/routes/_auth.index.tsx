import { createFileRoute } from '@tanstack/react-router';

const StatCard = ({
      label,
      value,
      change,
      isPositive,
      icon
}: {
      label: string;
      value: string;
      change: string;
      isPositive: boolean;
      icon: React.ReactNode;
}) => {
      return (
            <article className="bg-bg-secondary/50 backdrop-blur-sm border border-border rounded-[2rem] p-8 hover:border-accent/40 transition-all hover:shadow-2xl hover:shadow-accent/5 group">
                  <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-bg-primary flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-500">
                              {icon}
                        </div>
                        <div
                              className={`px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1 ${isPositive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}
                        >
                              {isPositive ? '↑' : '↓'} {change}
                        </div>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-1">{label}</p>
                  <p className="text-4xl font-black text-text-primary tracking-tight">{value}</p>
            </article>
      );
};

const IndexComponent = () => {
      return (
            <div className="max-w-7xl mx-auto space-y-12 pb-20 text-text-primary">
                  {/* Header */}
                  <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2">
                              <div className="flex items-center gap-2 text-accent font-black text-xs uppercase tracking-widest">
                                    <span className="w-8 h-[2px] bg-accent"></span>
                                    Overview
                              </div>
                              <h1 className="text-5xl font-black tracking-tighter text-text-primary decoration-accent/20 underline-offset-8">
                                    Performance <span className="text-accent underline">Hub</span>
                              </h1>
                              <p className="text-lg text-text-secondary font-medium">
                                    Real-time insights and system analytics
                              </p>
                        </div>
                        <div className="flex gap-4">
                              <button className="bg-bg-secondary border border-border px-6 py-3 rounded-2xl font-bold text-sm hover:bg-bg-hover transition-all active:scale-95 shadow-sm">
                                    Export Data
                              </button>
                              <button className="bg-accent text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-accent-hover transition-all active:scale-95 shadow-lg shadow-accent/25">
                                    Create Report
                              </button>
                        </div>
                  </header>

                  {/* Stats Grid */}
                  <section aria-label="Performance statistics">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                              <StatCard
                                    label="Active Users"
                                    value="12.4k"
                                    change="12%"
                                    isPositive
                                    icon={
                                          <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                                />
                                          </svg>
                                    }
                              />
                              <StatCard
                                    label="Revenue"
                                    value="$42,000"
                                    change="8.2%"
                                    isPositive
                                    icon={
                                          <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM17 13a5 5 0 11-10 0 5 5 0 0110 0z"
                                                />
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364 6.364l-1.414-1.414M6.343 6.343l-1.414-1.414m12.728 0l-1.414 1.414M6.343 17.657l-1.414 1.414"
                                                />
                                          </svg>
                                    }
                              />
                              <StatCard
                                    label="Engagement"
                                    value="68%"
                                    change="2.4%"
                                    isPositive={false}
                                    icon={
                                          <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M13 10V3L4 14h7v7l9-11h-7z"
                                                />
                                          </svg>
                                    }
                              />
                              <StatCard
                                    label="Bounce Rate"
                                    value="32%"
                                    change="18%"
                                    isPositive
                                    icon={
                                          <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                          </svg>
                                    }
                              />
                        </div>
                  </section>

                  {/* Main Sections */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Mock Graph Placeholder */}
                        <div className="lg:col-span-2 bg-bg-secondary border border-border rounded-[2.5rem] p-10 space-y-8 shadow-sm">
                              <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-black text-text-primary tracking-tight">
                                          System Growth
                                    </h2>
                                    <div className="flex gap-2">
                                          {['1D', '1W', '1M', '1Y'].map(t => (
                                                <button
                                                      key={t}
                                                      className={`px-4 py-1.5 rounded-xl text-[10px] font-black transition-all ${t === '1M' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-bg-primary text-text-muted hover:text-text-primary'}`}
                                                >
                                                      {t}
                                                </button>
                                          ))}
                                    </div>
                              </div>
                              <div className="aspect-video w-full bg-bg-primary/50 rounded-3xl border-2 border-dashed border-border/60 flex items-center justify-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-linear-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <p className="text-text-muted font-bold text-sm z-10">
                                          Enhanced Visualization Engine Loading...
                                    </p>
                                    <svg
                                          className="w-12 h-12 text-accent/20 absolute bottom-10 right-10"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                    >
                                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                                    </svg>
                              </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-bg-secondary border border-border rounded-[2.5rem] p-10 space-y-8 shadow-sm">
                              <h2 className="text-2xl font-black text-text-primary tracking-tight">Activity</h2>
                              <div className="space-y-6">
                                    {[
                                          { user: 'Boluwatife', action: 'deployed new feature', time: '2m ago' },
                                          { user: 'Boluwatife', action: 'fixed auth bug', time: '1h ago' },
                                          { user: 'Boluwatife', action: 'updated theme config', time: '4h ago' },
                                          { user: 'Boluwatife', action: 'integrated sonner', time: 'Yesterday' },
                                          { user: 'Boluwatife', action: 'created dashboard', time: '2 days ago' }
                                    ].map((act, i) => (
                                          <div key={i} className="flex gap-4 group cursor-default">
                                                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-black text-xs shrink-0 group-hover:scale-110 transition-transform">
                                                      {act.user[0]}
                                                </div>
                                                <div className="min-w-0">
                                                      <p className="text-sm font-bold text-text-primary truncate">
                                                            {act.user}{' '}
                                                            <span className="text-text-secondary font-medium font-normal">
                                                                  {act.action}
                                                            </span>
                                                      </p>
                                                      <p className="text-[10px] text-text-muted font-black uppercase tracking-widest mt-1">
                                                            {act.time}
                                                      </p>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                              <button className="w-full py-4 text-xs font-black uppercase tracking-widest text-accent hover:text-accent-hover transition-all">
                                    View All Logs
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export const Route = createFileRoute('/_auth/')({
      component: IndexComponent
});
