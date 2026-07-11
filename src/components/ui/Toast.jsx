import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const typeConfig = {
    success: { icon: CheckCircle2, colors: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' },
    error: { icon: AlertCircle, colors: 'bg-red-50 dark:bg-red-500/10 text-red-800 dark:text-red-400 border-red-200 dark:border-red-500/20' },
    info: { icon: Info, colors: 'bg-blue-50 dark:bg-blue-500/10 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-500/20' }
  };

  const { icon: Icon, colors } = typeConfig[type] || typeConfig.info;

  return (
    <div className="fixed top-6 right-6 z-[100] animate-fade-in">
      <div className={`flex items-center gap-3 px-4 py-3 border rounded shadow-lg backdrop-blur-md ${colors}`}>
        <Icon className="w-5 h-5 shrink-0" />
        <p className="text-sm font-medium pr-6">{message}</p>
        <button onClick={onClose} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
