import React, { useState } from 'react';
import { Loader2, Settings, BarChart3, Contact, Save, User as UserIcon, Eye, EyeOff } from 'lucide-react';
import { updateUser } from '../../api/auth';

export default function SettingsTab({ settingsData, setSettingsData, handleSettingsSubmit, settingsLoading, session, setSession, showToast }) {
  const [adminLoading, setAdminLoading] = useState(false);

  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [emailInput, setEmailInput] = useState(session?.email || '');

  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [oldPasswordInput, setOldPasswordInput] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    if (!session?.id) return;
    setAdminLoading(true);
    try {
      const updated = await updateUser(session.id, {
        name: session.name || 'Administrator',
        email: emailInput
      });
      setSession(updated);
      localStorage.setItem('starcon_admin_user', JSON.stringify(updated));
      setIsEmailDialogOpen(false);
      showToast('Email berhasil diperbarui!', 'success');
    } catch (err) {
      showToast('Gagal memperbarui email: ' + err.message, 'error');
    }
    setAdminLoading(false);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!session?.id || !passwordInput || !oldPasswordInput) return;
    setAdminLoading(true);
    try {
      const updated = await updateUser(session.id, {
        name: session.name || 'Administrator',
        email: session.email,
        password: passwordInput,
        old_password: oldPasswordInput
      });
      setSession(updated);
      localStorage.setItem('starcon_admin_user', JSON.stringify(updated));
      setIsPasswordDialogOpen(false);
      setPasswordInput('');
      setOldPasswordInput('');
      showToast('Password berhasil diperbarui!', 'success');
    } catch (err) {
      showToast('Gagal memperbarui password: ' + err.message, 'error');
    }
    setAdminLoading(false);
  };

  return (
    <div className="space-y-16 animate-fade-in">

      <div className="mb-8 border-b-2 border-slate-800 dark:border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 p-2">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-300 uppercase">Pengaturan Sistem</h2>
            <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-widest">Konfigurasi parameter operasional utama</p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-100 dark:bg-slate-800 px-5 py-3 mb-8 shadow-sm">
          <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200">
            <UserIcon className="w-4 h-4" /> Info Akun
          </h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-2 sm:mt-0">
            Kredensial Akses Administrator
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 mb-2">Email Admin</label>
            <div className="flex items-center justify-between border-b border-slate-300 dark:border-slate-700 pb-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">{session?.email || '-'}</span>
              <button type="button" onClick={() => { setEmailInput(session?.email || ''); setIsEmailDialogOpen(true); }} className="text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 hover:opacity-70 transition-opacity">
                Ubah Email
              </button>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 mb-2">Password</label>
            <div className="flex items-center justify-between border-b border-slate-300 dark:border-slate-700 pb-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">••••••••</span>
              <button type="button" onClick={() => setIsPasswordDialogOpen(true)} className="text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 hover:opacity-70 transition-opacity">
                Ubah Password
              </button>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSettingsSubmit} className="w-full">
        <div className="flex flex-col lg:flex-row gap-x-16 gap-y-16 w-full">
          {/* STATS SECTION */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-100 dark:bg-slate-800 px-5 py-3 mb-8 shadow-sm">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200">
                <BarChart3 className="w-4 h-4" /> Statistic
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-2 sm:mt-0">
                Data Performa Halaman Utama
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              <div className="sm:col-span-2">
                <div className="flex justify-between items-end mb-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300">Total Proyek Selesai</label>
                  <label className="flex items-center gap-2 cursor-pointer bg-slate-100 dark:bg-slate-800 px-3 py-1">
                    <input type="checkbox" checked={settingsData.stats_mode === 'auto'} onChange={e => setSettingsData({ ...settingsData, stats_mode: e.target.checked ? 'auto' : 'manual' })} className="accent-slate-800 dark:accent-slate-300" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sinkron Proyek Publik</span>
                  </label>
                </div>
                <input type="number" value={settingsData.stats_projects || ''} onChange={e => setSettingsData({ ...settingsData, stats_projects: e.target.value })} disabled={settingsData.stats_mode === 'auto'} className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-slate-400 transition-colors disabled:opacity-50" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 mb-2">Tahun Pengalaman</label>
                <input type="number" value={settingsData.stats_years || ''} onChange={e => setSettingsData({ ...settingsData, stats_years: e.target.value })} className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-slate-400 transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 mb-2">Klien Korporat/Publik</label>
                <input type="number" value={settingsData.stats_clients || ''} onChange={e => setSettingsData({ ...settingsData, stats_clients: e.target.value })} className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-slate-400 transition-colors" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 mb-2">Indeks Kepuasan Kualitas (%)</label>
                <input type="number" value={settingsData.stats_quality || ''} onChange={e => setSettingsData({ ...settingsData, stats_quality: e.target.value })} className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-slate-400 transition-colors" />
              </div>
            </div>
          </div>

          {/* CONTACT SECTION */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-100 dark:bg-slate-800 px-5 py-3 mb-8 shadow-sm">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200">
                <Contact className="w-4 h-4" /> Web Info
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-2 sm:mt-0">
                Kontak & Lokasi Pada Footer
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 mb-2">Nomor Whatsapp</label>
                <input type="text" value={settingsData.contact_wa || ''} onChange={e => setSettingsData({ ...settingsData, contact_wa: e.target.value })} placeholder="+62..." className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-slate-400 transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 mb-2">Nomor Telepon</label>
                <input type="text" value={settingsData.contact_phone || ''} onChange={e => setSettingsData({ ...settingsData, contact_phone: e.target.value })} placeholder="(031)..." className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-slate-400 transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 mb-2">Alamat Email</label>
                <input type="email" value={settingsData.contact_email || ''} onChange={e => setSettingsData({ ...settingsData, contact_email: e.target.value })} placeholder="hello@..." className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-slate-400 transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 mb-2">Username Instagram</label>
                <input type="text" value={settingsData.contact_ig || ''} onChange={e => setSettingsData({ ...settingsData, contact_ig: e.target.value })} placeholder="@..." className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-slate-400 transition-colors" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 mb-2">Alamat Kantor</label>
                <textarea rows="2" value={settingsData.contact_address || ''} onChange={e => setSettingsData({ ...settingsData, contact_address: e.target.value })} className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-slate-400 transition-colors resize-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12">
          <button type="submit" disabled={settingsLoading} className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-white bg-slate-800 dark:text-slate-800 dark:bg-slate-200 px-6 py-3 hover:opacity-80 transition-opacity">
            {settingsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Simpan Parameter Konfigurasi
          </button>
        </div>
      </form>

      {/* EMAIL DIALOG */}
      {isEmailDialogOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-white/90 dark:bg-[#18181b]/90 backdrop-blur-sm" onClick={() => setIsEmailDialogOpen(false)} />
          <div className="relative z-10 w-full max-w-sm bg-white dark:bg-[#18181b] border border-slate-200 dark:border-slate-800 shadow-2xl p-8">
            <h3 className="text-xl font-medium tracking-tight text-slate-800 dark:text-slate-300 mb-2">Ubah Email</h3>
            <p className="text-sm font-light text-slate-500 mb-6">Masukkan alamat email baru untuk login administrator.</p>
            <form onSubmit={handleUpdateEmail}>
              <input type="email" value={emailInput} onChange={e => setEmailInput(e.target.value)} required placeholder="Email baru" className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-slate-400 transition-colors mb-6" />
              <div className="flex justify-end gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setIsEmailDialogOpen(false)} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                  Batal
                </button>
                <button type="submit" disabled={adminLoading} className="text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 border-b-2 border-slate-800 dark:border-slate-200 pb-1 hover:opacity-70 transition-opacity flex items-center gap-2">
                  {adminLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : null} Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PASSWORD DIALOG */}
      {isPasswordDialogOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-white/90 dark:bg-[#18181b]/90 backdrop-blur-sm" onClick={() => setIsPasswordDialogOpen(false)} />
          <div className="relative z-10 w-full max-w-sm bg-white dark:bg-[#18181b] border border-slate-200 dark:border-slate-800 shadow-2xl p-8">
            <h3 className="text-xl font-medium tracking-tight text-slate-800 dark:text-slate-300 mb-2">Ubah Password</h3>
            <p className="text-sm font-light text-slate-500 mb-6">Masukkan kata sandi lama dan baru untuk administrator.</p>
            <form onSubmit={handleUpdatePassword}>
              <div className="relative mb-4">
                <input type={showOldPassword ? "text" : "password"} value={oldPasswordInput} onChange={e => setOldPasswordInput(e.target.value)} required placeholder="Password lama" className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 pr-10 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-slate-400 transition-colors" />
                <button type="button" onClick={() => setShowOldPassword(!showOldPassword)} className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="relative mb-6">
                <input type={showPassword ? "text" : "password"} value={passwordInput} onChange={e => setPasswordInput(e.target.value)} required placeholder="Password baru" className="bg-zinc-50 dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 pr-10 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-slate-400 transition-colors" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex justify-end gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setIsPasswordDialogOpen(false)} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                  Batal
                </button>
                <button type="submit" disabled={adminLoading} className="text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 border-b-2 border-slate-800 dark:border-slate-200 pb-1 hover:opacity-70 transition-opacity flex items-center gap-2">
                  {adminLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : null} Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
