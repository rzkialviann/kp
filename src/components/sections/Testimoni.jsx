import React from 'react';
import { Quote } from 'lucide-react';
import { CircleDecoration, DotsDecoration } from '../ui/Shapes';

export default function Testimoni() {
  const testimonials = [
    {
      text: "Kolaborasi dengan Starcon memberikan kepastian kualitas. Setiap fase proyek dijalankan dengan presisi dan manajemen risiko yang terukur.",
      author: "Ir. Hendra Wijaya",
      role: "Direktur Proyek, PT. Sinergi Bangun Pertiwi",
    },
    {
      text: "Dari sisi arsitektural hingga struktural, mereka mampu menerjemahkan visi desain kami menjadi realitas bangunan yang solid.",
      author: "Anita Kusuma, IAI",
      role: "Principal Architect, Studio AK",
    },
    {
      text: "Komitmen terhadap jadwal dan standar K3 di lapangan sangat mengesankan. Mitra yang bisa diandalkan untuk infrastruktur berat.",
      author: "Budi Santoso",
      role: "Kepala Dinas PU Daerah",
    }
  ];

  return (
    <section id="testimoni" className="py-24 lg:py-32 bg-zinc-50 dark:bg-zinc-900 relative overflow-hidden">
      <CircleDecoration className="w-[700px] h-[700px] -top-[350px] -right-[200px]" />
      <DotsDecoration className="bottom-20 left-20" rows={4} cols={6} />

      <div className="w-full px-6 lg:px-12 xl:px-20 relative z-10">
        
        <div className="mb-16 reveal">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 block">Testimoni</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {testimonials.map((t, i) => (
            <div key={i} className="reveal flex flex-col justify-between h-full" style={{ transitionDelay: `${i * 100}ms` }}>
              <p className="text-lg lg:text-xl font-medium tracking-tight text-slate-800 dark:text-slate-100 leading-relaxed mb-8">
                "{t.text}"
              </p>
              <div className="border-t border-slate-200 dark:border-slate-800 pt-6 mt-auto">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest mb-1">{t.author}</p>
                <p className="text-xs text-slate-500 font-light">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
