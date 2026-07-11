import React from 'react';
import { Loader2, Settings, BarChart3, Contact, Save } from 'lucide-react';

export default function SettingsTab({ settingsData, setSettingsData, handleSettingsSubmit, settingsLoading }) {
  return (
    <div className="space-y-16 animate-fade-in">
      
      <div className="mb-8 border-b-2 border-slate-800 dark:border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 p-2">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100 uppercase">Pengaturan Sistem</h2>
            <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-widest">Konfigurasi parameter operasional utama</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSettingsSubmit} className="space-y-16 max-w-4xl">
        
        {/* STATS SECTION */}
        <div>
          <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-2">
            <BarChart3 className="w-4 h-4" /> Metrik Performa
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            <div className="sm:col-span-2">
              <div className="flex justify-between items-end mb-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100">Total Proyek Selesai</label>
                <label className="flex items-center gap-2 cursor-pointer bg-slate-100 dark:bg-slate-800 px-3 py-1">
                  <input type="checkbox" checked={settingsData.stats_mode === 'auto'} onChange={e => setSettingsData({...settingsData, stats_mode: e.target.checked ? 'auto' : 'manual'})} className="accent-slate-800 dark:accent-white" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Hitung Otomatis</span>
                </label>
              </div>
              <input type="number" value={settingsData.stats_projects || ''} onChange={e => setSettingsData({...settingsData, stats_projects: e.target.value})} disabled={settingsData.stats_mode === 'auto'} className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-white transition-colors disabled:opacity-50" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100 mb-2">Tahun Pengalaman</label>
              <input type="number" value={settingsData.stats_years || ''} onChange={e => setSettingsData({...settingsData, stats_years: e.target.value})} className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-white transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100 mb-2">Klien Korporat/Publik</label>
              <input type="number" value={settingsData.stats_clients || ''} onChange={e => setSettingsData({...settingsData, stats_clients: e.target.value})} className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-white transition-colors" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100 mb-2">Indeks Kepuasan Kualitas (%)</label>
              <input type="number" value={settingsData.stats_quality || ''} onChange={e => setSettingsData({...settingsData, stats_quality: e.target.value})} className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-white transition-colors" />
            </div>
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div>
          <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Contact className="w-4 h-4" /> Narahubung & Lokasi
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100 mb-2">Saluran WhatsApp</label>
              <input type="text" value={settingsData.contact_wa || ''} onChange={e => setSettingsData({...settingsData, contact_wa: e.target.value})} placeholder="+62..." className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-white transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100 mb-2">Saluran Telepon</label>
              <input type="text" value={settingsData.contact_phone || ''} onChange={e => setSettingsData({...settingsData, contact_phone: e.target.value})} placeholder="(031)..." className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-white transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100 mb-2">Surel Elektronik</label>
              <input type="email" value={settingsData.contact_email || ''} onChange={e => setSettingsData({...settingsData, contact_email: e.target.value})} placeholder="hello@..." className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-white transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100 mb-2">Identitas Instagram</label>
              <input type="text" value={settingsData.contact_ig || ''} onChange={e => setSettingsData({...settingsData, contact_ig: e.target.value})} placeholder="@..." className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-white transition-colors" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100 mb-2">Alamat Fisik</label>
              <textarea rows="2" value={settingsData.contact_address || ''} onChange={e => setSettingsData({...settingsData, contact_address: e.target.value})} className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-white transition-colors resize-none" />
            </div>
          </div>
        </div>

        <div className="pt-8">
          <button type="submit" disabled={settingsLoading} className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-white bg-slate-800 dark:text-slate-800 dark:bg-slate-200 px-6 py-3 hover:opacity-80 transition-opacity">
            {settingsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Simpan Parameter Konfigurasi
          </button>
        </div>
      </form>
    </div>
  );
}
