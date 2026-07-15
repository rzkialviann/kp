import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomSelect({ value, onChange, options, placeholder = 'Pilih...', required }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const selectedOption = options.find(o => o.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full text-sm" ref={ref}>
      {/* Required hidden input to satisfy HTML form validation if needed */}
      {required && (
        <input 
          type="text" 
          required={required} 
          value={value} 
          onChange={() => {}} 
          className="absolute opacity-0 pointer-events-none -z-10 h-0 w-0" 
        />
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 px-0 py-2 outline-none focus:border-slate-800 dark:focus:border-slate-200 transition-colors text-left"
      >
        <span className={selectedOption ? 'text-slate-800 dark:text-slate-300' : 'text-slate-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-slate-700 shadow-xl max-h-60 overflow-y-auto outline-none rounded-none">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange({ target: { value: opt.value } });
                setIsOpen(false);
              }}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                value === opt.value
                  ? 'bg-zinc-100 dark:bg-zinc-700/50 text-slate-800 dark:text-slate-300 font-medium'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-700/30'
              }`}
            >
              <span>{opt.label}</span>
              {value === opt.value && <Check className="w-4 h-4 text-slate-800 dark:text-slate-300" />}
            </div>
          ))}
          {options.length === 0 && (
            <div className="px-4 py-3 text-slate-400 italic">Data kosong...</div>
          )}
        </div>
      )}
    </div>
  );
}
