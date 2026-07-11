import React from 'react';
import { X, FolderKanban, Settings, ArrowLeft } from 'lucide-react';

export default function AdminSidebar({ activeTab, setActiveTab, activeGalleryProject, setActiveGalleryProject, onExit, isSidebarOpen, setIsSidebarOpen }) {
  const nav = (tab) => {
    setActiveGalleryProject(null);
    setActiveTab(tab);
    if (setIsSidebarOpen) setIsSidebarOpen(false);
  };

  const linkClass = (tab) =>
    `w-full text-left py-3 px-4 text-[11px] font-bold uppercase tracking-widest transition-colors flex items-center gap-3 ${
      activeTab === tab && !activeGalleryProject
        ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-800'
        : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white'
    }`;

  return (
    <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-[#18181b] border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col transition-transform duration-300 ease-out md:static md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between mb-12 md:hidden">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Navigasi Panel</span>
        <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
      </div>

      <div className="space-y-2">
        <button onClick={() => nav('projects')} className={linkClass('projects')}>
          <FolderKanban className="w-4 h-4" /> Manajemen Proyek
        </button>
        <button onClick={() => nav('settings')} className={linkClass('settings')}>
          <Settings className="w-4 h-4" /> Pengaturan Sistem
        </button>
      </div>

      <div className="mt-auto pt-12">
        <button onClick={onExit} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors w-full px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-4 h-4" /> Website
        </button>
      </div>
    </aside>
  );
}
