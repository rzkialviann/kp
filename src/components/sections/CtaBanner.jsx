import React from 'react';

export default function CtaBanner() {
  return (
    <section className="bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 py-24 lg:py-32 overflow-hidden">
      <div className="w-full px-6 lg:px-12 xl:px-20 text-center reveal">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter mb-8 leading-[1.05]">
          Punya Rencana Proyek?
        </h2>
        <p className="text-slate-400 dark:text-slate-500 font-light max-w-lg mx-auto mb-12">
          Dari perencanaan teknis hingga eksekusi struktural, tim kami siap merealisasikan visi konstruksi Anda.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-sm font-bold uppercase tracking-widest border-b-2 border-white dark:border-slate-800 pb-1 hover:opacity-70 transition-opacity">
            WhatsApp Kami
          </a>
          <a href="#kontak" className="text-sm font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-800 transition-colors">
            Isi Form
          </a>
        </div>
      </div>
    </section>
  );
}
