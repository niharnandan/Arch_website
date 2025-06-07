import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import { clsx } from 'clsx';

const App: React.FC = () => {
  // Initialize theme from localStorage or system preference
  const getInitialTheme = (): boolean => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return JSON.parse(storedTheme);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [isDark, setIsDark] = useState<boolean>(getInitialTheme);

  // Apply theme to document element and save to localStorage
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove both classes first to ensure clean state
    root.classList.remove('dark', 'light');
    
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }
    
    localStorage.setItem('theme', JSON.stringify(isDark));
    
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <div className={clsx(
      "min-h-screen transition-all duration-500 ease-in-out",
      isDark 
        ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" 
        : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
    )}>
      <Router>
        <Navigation isDark={isDark} toggleTheme={toggleTheme} />
        
        <main className="relative">
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route 
              path="/contact" 
              element={<ContactUs />} 
            />
            <Route 
              path="/about" 
              element={
                <div className="min-h-screen flex items-center justify-center px-4">
                  <div className="text-center space-y-6 animate-fade-in">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto">
                      <span className="text-white text-3xl font-bold">🏗️</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                      About Us
                    </h1>
                    <p className="text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                      This page is under construction. We're crafting something beautiful 
                      that will showcase our story, values, and team.
                    </p>
                    <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 max-w-md mx-auto">
                      <p className="text-slate-700 dark:text-slate-300">
                        Check back soon for updates!
                      </p>
                    </div>
                  </div>
                </div>
              } 
            />
          </Routes>
        </main>

        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 dark:opacity-10 transition-opacity duration-500">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500 rounded-full filter blur-3xl animate-float"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-green-500 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;