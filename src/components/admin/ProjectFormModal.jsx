import React from 'react';
import { X, Loader2 } from 'lucide-react';
import CustomSelect from '../ui/CustomSelect';

export default function ProjectFormModal({
  projectFormOpen, setProjectFormOpen, editingProject, handleProjectSubmit,
  projectTitle, setProjectTitle, projectCategoryId, setProjectCategoryId, categories,
  projectStatus, setProjectStatus, projectAddress, setProjectAddress,
  projectDescription, setProjectDescription, thumbnailPreview, projectThumbnailUrl,
  setProjectThumbnailUrl, setThumbnailPreview, setProjectThumbnail, handleThumbnailChange, formLoading,
}) {
  if (!projectFormOpen) return null;

  const categoryOptions = categories.map(c => ({ value: c.id, label: c.name }));
  const statusOptions = [
    { value: 'active', label: 'Publikasi Terbuka' },
    { value: 'draft', label: 'Pengarsipan Internal' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm" onClick={() => setProjectFormOpen(false)} />

      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-[#18181b] border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[90vh]">
        
        <div className="p-6 lg:p-8 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-xl font-medium tracking-tight text-slate-800 dark:text-slate-100">
            {editingProject ? 'Ubah Data Proyek' : 'Inisiasi Proyek Baru'}
          </h3>
          <button onClick={() => setProjectFormOpen(false)} className="text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleProjectSubmit} className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Penamaan Proyek</label>
            <input type="text" value={projectTitle} onChange={e => setProjectTitle(e.target.value)} required className="bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 px-0 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-slate-200 transition-colors" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Klasifikasi</label>
              <CustomSelect 
                value={projectCategoryId} 
                onChange={e => setProjectCategoryId(e.target.value)} 
                options={categoryOptions}
                placeholder="Pilih klasifikasi..."
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Status Visibilitas</label>
              <CustomSelect 
                value={projectStatus} 
                onChange={e => setProjectStatus(e.target.value)} 
                options={statusOptions}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Koordinat Fisik (Lokasi)</label>
            <input type="text" value={projectAddress} onChange={e => setProjectAddress(e.target.value)} className="bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 px-0 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-white transition-colors" />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Dokumentasi Naratif</label>
            <textarea rows="4" value={projectDescription} onChange={e => setProjectDescription(e.target.value)} className="bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 px-0 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-white transition-colors resize-none" />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Visual Utama (Thumbnail)</label>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 flex-shrink-0 flex items-center justify-center overflow-hidden">
                {thumbnailPreview ? (
                  <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover filter grayscale" />
                ) : (
                  <span className="text-[10px] text-slate-400 uppercase">Kosong</span>
                )}
              </div>
              <div className="flex-1 space-y-4 w-full">
                <input type="text" placeholder="URL sumber eksternal..." value={projectThumbnailUrl} onChange={e => { setProjectThumbnailUrl(e.target.value); setThumbnailPreview(e.target.value); setProjectThumbnail(null); }} className="bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 px-0 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-white transition-colors" />
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">ATAU</span>
                  <input type="file" accept="image/*" id="thumbnail-file" onChange={e => { handleThumbnailChange(e); setProjectThumbnailUrl(''); }} className="hidden" />
                  <label htmlFor="thumbnail-file" className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100 border-b border-slate-800 dark:border-slate-200 pb-0.5 cursor-pointer hover:opacity-70 transition-opacity">
                    Unggah Direktori
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex justify-end gap-6 mt-8">
            <button type="button" onClick={() => setProjectFormOpen(false)} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-400 pb-1 hover:text-slate-800 dark:hover:text-white hover:border-slate-800 dark:hover:border-white transition-colors">
              Batalkan
            </button>
            <button type="submit" disabled={formLoading} className="text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100 border-b-2 border-slate-800 dark:border-slate-200 pb-1 hover:opacity-70 transition-opacity flex items-center gap-2">
              {formLoading && <Loader2 className="w-3 h-3 animate-spin" />}
              {editingProject ? 'Terapkan Perubahan' : 'Catat Proyek'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
