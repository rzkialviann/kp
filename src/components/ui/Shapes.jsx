import React from 'react';

// A collection of minimalist geometric shapes for background decoration

export const CircleDecoration = ({ className = '' }) => (
  <div className={`absolute rounded-full border border-slate-300 dark:border-slate-800 opacity-20 pointer-events-none ${className}`}></div>
);

export const SquareDecoration = ({ className = '' }) => (
  <div className={`absolute border border-slate-300 dark:border-slate-800 opacity-20 pointer-events-none ${className}`}></div>
);

export const DotsDecoration = ({ className = '', rows = 5, cols = 5 }) => {
  return (
    <div className={`absolute flex flex-wrap gap-4 opacity-10 pointer-events-none ${className}`} style={{ width: (cols * 20) + 'px' }}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-slate-500 dark:bg-slate-400"></div>
      ))}
    </div>
  );
};
