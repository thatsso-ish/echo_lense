import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../../src/features/auth/contexts/AuthContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'home', label: 'Home' },
    { name: 'projects', label: 'Projects' },
    { name: 'about', label: 'About Us' },
    { name: 'calculator', label: 'Calculator' },
    { name: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-zinc-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="text-2xl font-light text-white hover:text-lime-400 transition-colors"
          >
            <span className="font-medium">creative</span>hub
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => onNavigate(link.name)}
                className={`text-sm relative group ${
                  currentPage === link.name ? 'text-lime-400' : 'text-gray-300 hover:text-white'
                } transition-colors`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-lime-400 transition-all ${
                    currentPage === link.name ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
            {user ? (
              <>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={signOut}
                  className="text-sm px-4 py-2 rounded-full bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-colors font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="text-sm px-4 py-2 rounded-full bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-colors font-medium"
              >
                Sign In
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  onNavigate(link.name);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left text-sm ${
                  currentPage === link.name ? 'text-lime-400' : 'text-gray-300'
                }`}
              >
                {link.label}
              </button>
            ))}
            {user ? (
              <>
                <button
                  onClick={() => {
                    onNavigate('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm text-gray-300"
                >
                  Dashboard
                </button>
                <button
                  onClick={signOut}
                  className="block w-full text-left text-sm text-lime-400"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onNavigate('login');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-sm text-lime-400"
              >
                Sign In
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
