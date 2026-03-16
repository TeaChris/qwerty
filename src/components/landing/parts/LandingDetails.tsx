import type { FC } from 'react';
import { motion } from 'framer-motion';

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

export function LandingDetails() {
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
}
