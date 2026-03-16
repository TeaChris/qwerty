import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';

export function LandingHero() {
      return (
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
      );
}
