import React from 'react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/90 dark:bg-[#18181b]/90 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative z-10 w-full max-w-sm bg-white dark:bg-[#18181b] border border-slate-200 dark:border-slate-800 shadow-2xl p-8">
        
        <div className="mb-8">
          <h3 className="text-xl font-medium tracking-tight text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
          <p className="text-sm font-light text-slate-500">{message}</p>
        </div>
        
        <div className="flex justify-end gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <button onClick={onClose} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
            Batalkan
          </button>
          <button onClick={onConfirm} className="text-[10px] font-bold uppercase tracking-widest text-red-500 border-b-2 border-red-500 pb-1 hover:opacity-70 transition-opacity">
            Konfirmasi
          </button>
        </div>
        
      </div>
    </div>
  );
}
