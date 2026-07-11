import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
    const saved = localStorage.getItem('starcon_admin_user');
    if (saved) try { setAdminUser(JSON.parse(saved)); } catch {}
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('color-theme', next ? 'dark' : 'light');
    setIsDarkMode(next);
  };

  const navLinks = [
    { href: '#tentang', label: 'Tentang' },
    { href: '#layanan', label: 'Layanan' },
    { href: '#portofolio', label: 'Portofolio' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-[#18181b]/90 backdrop-blur-md py-3' : 'bg-transparent py-5'}`}>
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center">
            {/* When not in dark mode (light mode), we usually want the dark logo. When in dark mode, we want the light logo. */}
            <img src="/images/logo_dark.png" alt="Starcon Logo" className="h-10 sm:h-12 block dark:hidden" />
            <img src="/images/logo_light.png" alt="Starcon Logo" className="h-10 sm:h-12 hidden dark:block" />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-xs font-medium uppercase tracking-widest text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <button onClick={toggleDarkMode} className="text-xs font-medium uppercase tracking-widest text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
              {isDarkMode ? 'Light' : 'Dark'}
            </button>
            {adminUser && (
              <a href="/admin" className="text-xs font-medium uppercase tracking-widest text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">Admin</a>
            )}
            <a href="#kontak" className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100 border-b-2 border-slate-800 dark:border-slate-200 pb-0.5 hover:opacity-70 transition-opacity">
              Kontak
            </a>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={toggleDarkMode} className="text-xs font-medium uppercase tracking-widest text-slate-500">
              {isDarkMode ? 'L' : 'D'}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-800 dark:text-slate-100">
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-[#18181b] border-b border-slate-100 dark:border-slate-800">
          <div className="px-6 py-6 space-y-6 flex flex-col">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium uppercase tracking-widest text-slate-800 dark:text-slate-100">
                {link.label}
              </a>
            ))}
            {adminUser && (
              <a href="/admin" className="text-sm font-medium uppercase tracking-widest text-slate-800 dark:text-slate-100">Admin</a>
            )}
            <a href="#kontak" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100 pt-4 border-t border-slate-100 dark:border-slate-800">
              Kontak Kami
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
