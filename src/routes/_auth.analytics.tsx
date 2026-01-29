import { createFileRoute } from '@tanstack/react-router';

const AnalyticsComponent = () => {
      return (
            <div className="max-w-7xl mx-auto space-y-12 pb-20 text-text-primary">
                  <header>
                        <div className="flex items-center gap-2 text-accent font-black text-xs uppercase tracking-widest mb-2">
                              <span className="w-8 h-[2px] bg-accent"></span>
                              Insights
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-text-primary">
                              Traffic <span className="text-accent">Intelligence</span>
                        </h1>
                        <p className="text-lg text-text-secondary font-medium mt-2">
                              Detailed performance metrics and user behavior
                        </p>
                  </header>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <article className="bg-bg-secondary border border-border rounded-[2.5rem] p-10 space-y-6 shadow-sm">
                              <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-black text-text-primary tracking-tight">Geographic</h2>
                                    <button className="text-accent text-xs font-black uppercase tracking-widest">
                                          Global Scan
                                    </button>
                              </div>
                              <div className="aspect-square bg-bg-primary/50 rounded-3xl border-2 border-dashed border-border/60 flex items-center justify-center group overflow-hidden relative">
                                    <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <p className="text-text-muted font-bold z-10">Interactive World Map</p>
                              </div>
                        </article>

                        <article className="bg-bg-secondary border border-border rounded-[2.5rem] p-10 space-y-8 shadow-sm">
                              <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-black text-text-primary tracking-tight">
                                          Conversion Funnel
                                    </h2>
                                    <span className="bg-success/10 text-success text-[10px] font-black px-3 py-1 rounded-full">
                                          +4.2% Growth
                                    </span>
                              </div>
                              <div className="space-y-6">
                                    {[
                                          { label: 'Awareness', value: '85%', color: 'bg-accent' },
                                          { label: 'Interest', value: '62%', color: 'bg-accent/80' },
                                          { label: 'Decision', value: '44%', color: 'bg-accent/60' },
                                          { label: 'Action', value: '12%', color: 'bg-accent/40' }
                                    ].map(item => (
                                          <div key={item.label} className="space-y-2 group">
                                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-text-muted group-hover:text-text-primary transition-colors">
                                                      <span>{item.label}</span>
                                                      <span>{item.value}</span>
                                                </div>
                                                <div className="h-4 w-full bg-bg-primary rounded-xl overflow-hidden p-[2px]">
                                                      <div
                                                            className={`h-full ${item.color} rounded-lg transition-all duration-1000`}
                                                            style={{ width: item.value }}
                                                      ></div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                              <p className="text-sm text-text-secondary font-medium italic border-t border-border pt-6">
                                    * Conversion rates have stabilized over the last 30 days.
                              </p>
                        </article>
                  </div>
            </div>
      );
};

export const Route = createFileRoute('/_auth/analytics')({
      component: AnalyticsComponent
});
