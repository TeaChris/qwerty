import { createFileRoute } from '@tanstack/react-router';

const SettingsComponent = () => {
      return (
            <div className="max-w-3xl mx-auto space-y-12 pb-20 text-text-primary">
                  <header>
                        <div className="flex items-center gap-2 text-accent font-black text-xs uppercase tracking-widest mb-2">
                              <span className="w-8 h-[2px] bg-accent"></span>
                              Configuration
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-text-primary">
                              App <span className="text-accent">Settings</span>
                        </h1>
                        <p className="text-lg text-text-secondary font-medium mt-2">
                              Manage your account and preferences
                        </p>
                  </header>

                  <div className="space-y-8">
                        <section className="bg-bg-secondary border border-border rounded-[2.5rem] p-10 space-y-8 shadow-sm">
                              <h2 className="text-2xl font-black text-text-primary tracking-tight">Security</h2>
                              <div className="space-y-6">
                                    <div className="flex items-center justify-between p-6 bg-bg-primary/50 rounded-2xl border border-border/50 hover:border-accent/30 transition-all group">
                                          <div>
                                                <p className="font-bold text-text-primary group-hover:text-accent transition-colors">
                                                      Two-Factor Authentication
                                                </p>
                                                <p className="text-sm text-text-secondary">
                                                      Add an extra layer of security
                                                </p>
                                          </div>
                                          <button className="bg-accent/10 text-accent px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-all">
                                                Enable
                                          </button>
                                    </div>
                                    <div className="flex items-center justify-between p-6 bg-bg-primary/50 rounded-2xl border border-border/50 hover:border-accent/30 transition-all group">
                                          <div>
                                                <p className="font-bold text-text-primary group-hover:text-accent transition-colors">
                                                      Password
                                                </p>
                                                <p className="text-sm text-text-secondary">Last changed 3 months ago</p>
                                          </div>
                                          <button className="bg-bg-secondary border border-border px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-bg-hover transition-all">
                                                Change
                                          </button>
                                    </div>
                              </div>
                        </section>

                        <section className="bg-bg-secondary border border-border rounded-[2.5rem] p-10 space-y-8 shadow-sm">
                              <h2 className="text-2xl font-black text-text-primary tracking-tight">Notifications</h2>
                              <div className="space-y-4">
                                    {['Email Alerts', 'Push Notifications', 'Weekly Reports', 'Usage Tips'].map(opt => (
                                          <label
                                                key={opt}
                                                className="flex items-center justify-between p-6 cursor-pointer hover:bg-bg-hover/30 rounded-2xl transition-all border border-transparent hover:border-border/50 group"
                                          >
                                                <span className="font-bold text-text-secondary group-hover:text-text-primary">
                                                      {opt}
                                                </span>
                                                <div className="relative inline-flex items-center cursor-pointer">
                                                      <input type="checkbox" defaultChecked className="sr-only peer" />
                                                      <div className="w-11 h-6 bg-bg-primary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent shadow-inner"></div>
                                                </div>
                                          </label>
                                    ))}
                              </div>
                        </section>

                        <button className="w-full bg-danger/5 text-danger py-6 rounded-[2rem] font-black uppercase tracking-widest hover:bg-danger/10 transition-all border border-danger/20">
                              Deactivate Account
                        </button>
                  </div>
            </div>
      );
};

export const Route = createFileRoute('/_auth/settings')({
      component: SettingsComponent
});
