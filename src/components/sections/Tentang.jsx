import React, { useState, useEffect } from 'react';
import { getSettings } from '../../api/settings';
import { CircleDecoration, DotsDecoration } from '../ui/Shapes';

export default function Tentang() {
  const [stats, setStats] = useState({ years: '09', projects: '2K' });

  useEffect(() => {
    getSettings().then(s => {
      if (s) {
        setStats({
          years: s.stats_years ? (parseInt(s.stats_years) < 10 ? `0${s.stats_years}` : s.stats_years) : '09',
          projects: s.stats_projects || '2K'
        });
      }
    }).catch(err => console.error(err));
  }, []);

  return (
    <section id="tentang" className="py-24 lg:py-32 bg-zinc-50 dark:bg-zinc-900 relative overflow-hidden">
      {/* Decorations */}
      <CircleDecoration className="w-[500px] h-[500px] bottom-0 right-[-250px]" />
      <DotsDecoration className="top-40 right-20" rows={4} cols={4} />

      <div className="w-full px-6 lg:px-12 xl:px-20 relative z-10">
        
        {/* Editorial Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 lg:mb-24 reveal">
          <div className="lg:col-span-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 block">Profil Perusahaan</h2>
          </div>
          <div className="lg:col-span-7">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl leading-tight font-medium text-slate-800 dark:text-slate-300 tracking-tight">
              Dedikasi pada keunggulan struktur, mengutamakan keamanan dan ketepatan waktu untuk setiap skala proyek.
            </h3>
          </div>
        </div>

        {/* Content & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 reveal">
          <div className="lg:col-span-5 flex flex-col justify-between border-t border-slate-200 dark:border-slate-800 pt-8">
            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed font-light mb-12">
              Sejak didirikan pada tahun 2013, CV. Starcon Sejahtera telah bertransformasi menjadi mitra konstruksi pilihan yang menangani beragam portofolio mulai dari arsitektur, sipil, mekanikal elektrikal, hingga infrastruktur kawasan terpadu.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <span className="font-light text-5xl lg:text-6xl text-slate-800 dark:text-slate-300 tracking-tighter">{stats.years}</span>
                <div className="pt-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 mb-1">Tahun</p>
                  <p className="text-sm text-slate-500">Pengalaman di industri konstruksi sipil dan baja.</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <span className="font-light text-5xl lg:text-6xl text-slate-800 dark:text-slate-300 tracking-tighter">{stats.projects}</span>
                <div className="pt-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 mb-1">Proyek</p>
                  <p className="text-sm text-slate-500">Telah diselesaikan di seluruh Indonesia.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 border-t border-slate-200 dark:border-slate-800 pt-8">
            <div className="w-full aspect-[4/3] lg:aspect-square overflow-hidden bg-slate-200 dark:bg-slate-800 relative group">
              <img 
                src="/images/hero_bg.jpg" 
                alt="Konstruksi" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-out"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
