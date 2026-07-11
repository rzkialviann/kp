import React from 'react';
import { Menu } from 'lucide-react';

export default function AdminHeader({ toggleDarkMode, isDarkMode, handleLogout, isSidebarOpen, setIsSidebarOpen }) {
  return (
    <header className="h-16 flex-shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#18181b] px-6 flex items-center justify-between z-10">
      <div className="flex items-center gap-4">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <span className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100">STARCON / ADMIN</span>
      </div>

      <div className="flex items-center gap-6">
        <button onClick={toggleDarkMode} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
          {isDarkMode ? 'MODE: GELAP' : 'MODE: TERANG'}
        </button>
        <button onClick={handleLogout} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
          AKHIRI SESI
        </button>
      </div>
    </header>
  );
}
