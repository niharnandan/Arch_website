import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Info, Phone, Home } from 'lucide-react';
import { fetchFirmName } from '../services/Contentful/contentfulFirmName';
import useIsMobile from '../services/Helpers/useIsMobile';
import { clsx } from 'clsx';

const Navigation: React.FC = () => {
  const [firmName, setFirmName] = useState<string>('Architecture Studio');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const getFirmName = async () => {
      const name = await fetchFirmName();
      setFirmName(name);
    };
    getFirmName();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: Info },
    { path: '/contact', label: 'Contact', icon: Phone },
  ];

  return (
    <>
      <nav className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "glass-effect shadow-xl border-b border-white/10" 
          : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Firm Name */}
            <div 
              onClick={() => handleNavigation('/')}
              className="cursor-pointer group flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-slate-900 font-bold text-sm">{firmName[0]}</span>
              </div>
              <span className="text-xl font-bold text-blue-400 group-hover:scale-105 transition-transform duration-300">
                {firmName}
              </span>
            </div>

            {!isMobile && (
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map(({ path, label, icon: Icon }) => (
                  <button
                    key={path}
                    onClick={() => handleNavigation(path)}
                    className={clsx(
                      "flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105",
                      isActivePath(path)
                        ? "bg-blue-400/20 text-blue-400 shadow-lg"
                        : "text-slate-300 hover:bg-white/10 hover:text-blue-400"
                    )}
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl text-slate-300 hover:bg-white/10 transition-all duration-300 transform hover:scale-110"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && (
          <div className={clsx(
            "md:hidden transition-all duration-300 ease-out",
            isMenuOpen 
              ? "max-h-96 opacity-100" 
              : "max-h-0 opacity-0 pointer-events-none"
          )}>
            <div className="glass-effect border-t border-white/10 mx-4 mb-4 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 space-y-2">
                {navItems.map(({ path, label, icon: Icon }) => (
                  <button
                    key={path}
                    onClick={() => handleNavigation(path)}
                    className={clsx(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 text-left",
                      isActivePath(path)
                        ? "bg-blue-400/20 text-blue-400 shadow-lg"
                        : "text-slate-300 hover:bg-white/10 hover:text-blue-400"
                    )}
                  >
                    <Icon size={20} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-16" />
    </>
  );
};

export default Navigation;