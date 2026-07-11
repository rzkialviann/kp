import React, { useState } from 'react';
import { CircleDecoration, DotsDecoration } from '../ui/Shapes';

export default function Layanan() {
  const [active, setActive] = useState('01');
  const services = [
    { id: '01', title: 'Konstruksi Gedung', desc: 'Gedung perkantoran, hotel, apartemen, perumahan, ruko, dan fasilitas industri dengan standar struktural tinggi.' },
    { id: '02', title: 'Pembangunan Jalan', desc: 'Pengaspalan hotmix, rigid pavement, pengerasan jalan, dan penataan kawasan yang efisien.' },
    { id: '03', title: 'Konstruksi Jembatan', desc: 'Jembatan beton bertulang, baja rangka, dan gantung skala kecil hingga menengah.' },
    { id: '04', title: 'Infrastruktur Drainase', desc: 'Saluran air, box culvert, tanggul, irigasi, dan proyek normalisasi sungai.' },
    { id: '05', title: 'Renovasi Bangunan', desc: 'Restorasi arsitektur, retrofit tahan gempa, penambahan struktur, dan peremajaan fasad.' },
    { id: '06', title: 'Perencanaan & Pengawasan', desc: 'Penyusunan DED, perhitungan struktur presisi, estimasi RAB, serta supervisi lapangan berkala.' },
  ];

  return (
    <section id="layanan" className="py-24 lg:py-32 bg-white dark:bg-[#18181b] relative overflow-hidden">
      {/* Decorations */}
      <CircleDecoration className="w-[600px] h-[600px] top-0 -left-[300px]" />
      <DotsDecoration className="bottom-20 right-20" rows={5} cols={5} />

      <div className="w-full px-6 lg:px-12 xl:px-20 relative z-10">
        
        <div className="mb-16 lg:mb-24 reveal">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 block">Kompetensi Inti</h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-slate-800 dark:text-slate-100 max-w-2xl">
            Layanan rekayasa & konstruksi terpadu
          </h3>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 reveal">
          {services.map((svc) => (
            <div 
              key={svc.id} 
              className={`group border-b border-slate-200 dark:border-slate-800 py-6 transition-colors duration-300 ${active === svc.id ? '' : 'cursor-pointer hover:bg-zinc-50 dark:hover:bg-slate-800/30'}`}
              onMouseEnter={() => setActive(svc.id)}
              onClick={() => setActive(svc.id)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-baseline">
                <div className="lg:col-span-2">
                  <span className={`text-sm font-medium transition-colors ${active === svc.id ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400'}`}>
                    {svc.id}
                  </span>
                </div>
                <div className="lg:col-span-5">
                  <h4 className={`text-xl lg:text-3xl font-medium tracking-tight transition-colors ${active === svc.id ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white'}`}>
                    {svc.title}
                  </h4>
                </div>
                <div className="lg:col-span-5 hidden lg:block overflow-hidden">
                  <div className={`transition-all duration-500 ease-out ${active === svc.id ? 'opacity-100 max-h-40 translate-y-0' : 'opacity-0 max-h-0 translate-y-4'}`}>
                    <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                      {svc.desc}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Mobile description */}
              <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-out mt-2 ${active === svc.id ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'}`}>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-light leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
