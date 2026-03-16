import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { LandingNavbar, LandingHero, LandingMarketplace, LandingDetails, LandingFooter } from './parts';

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

                  <LandingNavbar scrolled={scrolled} />

                  <main>
                        <LandingHero />
                        <LandingMarketplace />
                        <LandingDetails />
                  </main>

                  <LandingFooter />
            </div>
      );
};
