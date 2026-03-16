export function LandingFooter() {
      return (
            <footer className="relative py-20 px-6 z-10 border-t-2 border-(--border-default) bg-(--bg-surface)">
                  <div className="container mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                              <div className="lg:col-span-2">
                                    <h3 className="text-3xl font-black uppercase mb-6">FLASHRUSH</h3>
                                    <p className="text-(--text-muted) max-w-sm mb-8">
                                          A high-performance digital asset exchange powering the next generation
                                          of real-time commerce.
                                    </p>
                                    <div className="flex gap-4">
                                          <div className="w-12 h-12 border border-(--border-default) flex items-center justify-center hover:border-(--accent-primary) transition-colors cursor-pointer">
                                                𝕏
                                          </div>
                                          <div className="w-12 h-12 border border-(--border-default) flex items-center justify-center hover:border-(--accent-primary) transition-colors cursor-pointer">
                                                ◈
                                          </div>
                                          <div className="w-12 h-12 border border-(--border-default) flex items-center justify-center hover:border-(--accent-primary) transition-colors cursor-pointer">
                                                ⌬
                                          </div>
                                    </div>
                              </div>
                              <div>
                                    <h4 className="micro-text text-white mb-6">Quick Links</h4>
                                    <ul className="space-y-4 text-sm font-bold text-(--text-secondary) uppercase tracking-widest">
                                          <li className="hover:text-(--accent-primary) cursor-pointer">
                                                Marketplace
                                          </li>
                                          <li className="hover:text-(--accent-primary) cursor-pointer">
                                                Security
                                          </li>
                                          <li className="hover:text-(--accent-primary) cursor-pointer">
                                                API Docs
                                          </li>
                                          <li className="hover:text-(--accent-primary) cursor-pointer">
                                                Network
                                          </li>
                                    </ul>
                              </div>
                              <div>
                                    <h4 className="micro-text text-white mb-6">System Status</h4>
                                    <div className="space-y-4">
                                          <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-(--data-success) rounded-full animate-pulse" />
                                                <span className="text-xs uppercase font-black">
                                                      All Nodes Online
                                                </span>
                                          </div>
                                          <div className="text-[10px] mono-number text-(--text-muted) uppercase">
                                                Uptime: 99.998%
                                                <br />
                                                Latency: 14ms
                                                <br />
                                                Active Nodes: 1,429
                                          </div>
                                    </div>
                              </div>
                        </div>

                        <div className="pt-8 border-t border-(--border-default) flex flex-col md:flex-row justify-between items-center gap-4">
                              <p className="micro-text text-(--text-muted)">
                                    © {new Date().getFullYear()} FLASHRUSH // ALL_RIGHTS_RESERVED
                              </p>
                              <p className="micro-text text-(--text-muted)">DECENTRALIZED_ASSET_NODE_#402</p>
                        </div>
                  </div>
            </footer>
      );
}
