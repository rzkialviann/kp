import React from 'react';
import { CircleDecoration, SquareDecoration } from '../ui/Shapes';

export default function ProsesKerja() {
  const steps = [
    {
      id: '01',
      title: 'Konsultasi & Analisis Kebutuhan',
      desc: 'Pemahaman mendalam terhadap visi klien, studi kelayakan, dan estimasi sumber daya awal.'
    },
    {
      id: '02',
      title: 'Perencanaan Teknis',
      desc: 'Pengembangan DED (Detail Engineering Design), perhitungan struktur, dan penyusunan RAB.'
    },
    {
      id: '03',
      title: 'Eksekusi & Konstruksi',
      desc: 'Implementasi lapangan dengan pengawasan ketat, memastikan standar K3 dan timeline terjaga.'
    },
    {
      id: '04',
      title: 'Serah Terima & Garansi',
      desc: 'Inspeksi akhir bersertifikasi, serah terima proyek, dan masa pemeliharaan terjamin.'
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-zinc-900 relative overflow-hidden">
      <SquareDecoration className="w-[300px] h-[300px] top-1/2 -left-[150px] rotate-12" />
      <CircleDecoration className="w-[800px] h-[800px] -bottom-[400px] -right-[200px]" />

      <div className="w-full px-6 lg:px-12 xl:px-20 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 reveal">
          <div className="lg:col-span-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 lg:sticky lg:top-32">Metodologi</h2>
          </div>
          
          <div className="lg:col-span-7">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-slate-800 dark:text-slate-300 mb-16">
              Sistematika kerja terstruktur.
            </h3>
            
            <div className="space-y-16 lg:space-y-24">
              {steps.map(step => (
                <div key={step.id} className="relative pl-0 md:pl-20">
                  {/* Number indicator - large and offset on desktop */}
                  <div className="md:absolute md:left-0 md:top-0 mb-4 md:mb-0">
                    <span className="font-light text-5xl text-slate-300 dark:text-slate-800 tracking-tighter block">{step.id}</span>
                  </div>
                  
                  <h4 className="text-2xl font-medium tracking-tight text-slate-800 dark:text-slate-300 mb-4">
                    {step.title}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-lg">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
