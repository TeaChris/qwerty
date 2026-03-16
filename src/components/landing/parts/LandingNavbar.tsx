import { Link } from '@tanstack/react-router';

interface LandingNavbarProps {
      scrolled: boolean;
}

export function LandingNavbar({ scrolled }: LandingNavbarProps) {
      return (
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
      );
}
