import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

const AssetTypeCard: FC<{ type: string; title: string; desc: string; icon: string; delay: number }> = ({
      type,
      title,
      desc,
      icon,
      delay
}) => (
      <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className="group relative p-8 bg-(--bg-elevated) border-2 border-(--border-default) hover:border-(--accent-primary) transition-all duration-500 overflow-hidden"
      >
            <div className="absolute -right-4 -bottom-4 text-8xl opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-110">
                  {icon}
            </div>
            <div className="relative z-10">
                  <div className="micro-text text-(--accent-primary) mb-4 tracking-[0.3em]">{type}</div>
                  <h3 className="text-2xl font-black uppercase mb-4 group-hover:text-gradient transition-all">
                        {title}
                  </h3>
                  <p className="text-(--text-secondary) leading-relaxed mb-6">{desc}</p>
                  <div className="w-10 h-1 bg-(--border-default) group-hover:bg-(--accent-primary) group-hover:w-full transition-all duration-500" />
            </div>
      </motion.div>
);

const DetailSection: FC<{
      tag: string;
      title: string;
      description: string;
      features: string[];
      reversed?: boolean;
      accentColor: string;
      visual: React.ReactNode;
}> = ({ tag, title, description, features, reversed, accentColor, visual }) => (
      <section className="relative py-24 px-6 overflow-hidden">
            <div
                  className={`container mx-auto grid lg:grid-cols-2 gap-16 items-center ${reversed ? 'lg:flex-row-reverse' : ''}`}
            >
                  <motion.div
                        initial={{ opacity: 0, x: reversed ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className={reversed ? 'lg:order-2' : ''}
                  >
                        <div className={`micro-text mb-6 tracking-[0.3em]`} style={{ color: accentColor }}>
                              {tag}
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
                              {title}
                        </h2>
                        <p className="text-lg text-(--text-secondary) mb-10 leading-relaxed max-w-xl">{description}</p>
                        <div className="grid sm:grid-cols-2 gap-6">
                              {features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                          <div
                                                className="w-1.5 h-1.5 rounded-full"
                                                style={{ backgroundColor: accentColor }}
                                          />
                                          <span className="text-xs font-bold uppercase tracking-widest text-(--text-muted)">
                                                {feature}
                                          </span>
                                    </div>
                              ))}
                        </div>
                  </motion.div>
                  <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className={`relative aspect-square glass border-2 border-(--border-default) p-12 flex items-center justify-center group ${reversed ? 'lg:order-1' : ''}`}
                  >
                        <div
                              className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                              style={{
                                    background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)`
                              }}
                        />
                        {visual}
                  </motion.div>
            </div>
      </section>
);

const AssetDetailSections: FC = () => {
      const sections = [
            {
                  tag: 'V2.0_ACCESS',
                  title: 'ULTIMATE EVENT PASSES',
                  description:
                        "Gain entry to the world's most exclusive high-tech summits, secure underground keynotes, and digital-first networking events. Validated on the immutable ledger.",
                  features: ['LIFETIME ACCESS', 'PRIORITY QUEUE', 'SECURE CRYPTO-TAG', 'NFT-BACKED VALIDITY'],
                  accentColor: 'var(--accent-primary)',
                  visual: (
                        <div className="relative w-full h-full flex items-center justify-center">
                              <div className="text-9xl animate-float">🎫</div>
                              <div className="absolute inset-0 border border-dashed border-(--accent-primary)/30 rounded-full animate-spin-slow" />
                        </div>
                  )
            },
            {
                  tag: 'V2.0_IDENTITY',
                  title: 'ID BADGES & CREDENTIALS',
                  description:
                        'Establish your presence in the digital frontier. Our ID badges provide multi-layer verification for secure workspace access and high-clearance sectors.',
                  features: ['BIOMETRIC SYNC', 'REDACTED PROFILES', 'LEVEL 5 CLEARANCE', 'TRUSTLESS AUTH'],
                  accentColor: 'var(--accent-secondary)',
                  reversed: true,
                  visual: (
                        <div className="relative w-full h-full flex items-center justify-center">
                              <div className="text-9xl animate-float stagger-2">🪪</div>
                              <div className="absolute inset-4 border-2 border-(--accent-secondary)/20 rotate-45" />
                              <div className="absolute inset-8 border-2 border-(--accent-secondary)/10 -rotate-12" />
                        </div>
                  )
            },
            {
                  tag: 'V2.0_HARDWARE',
                  title: 'SMART INTEGRATED DEVICES',
                  description:
                        'Hardware that bridges the gap between digital ownership and physical utility. Control decentralized nodes and monitor assets via encrypted IoT channels.',
                  features: ['REMOTE OVERRIDE', 'ENCRYPTED LINK', 'SENSORY FEEDBACK', 'NODE INTERFACE'],
                  accentColor: '#00f2ff',
                  visual: (
                        <div className="relative w-full h-full flex items-center justify-center">
                              <div className="text-9xl animate-pulse">📟</div>
                              <div className="absolute inset-0 bg-tech-grid opacity-10" />
                        </div>
                  )
            },
            {
                  tag: 'V2.0_DATA',
                  title: 'STRATEGIC INTEL REPORTS',
                  description:
                        'Unlock high-level market intelligence and localized data packets. Precision-engineered reports for developers and strategists operating at scale.',
                  features: ['REAL-TIME SYNC', 'PREDICTIVE ANALYTICS', 'RAW DATA EXPORT', 'DEEP MARKET INSIGHTS'],
                  accentColor: '#ff2d55',
                  reversed: true,
                  visual: (
                        <div className="relative w-full h-full flex items-center justify-center">
                              <div className="text-9xl animate-bounce-slow">📊</div>
                              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-(--accent-primary)/10 to-transparent" />
                        </div>
                  )
            }
      ];

      return (
            <div className="py-20">
                  {sections.map((section, index) => (
                        <DetailSection key={index} {...section} />
                  ))}
            </div>
      );
};

export const LandingPage: FC = () => {
      const [scrolled, setScrolled] = useState(false);

      useEffect(() => {
            const handleScroll = () => setScrolled(window.scrollY > 50);
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      return (
            <div className="min-h-screen bg-(--bg-canvas) selection:bg-(--accent-primary) selection:text-black overflow-x-hidden">
                  {/* Dynamic Background */}
                  <div className="fixed inset-0 z-0 pointer-events-none">
                        <div className="absolute inset-0 bg-tech-grid opacity-[0.03] animate-tech-grid" />
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-(--accent-primary)/10 rounded-full blur-[120px] animate-glow-premium" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-(--accent-secondary)/10 rounded-full blur-[120px] animate-glow-premium stagger-3" />
                  </div>

                  {/* Public Navbar */}
                  <nav
                        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 glass border-b-2 border-(--border-default)' : 'py-8'}`}
                  >
                        <div className="container mx-auto px-6 flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                    <div
                                          className="w-10 h-10 bg-linear-to-br from-(--accent-primary) to-(--accent-secondary) flex items-center justify-center font-black text-white text-xl shadow-lg"
                                          style={{
                                                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                                          }}
                                    >
                                          F
                                    </div>
                                    <h1 className="text-xl font-black uppercase tracking-tighter">FLASHRUSH</h1>
                              </div>
                              <div className="flex items-center gap-8">
                                    <Link
                                          to="/login"
                                          className="micro-text text-(--text-secondary) hover:text-(--accent-primary) transition-colors"
                                    >
                                          Login
                                    </Link>
                                    <Link
                                          to="/register"
                                          className="px-6 py-2 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-(--accent-primary) transition-colors"
                                    >
                                          Initialize Access
                                    </Link>
                              </div>
                        </div>
                  </nav>

                  {/* Hero Section */}
                  <section className="relative pt-40 pb-20 px-6 z-10">
                        <div className="container mx-auto text-center max-w-5xl">
                              <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                              >
                                    <div className="inline-block px-4 py-1 border border-(--accent-primary)/30 bg-(--accent-primary)/5 micro-text text-(--accent-primary) mb-8 animate-pulse">
                                          SYSTEM_INITIALIZED // V2.0_MARKETPLACE
                                    </div>
                                    <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                                          THE NEXT <span className="text-gradient">EVOLUTION</span> OF ASSETS.
                                    </h2>
                                    <p className="text-xl md:text-2xl text-(--text-secondary) max-w-2xl mx-auto mb-12 leading-relaxed">
                                          Acquire unique digital identifiers, intelligence reports, and exclusive access
                                          passes in high-performance real-time auctions.
                                    </p>
                              </motion.div>

                              <motion.div
                                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                              >
                                    <Link
                                          to="/register"
                                          className="group relative px-10 py-5 bg-(--accent-primary) text-black font-black uppercase tracking-[0.2em] text-sm overflow-hidden transition-all hover:scale-105 active:scale-95"
                                    >
                                          <span className="relative z-10">Start Acquisition</span>
                                          <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    </Link>
                                    <a
                                          href="#market"
                                          className="px-10 py-5 border-2 border-(--border-default) text-white font-black uppercase tracking-[0.2em] text-sm hover:border-white transition-all"
                                    >
                                          Browse Node
                                    </a>
                              </motion.div>
                        </div>
                  </section>

                  {/* Feature Grid */}
                  <section id="market" className="relative py-32 px-6 z-10">
                        <div className="container mx-auto">
                              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b-2 border-(--border-default) pb-12">
                                    <div>
                                          <div className="micro-text text-(--accent-primary) mb-4">
                                                CORE_ASSET_TYPES
                                          </div>
                                          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                                                THE MARKETPLACE
                                          </h2>
                                    </div>
                                    <p className="text-(--text-secondary) max-w-md uppercase font-bold text-sm leading-relaxed">
                                          High-value digital entities verified by industrial-grade cryptographic
                                          signatures.
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    <AssetTypeCard
                                          type="ACCESS"
                                          title="Event Pass"
                                          desc="Lifetime access to secure physical and digital events worldwide."
                                          icon="🎫"
                                          delay={0.1}
                                    />
                                    <AssetTypeCard
                                          type="IDENTITY"
                                          title="ID Badge"
                                          desc="Unique verifiable identifiers for secure high-clearance sectors."
                                          icon="🪪"
                                          delay={0.2}
                                    />
                                    <AssetTypeCard
                                          type="HARDWARE"
                                          title="Smart Device"
                                          desc="IoT-linked assets with physical real-world utility and control."
                                          icon="📟"
                                          delay={0.3}
                                    />
                                    <AssetTypeCard
                                          type="DATA"
                                          title="Intel Report"
                                          desc="Real-time analytics and strategic data packages for developers."
                                          icon="📊"
                                          delay={0.4}
                                    />
                              </div>
                        </div>
                  </section>

                  {/* Detailed Asset Sections */}
                  <AssetDetailSections />

                  {/* Industrial Footer */}
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
            </div>
      );
};
