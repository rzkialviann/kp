import React, { useState } from 'react';
import { MapPin, Calendar } from 'lucide-react';

const projects = [
  {
    category: 'gedung',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop',
    title: 'Pembangunan Gedung Kantor Bupati Utama',
    desc: 'Pembangunan struktur beton bertulang 4 lantai modern dengan fasad kaca hemat energi.',
    location: 'Samarinda, Kaltim',
    year: '2025',
  },
  {
    category: 'jalan',
    image: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=600&auto=format&fit=crop',
    title: 'Pelebaran Jalan Trans Sulawesi',
    desc: 'Pekerjaan pelebaran jalan nasional sepanjang 12 KM menggunakan aspal hotmix bermutu AC-WC.',
    location: 'Mamuju, Sulawesi Barat',
    year: '2024',
  },
  {
    category: 'jembatan',
    image: 'https://images.unsplash.com/photo-1545624446-43a77ab172c2?q=80&w=600&auto=format&fit=crop',
    title: 'Jembatan Beton Pelengkung Sungai Cimanuk',
    desc: 'Konstruksi jembatan penghubung antar desa dengan bentang 60 Meter fondasi tiang pancang.',
    location: 'Garut, Jawa Barat',
    year: '2024',
  },
  {
    category: 'infrastruktur',
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop',
    title: 'Sistem Drainase & Pintu Air Kawasan Industri',
    desc: 'Pembangunan drainase beton U-Ditch 150x150 cm penanggulangan genangan air.',
    location: 'Bekasi, Jawa Barat',
    year: '2023',
  },
];

const filters = [
  { key: 'all', label: 'Semua' },
  { key: 'gedung', label: 'Gedung' },
  { key: 'jalan', label: 'Jalan' },
  { key: 'jembatan', label: 'Jembatan' },
  { key: 'infrastruktur', label: 'Infrastruktur' },
];

export default function Portofolio() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portofolio" className="py-20 lg:py-28 border-t border-slate-200 dark:border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 reveal">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-4">Portofolio Proyek</h2>
        <p className="text-slate-500 dark:text-slate-400">Dokumentasi proyek-proyek yang telah kami selesaikan</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center items-center gap-2 mb-12 reveal">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`filter-btn px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === f.key
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.title}
            className="portfolio-item animate-fade-in-up bg-white dark:bg-slate-900/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            data-category={project.category}
          >
            <div className="relative overflow-hidden group h-56">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="text-xs font-semibold text-white bg-slate-900/70 backdrop-blur-sm px-3 py-1 rounded-md uppercase tracking-wide">
                  {project.category}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-heading font-semibold text-base text-slate-900 dark:text-white mb-2">{project.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">{project.desc}</p>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
                <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1.5" />{project.location}</span>
                <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1.5" />{project.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  </section>
  );
}
