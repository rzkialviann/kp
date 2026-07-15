import React, { useState } from 'react';
import { Loader2, UploadCloud } from 'lucide-react';
import ImagePickerDialog from './ImagePickerDialog';

export default function GalleryView({
  activeGalleryProject, setActiveGalleryProject, newGalleryImageUrl, setNewGalleryImageUrl,
  handleAddGalleryUrl, handleGalleryUpload, galleryLoading, galleryItems,
  handleDragStart, handleDragOver, handleDrop, handleGalleryItemUpdate, handleGalleryItemDelete,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-12 animate-fade-in">

      <div className="mb-12">
        <button onClick={() => setActiveGalleryProject(null)} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-b border-slate-400 pb-1 hover:border-slate-800 dark:hover:border-slate-400 transition-colors">
          &larr; Kembali ke Arsip
        </button>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div>
          <h2 className="text-3xl font-medium tracking-tight text-slate-800 dark:text-slate-300 mb-2">{activeGalleryProject.title}</h2>
          <p className="text-xs font-light text-slate-500">Manajemen visual (drag & drop untuk merekayasa urutan).</p>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="text-xs font-bold uppercase tracking-widest text-white bg-slate-800 dark:bg-slate-200 dark:text-slate-900 px-6 py-3 hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <UploadCloud className="w-4 h-4" /> Tambah Gambar
          </button>
        </div>
      </div>

      <ImagePickerDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onUrlSubmit={(url) => handleAddGalleryUrl(url)}
        onFileUpload={(files) => handleGalleryUpload({ target: { files } })}
        title="Tambah Gambar Galeri"
        multiple={true}
        maxSizeMB={5}
      />

      {galleryLoading ? (
        <div className="flex justify-center py-24 text-slate-400">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      ) : (
        <>
          {galleryItems.length === 0 ? (
            <div className="py-24 text-center border border-dashed border-slate-200 dark:border-slate-800">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Arsip visual kosong.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {galleryItems.map((item, idx) => (
                <div key={item.id} draggable onDragStart={() => handleDragStart(idx)} onDragOver={e => handleDragOver(e, idx)} onDrop={e => handleDrop(e, idx)} className="group cursor-move flex flex-col h-full border-b border-slate-200 dark:border-slate-800 pb-4 hover:border-slate-400 transition-colors">

                  <div className="w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden mb-4 relative">
                    <img src={item.image_url || item.image} alt={item.title || ''} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div className="absolute top-0 left-0 bg-white dark:bg-[#18181b] px-2 py-1 text-[10px] font-bold text-slate-800 dark:text-slate-300 border-b border-r border-slate-200 dark:border-slate-800">
                      {item.sort_order || idx + 1}
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 mb-4">
                    <div>
                      <input type="text" defaultValue={item.title || ''} onBlur={e => handleGalleryItemUpdate(item.id, { title: e.target.value })} placeholder="Identitas visual..." className="bg-transparent border-0 border-b border-transparent px-0 py-1 w-full text-sm font-medium text-slate-800 dark:text-slate-300 outline-none focus:border-slate-800 dark:focus:border-slate-400 transition-colors" />
                    </div>
                    <div>
                      <textarea rows="1" defaultValue={item.description || ''} onBlur={e => handleGalleryItemUpdate(item.id, { description: e.target.value })} placeholder="Konteks visual..." className="bg-transparent border-0 border-b border-transparent px-0 py-1 w-full text-xs text-slate-500 outline-none focus:border-slate-800 dark:focus:border-slate-400 transition-colors resize-none" />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800/50">
                    <button onClick={() => handleGalleryItemDelete(item.id)} className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-500 transition-colors">
                      HAPUS
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
