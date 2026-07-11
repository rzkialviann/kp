import React, { useState, useEffect, useMemo } from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import { CircleDecoration, SquareDecoration, DotsDecoration } from '../ui/Shapes';

export default function Portofolio({ onViewDetail }) {
  const { projects, categories, loading, error, refetch } = useProjects({ status: 'active' });
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = useMemo(() => {
    const cats = categories.map(c => ({ key: c.slug, label: c.name }));
    return [{ key: 'all', label: 'Semua Kategori' }, ...cats];
  }, [categories]);

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter(p => p.category_slug === activeFilter);
  }, [projects, activeFilter]);

  return (
    <section id="portofolio" className="py-24 lg:py-32 bg-white dark:bg-[#18181b] relative overflow-hidden">
      <SquareDecoration className="w-[400px] h-[400px] top-40 right-[-100px] rotate-45" />
      <DotsDecoration className="bottom-40 left-10" rows={6} cols={3} />

      <div className="w-full px-6 lg:px-12 xl:px-20 relative z-10">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 reveal">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 block">Arsip Proyek</h2>
            <h3 className="text-3xl sm:text-4xl font-medium tracking-tight text-slate-800 dark:text-slate-100">
              Rekam jejak konstruksi.
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-6 text-xs font-bold uppercase tracking-widest">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`pb-1 border-b-2 transition-colors ${
                  activeFilter === f.key
                    ? 'border-slate-800 dark:border-slate-200 text-slate-800 dark:text-slate-100'
                    : 'border-transparent text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400">
            <Loader2 className="w-5 h-5 animate-spin mb-4" />
            <p className="text-xs font-bold uppercase tracking-widest">Memuat Arsip...</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <AlertCircle className="w-6 h-6 text-red-500 mb-4" />
            <p className="text-sm text-slate-500 mb-4">{error}</p>
            <button onClick={refetch} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-slate-800 dark:border-slate-200 text-slate-800 dark:text-slate-100 pb-1">
              <RefreshCw className="w-3.5 h-3.5" /> Muat Ulang
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {filtered.length === 0 && (
              <div className="py-32 text-center text-slate-400 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs font-bold uppercase tracking-widest">Belum ada proyek dalam kategori ini.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {filtered.map((project, i) => (
                <div key={project.id} className="group cursor-pointer animate-fade-in" onClick={() => onViewDetail && onViewDetail(project.id)}>
                  <div className="w-full aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden mb-6">
                    <img
                      src={project.thumbnail || '/images/hero_bg.jpg'}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-700 ease-out transform group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {project.category_name || project.category_slug}
                      </span>
                      {project.created_at && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          {new Date(project.created_at).getFullYear()}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-medium tracking-tight text-slate-800 dark:text-slate-100 mb-2 group-hover:underline underline-offset-4 decoration-1">
                      {project.title}
                    </h4>
                    {project.address && (
                      <p className="text-sm text-slate-500 font-light truncate">
                        {project.address}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
