import React from 'react';
import { CircleDecoration, SquareDecoration, DotsDecoration } from '../ui/Shapes';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen bg-zinc-50 dark:bg-zinc-900 pt-24 pb-16 flex flex-col justify-end relative overflow-hidden">
      
      {/* Background Decorations */}
      <CircleDecoration className="w-[800px] h-[800px] -top-[400px] -right-[200px]" />
      <SquareDecoration className="w-64 h-64 bottom-20 -left-10 rotate-12" />
      <DotsDecoration className="top-32 left-10" rows={4} cols={8} />

      <div className="w-full px-6 lg:px-12 xl:px-20 w-full animate-fade-in flex flex-col h-full justify-between relative z-10">
        
        {/* Top Header Area */}
        <div className="mt-12 lg:mt-24 mb-16 max-w-5xl">
          <h1 className="font-bold text-5xl sm:text-6xl lg:text-[5.5rem] leading-[1.05] tracking-tighter text-slate-800 dark:text-slate-100 mb-8">
            Membangun presisi.<br className="hidden sm:block" />
            Membentuk masa depan.
          </h1>
        </div>

        {/* Bottom Area: Grid for Image & Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mt-auto">
          {/* Main Hero Image */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="w-full aspect-[16/9] lg:aspect-[2/1] overflow-hidden bg-slate-200 dark:bg-slate-800 relative">
              <img 
                src="/images/hero_bg.jpg" 
                alt="Architecture" 
                className="w-full h-full object-cover transition-all duration-700"
              />
            </div>
          </div>

          {/* Description & CTA */}
          <div className="lg:col-span-4 order-1 lg:order-2 pb-2 lg:pb-0 space-y-8">
            <p className="text-sm lg:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              CV. Starcon Sejahtera menghadirkan solusi konstruksi profesional untuk proyek infrastruktur, gedung, dan fasilitas publik di seluruh Indonesia dengan standar kualitas tertinggi.
            </p>
            <div className="flex items-center gap-6">
              <a href="#kontak" className="inline-block border-b border-slate-800 dark:border-slate-200 text-slate-800 dark:text-slate-100 font-bold text-sm uppercase tracking-widest pb-1 hover:opacity-70 transition-opacity">
                Mulai Proyek
              </a>
              <a href="#portofolio" className="inline-block text-slate-400 hover:text-slate-800 dark:hover:text-white font-medium text-sm uppercase tracking-widest transition-colors">
                Lihat Karya
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
