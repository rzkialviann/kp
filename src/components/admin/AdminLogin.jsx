import React from 'react';
import { Loader2 } from 'lucide-react';

export default function AdminLogin({ email, setEmail, password, setPassword, authError, authLoading, handleLogin, onExit }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#18181b] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        
        <div className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100 mb-2">STARCON / Admin Portal</h2>
          <p className="text-sm font-light text-slate-500 dark:text-slate-400">Autentikasi sesi administrator.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          {authError && (
            <div className="text-red-500 text-xs font-bold uppercase tracking-widest">
              Error: {authError}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Alamat Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@starcon.id" required className="bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 px-0 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-white transition-colors" />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Kata Sandi</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required className="bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 px-0 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-white transition-colors" />
          </div>

          <button type="submit" disabled={authLoading} className="w-full text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100 border-b-2 border-slate-800 dark:border-slate-200 pb-2 hover:opacity-70 transition-opacity flex justify-center items-center gap-2">
            {authLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Akses Sistem'}
          </button>
        </form>

        <button onClick={onExit} className="mt-12 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
          &larr; Kembali ke Situs Utama
        </button>
      </div>
    </div>
  );
}
