import React from 'react';
import { Loader2, Plus, Pencil, Trash2, Image as ImageIcon, FolderTree } from 'lucide-react';

export default function ProjectsTab({
  error, loading, projects, openCreateProject, openEditProject, handleProjectDelete, openGalleryManager,
  categoryName, setCategoryName, editingCategory, setEditingCategory, handleCategorySubmit, handleCategoryDelete, categories,
}) {
  return (
    <div className="space-y-24 animate-fade-in">
      
      {/* PROYEK SECTION */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b-2 border-slate-800 dark:border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 p-2">
              <FolderTree className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-300 uppercase">Arsip Proyek</h2>
              <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-widest">Direktori portofolio utama</p>
            </div>
          </div>
          <button
            onClick={openCreateProject}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 border-2 border-slate-800 dark:border-slate-200 px-4 py-2 hover:bg-slate-800 hover:text-white dark:hover:bg-slate-300 dark:hover:text-slate-800 transition-colors"
          >
            <Plus className="w-4 h-4" /> Entri Baru
          </button>
        </div>

        {error && <div className="text-xs font-bold uppercase tracking-widest bg-red-100 text-red-600 p-4 mb-8">{error}</div>}

        {loading ? (
          <div className="py-20 flex justify-center"><Loader2 className="w-5 h-5 text-slate-400 animate-spin" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <th className="py-4 px-4 font-bold border-b-2 border-slate-300 dark:border-slate-700">Identitas Proyek</th>
                  <th className="py-4 px-4 font-bold border-b-2 border-slate-300 dark:border-slate-700 hidden md:table-cell">Kategori</th>
                  <th className="py-4 px-4 font-bold border-b-2 border-slate-300 dark:border-slate-700 hidden lg:table-cell">Status</th>
                  <th className="py-4 px-4 font-bold border-b-2 border-slate-300 dark:border-slate-700 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-12 text-center text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 dark:border-slate-800">
                      Belum Ada Data Proyek
                    </td>
                  </tr>
                ) : (
                  projects.map(proj => (
                    <tr key={proj.id} className="border-b border-slate-200 dark:border-slate-800 hover:bg-zinc-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-800 dark:text-slate-300">{proj.title}</div>
                        <div className="text-xs text-slate-500 font-medium mt-1 md:hidden">{proj.category_name}</div>
                      </td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-400 font-medium hidden md:table-cell">{proj.category_name || '-'}</td>
                      <td className="py-4 px-4 hidden lg:table-cell">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${proj.status === 'active' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-500'}`}>
                          {proj.status === 'active' ? 'Publik' : 'Draf'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="inline-flex gap-4 text-[10px] font-bold uppercase tracking-widest items-center">
                          <button onClick={() => openGalleryManager(proj)} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors" title="Kelola Galeri">
                            <ImageIcon className="w-4 h-4" /> <span className="hidden xl:inline">Galeri</span>
                          </button>
                          <button onClick={() => openEditProject(proj)} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors" title="Ubah Proyek">
                            <Pencil className="w-4 h-4" /> <span className="hidden xl:inline">Ubah</span>
                          </button>
                          <button onClick={() => handleProjectDelete(proj.id)} className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors" title="Hapus Proyek">
                            <Trash2 className="w-4 h-4" /> <span className="hidden xl:inline">Hapus</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* KATEGORI SECTION */}
      <div>
        <div className="mb-8 border-b-2 border-slate-800 dark:border-slate-200 pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-300 uppercase">Klasifikasi Kategori</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4">
            <form onSubmit={handleCategorySubmit} className="space-y-6 bg-zinc-50 dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-800">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 mb-2">Nama Kategori</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Contoh: Gedung"
                  required
                  className="bg-white dark:bg-[#18181b] border border-slate-300 dark:border-slate-700 px-3 py-2 w-full text-sm outline-none focus:border-slate-800 dark:focus:border-slate-400 transition-colors"
                />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white bg-slate-800 dark:text-slate-800 dark:bg-slate-200 px-4 py-2 hover:opacity-80 transition-opacity">
                  {editingCategory ? <><Pencil className="w-3 h-3"/> Simpan</> : <><Plus className="w-3 h-3"/> Tambah</>}
                </button>
                {editingCategory && (
                  <button type="button" onClick={() => { setEditingCategory(null); setCategoryName(''); }} className="text-xs font-bold uppercase tracking-widest text-slate-500 border border-slate-300 px-4 py-2 hover:text-slate-800 hover:border-slate-800 dark:hover:text-slate-200 dark:border-slate-700 transition-colors">
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-8 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <th className="py-4 px-4 font-bold border-b-2 border-slate-300 dark:border-slate-700">Kategori</th>
                  <th className="py-4 px-4 font-bold border-b-2 border-slate-300 dark:border-slate-700">Slug</th>
                  <th className="py-4 px-4 font-bold border-b-2 border-slate-300 dark:border-slate-700 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="py-8 text-center text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 dark:border-slate-800">
                      Belum Ada Kategori
                    </td>
                  </tr>
                ) : (
                  categories.map(cat => (
                    <tr key={cat.id} className="border-b border-slate-200 dark:border-slate-800 hover:bg-zinc-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-4 font-bold text-slate-800 dark:text-slate-300">{cat.name}</td>
                      <td className="py-4 px-4 text-slate-500 font-medium">{cat.slug}</td>
                      <td className="py-4 px-4 text-right">
                        <div className="inline-flex gap-4 text-[10px] font-bold uppercase tracking-widest items-center">
                          <button onClick={() => { setEditingCategory(cat); setCategoryName(cat.name); }} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors" title="Ubah">
                            <Pencil className="w-4 h-4" /> <span className="hidden sm:inline">Ubah</span>
                          </button>
                          <button onClick={() => handleCategoryDelete(cat.id)} className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors" title="Hapus">
                            <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">Hapus</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
