import React, { useState, useEffect } from 'react';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { getProjectById, getProjectGallery } from '../api/projects';

export default function ProjectDetail({ projectId, onBack }) {
  const [project, setProject] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const [projData, galleryData] = await Promise.all([
          getProjectById(projectId),
          getProjectGallery(projectId)
        ]);
        setProject(projData);
        setGallery(galleryData || []);
        setActiveImage(projData.thumbnail);
      } catch (err) {
        setError('Gagal memuat detail proyek. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };
    if (projectId) fetchDetail();
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-[#18181b] flex flex-col items-center justify-center pt-24 pb-16">
        <Loader2 className="w-6 h-6 text-slate-400 animate-spin mb-4" />
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Memuat Data Proyek...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-[#18181b] flex flex-col items-center justify-center pt-24 pb-16">
        <AlertCircle className="w-8 h-8 text-red-500 mb-4" />
        <p className="text-slate-500 mb-6">{error || 'Proyek tidak ditemukan.'}</p>
        <button onClick={() => onBack()} className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 border-b border-slate-800 dark:border-slate-200 pb-1">
          Kembali ke Portofolio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#18181b] pt-24 pb-32">
      <div className="w-full px-6 lg:px-12 xl:px-20">
        
        {/* Top Nav */}
        <div className="mb-12">
          <button 
            onClick={() => onBack('portofolio', project.category_slug)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
        </div>

        {/* Title Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 animate-fade-in">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-slate-800 dark:text-slate-300 leading-[1.05] mb-6">
              {project.title}
            </h1>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Kategori</span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-300">{project.category_name}</span>
              </div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Lokasi</span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-300">{project.address || '-'}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Tahun</span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-300">{new Date(project.created_at).getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Image View */}
        <div className="w-full aspect-video bg-slate-200 dark:bg-slate-800 overflow-hidden mb-8 animate-fade-in">
          <img 
            src={activeImage || '/images/hero_bg.jpg'} 
            alt={project.title} 
            className="w-full h-full object-cover transition-all duration-500"
          />
        </div>

        {/* Gallery Thumbnails */}
        {gallery.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-20">
            <button 
              onClick={() => setActiveImage(project.thumbnail)}
              className={`w-24 aspect-video overflow-hidden border-2 transition-colors ${activeImage === project.thumbnail ? 'border-slate-800 dark:border-slate-200' : 'border-transparent opacity-50 hover:opacity-100'}`}
            >
              <img src={project.thumbnail} className="w-full h-full object-cover grayscale" alt="Thumbnail" />
            </button>
            {gallery.map(img => (
              <button 
                key={img.id}
                onClick={() => setActiveImage(img.image_url || img.image)}
                className={`w-24 aspect-video overflow-hidden border-2 transition-colors ${activeImage === (img.image_url || img.image) ? 'border-slate-800 dark:border-slate-200' : 'border-transparent opacity-50 hover:opacity-100'}`}
              >
                <img src={img.image_url || img.image} className="w-full h-full object-cover grayscale" alt={img.title || 'Gallery'} />
              </button>
            ))}
          </div>
        )}

        {/* Detail text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-24 border-b border-slate-200 dark:border-slate-800">
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-4 lg:mb-0">Deskripsi Teknis</h3>
          </div>
          <div className="lg:col-span-8 overflow-hidden">
            <div className="prose dark:prose-invert prose-slate max-w-full lg:max-w-[85%] text-slate-700 dark:text-slate-300 font-light leading-relaxed break-words">
              {project.description.includes('<') ? (
                <div dangerouslySetInnerHTML={{ __html: project.description }} />
              ) : (
                project.description.split('\n').map((para, i) => (
                  <p key={i} className="mb-4">{para}</p>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Next Action */}
        <div className="pt-24 text-center">
          <p className="text-xl lg:text-3xl font-medium tracking-tight text-slate-800 dark:text-slate-300 mb-8">Tertarik membangun proyek serupa?</p>
          <a href="#kontak" onClick={(e) => { e.preventDefault(); onBack('kontak', project.category_slug); }} className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 border-b-2 border-slate-800 dark:border-slate-200 pb-1 hover:opacity-70 transition-opacity">
            Konsultasi Sekarang
          </a>
        </div>

      </div>
    </div>
  );
}
