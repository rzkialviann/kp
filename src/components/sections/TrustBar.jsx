import React from 'react';

export default function TrustBar() {
  const items = ['SBU & NIB Aktif', 'Anggota GAPENSI', 'Standar K3', 'Berdiri Sejak 2013'];
  return (
    <section className="bg-zinc-50 dark:bg-[#18181b]">
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <div className="border-t border-b border-slate-200 dark:border-slate-800 py-6">
          <div className="flex flex-wrap justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
            {items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
