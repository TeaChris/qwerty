import type { FC } from 'react';
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

export function LandingMarketplace() {
      return (
            <section id="market" className="relative py-32 px-6 z-10">
                  <div className="container mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b-2 border-(--border-default) pb-12">
                              <div>
                                    <div className="micro-text text-(--accent-primary) mb-4">CORE_ASSET_TYPES</div>
                                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                                          THE MARKETPLACE
                                    </h2>
                              </div>
                              <p className="text-(--text-secondary) max-w-md uppercase font-bold text-sm leading-relaxed">
                                    High-value digital entities verified by industrial-grade cryptographic signatures.
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
      );
}
