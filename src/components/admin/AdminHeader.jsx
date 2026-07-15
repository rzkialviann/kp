import React from 'react';
import { Menu, LogOut } from 'lucide-react';

export default function AdminHeader({ toggleDarkMode, isDarkMode, handleLogout, isSidebarOpen, setIsSidebarOpen, activeTab, activeGalleryProject, setActiveTab, setActiveGalleryProject }) {
  return (
    <header className="h-16 flex-shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#18181b] px-6 flex items-center justify-between z-10">
      <div className="flex items-center gap-4">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        
        <nav className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 flex items-center gap-2">
          <span>STARCON</span>
          <span className="text-slate-400 dark:text-slate-600">/</span>
          <span>ADMIN</span>
          
          {activeGalleryProject ? (
            <>
              <span className="text-slate-400 dark:text-slate-600">/</span>
              <button 
                onClick={() => { setActiveGalleryProject(null); setActiveTab('projects'); }}
                className="hover:opacity-60 transition-opacity cursor-pointer text-slate-500 dark:text-slate-400"
              >
                ARSIP PROYEK
              </button>
              <span className="text-slate-400 dark:text-slate-600">/</span>
              <span>GALERI</span>
            </>
          ) : activeTab === 'projects' ? (
            <>
              <span className="text-slate-400 dark:text-slate-600">/</span>
              <span>ARSIP PROYEK</span>
            </>
          ) : activeTab === 'settings' ? (
            <>
              <span className="text-slate-400 dark:text-slate-600">/</span>
              <span>PENGATURAN SISTEM</span>
            </>
          ) : null}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <button onClick={toggleDarkMode} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
          {isDarkMode ? 'MODE: GELAP' : 'MODE: TERANG'}
        </button>
        <button onClick={handleLogout} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors">
          <LogOut className="w-3.5 h-3.5" /> KELUAR
        </button>
      </div>
    </header>
  );
}
