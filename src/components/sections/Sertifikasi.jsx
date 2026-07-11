import React from 'react';
import { CircleDecoration, DotsDecoration } from '../ui/Shapes';

const certs = [
  { code: 'SBU', label: 'Sertifikat Badan Usaha', desc: 'Sertifikasi keahlian teknis oleh LPJK untuk pekerjaan klasifikasi BG & SI dengan kualifikasi terukur.' },
  { code: 'NIB', label: 'Nomor Induk Berusaha', desc: 'Identitas dan legalitas operasional resmi terdaftar pada kementerian investasi & BKPM.' },
  { code: 'NPWP', label: 'Wajib Pajak Badan', desc: 'Kepatuhan administrasi fiskal dan transparansi tata kelola keuangan perusahaan.' },
  { code: 'SMK3', label: 'Sertifikat K3', desc: 'Penerapan standar tertinggi manajemen keselamatan & kesehatan kerja di lapangan.' },
];

export default function Sertifikasi() {
  return (
    <section id="sertifikasi" className="py-24 lg:py-32 bg-white dark:bg-[#18181b] relative overflow-hidden">
      <CircleDecoration className="w-[400px] h-[400px] top-[-100px] left-[-100px]" />
      <DotsDecoration className="bottom-10 right-1/4" rows={2} cols={10} />
      
      <div className="w-full px-6 lg:px-12 xl:px-20 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 reveal">
          <div className="lg:col-span-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 block">Legalitas</h2>
            <h3 className="text-3xl font-medium tracking-tight text-slate-800 dark:text-slate-100 max-w-sm">
              Sertifikasi & Kepatuhan
            </h3>
          </div>
          
          <div className="lg:col-span-8">
            <div className="border-t border-slate-200 dark:border-slate-800">
              {certs.map(c => (
                <div key={c.code} className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-8 border-b border-slate-200 dark:border-slate-800 hover:bg-zinc-50 dark:hover:bg-slate-800/30 transition-colors">
                  <div className="sm:col-span-3">
                    <h4 className="text-2xl font-light tracking-tight text-slate-800 dark:text-slate-100">{c.code}</h4>
                  </div>
                  <div className="sm:col-span-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100 mb-2">{c.label}</p>
                  </div>
                  <div className="sm:col-span-5">
                    <p className="text-sm font-light text-slate-500 dark:text-slate-400 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
