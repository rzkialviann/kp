import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, UploadCloud, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

export default function ImagePickerDialog({
  isOpen, 
  onClose, 
  onUrlSubmit, 
  onFileUpload, 
  title = "Tambah Gambar",
  multiple = false,
  maxSizeMB = 5
}) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'url'
  const [urlInput, setUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleUrlSubmitLocal = (e) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onUrlSubmit(urlInput);
      setUrlInput('');
      onClose();
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileUpload({ target: { files: e.dataTransfer.files } });
      onClose();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e);
      onClose();
    }
  };

  const dialogContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/90 dark:bg-[#18181b]/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-white dark:bg-[#18181b] border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
        
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-xl font-medium tracking-tight text-slate-800 dark:text-slate-300 flex items-center gap-2">
            <ImageIcon className="w-5 h-5" /> {title}
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-slate-200 dark:border-slate-800">
          <button 
            type="button"
            onClick={() => setActiveTab('upload')} 
            className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${activeTab === 'upload' ? 'bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-300 border-b-2 border-slate-800 dark:border-slate-200' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30'}`}
          >
            <UploadCloud className="w-4 h-4" /> Unggah Direktori
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('url')} 
            className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${activeTab === 'url' ? 'bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-300 border-b-2 border-slate-800 dark:border-slate-200' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30'}`}
          >
            <LinkIcon className="w-4 h-4" /> Tautan URL
          </button>
        </div>

        <div className="p-6 lg:p-8">
          {activeTab === 'upload' ? (
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileDrop}
              onClick={() => document.getElementById('dialog-file-input').click()}
              className={`w-full border-2 border-dashed p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging ? 'border-slate-800 dark:border-slate-200 bg-slate-50 dark:bg-slate-800/50' : 'border-slate-300 dark:border-slate-700 hover:border-slate-500'}`}
            >
              <UploadCloud className={`w-8 h-8 mb-4 ${isDragging ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}`} />
              <input type="file" multiple={multiple} accept="image/*" id="dialog-file-input" onChange={handleFileChange} className="hidden" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 text-center block mb-2">
                Drag & Drop {multiple ? 'Gambar-Gambar' : 'Gambar'}
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest text-center block">
                Atau Klik untuk Menelusuri File (Maks {maxSizeMB}MB)
              </span>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Alamat URL Gambar</label>
                <input type="url" required placeholder="https://..." value={urlInput} onChange={e => setUrlInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleUrlSubmitLocal(e); }} className="bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 px-0 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-slate-400 transition-colors" />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={handleUrlSubmitLocal} disabled={!urlInput.trim()} className="text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 border-b-2 border-slate-800 dark:border-slate-200 pb-1 hover:opacity-70 disabled:opacity-30 transition-opacity">
                  Konfirmasi Tautan
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
}
