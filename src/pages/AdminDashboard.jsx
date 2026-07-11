import React, { useState, useEffect } from 'react';
import AdminLogin from '../components/admin/AdminLogin';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import ProjectsTab from '../components/admin/ProjectsTab';
import SettingsTab from '../components/admin/SettingsTab';
import ProjectFormModal from '../components/admin/ProjectFormModal';
import GalleryView from '../components/admin/GalleryView';
import ConfirmModal from '../components/admin/ConfirmModal';
import Toast from '../components/ui/Toast';
import { getSettings, updateSettings } from '../api/settings';
import { getProjects, createProject, updateProject, deleteProject, getProjectGallery, uploadGallery, updateGalleryItem, deleteGalleryItem, reorderGallery } from '../api/projects';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api/categories';

export default function AdminDashboard({ onExit }) {
  const [toast, setToast] = useState({ message: '', type: 'info' });
  const showToast = (message, type = 'info') => setToast({ message, type });

  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('projects');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategoryId, setProjectCategoryId] = useState('');
  const [projectStatus, setProjectStatus] = useState('active');
  const [projectAddress, setProjectAddress] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectThumbnailUrl, setProjectThumbnailUrl] = useState('');
  const [projectThumbnail, setProjectThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  const [categoryName, setCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  const [settingsData, setSettingsData] = useState({});
  const [settingsLoading, setSettingsLoading] = useState(false);

  const [deleteModal, setDeleteModal] = useState({ open: false, type: null, id: null });

  const [activeGalleryProject, setActiveGalleryProject] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [newGalleryImageUrl, setNewGalleryImageUrl] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('starcon_admin_user');
    if (saved) {
      try {
        setSession(JSON.parse(saved));
      } catch {
        // do nothing
      }
    }
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('color-theme', next ? 'dark' : 'light');
    setIsDarkMode(next);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    // Dummy login
    if (email === 'admin@starcon.id' && password === 'admin123') {
      const user = { email, role: 'admin' };
      setSession(user);
      localStorage.setItem('starcon_admin_user', JSON.stringify(user));
    } else {
      setAuthError('Email atau password salah. Coba admin@starcon.id / admin123');
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    setSession(null);
    localStorage.removeItem('starcon_admin_user');
    onExit();
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [p, c, s] = await Promise.all([getProjects(), getCategories(), getSettings()]);
      setProjects(p);
      setCategories(c);
      setSettingsData(s || {
        stats_mode: 'manual', stats_projects: '0', stats_years: '0', stats_clients: '0', stats_quality: '100',
        contact_wa: '', contact_phone: '', contact_email: '', contact_ig: '', contact_address: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) fetchData();
  }, [session]);

  const loadGallery = async (projectId) => {
    setGalleryLoading(true);
    try {
      setGalleryItems(await getProjectGallery(projectId) || []);
    } catch (err) {
      showToast('Gagal memuat galeri: ' + err.message, 'error');
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
      setProjectThumbnailUrl('');
    }
  };

  const resetForm = () => {
    setEditingProject(null);
    setProjectTitle('');
    setProjectCategoryId('');
    setProjectStatus('active');
    setProjectAddress('');
    setProjectDescription('');
    setProjectThumbnail(null);
    setProjectThumbnailUrl('');
    setThumbnailPreview('');
  };

  const openCreateProject = () => {
    resetForm();
    if (categories.length > 0) setProjectCategoryId(categories[0].id);
    setProjectFormOpen(true);
  };

  const openEditProject = (p) => {
    resetForm();
    setEditingProject(p);
    setProjectTitle(p.title);
    setProjectCategoryId(p.category_id);
    setProjectStatus(p.status);
    setProjectAddress(p.address || '');
    setProjectDescription(p.description || '');
    setProjectThumbnailUrl(p.thumbnail || '');
    setThumbnailPreview(p.thumbnail || '');
    setProjectFormOpen(true);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', projectTitle);
      formData.append('category_id', projectCategoryId);
      formData.append('status', projectStatus);
      formData.append('address', projectAddress);
      formData.append('description', projectDescription);

      if (projectThumbnailUrl) {
        formData.append('thumbnail_url', projectThumbnailUrl);
      } else if (projectThumbnail) {
        formData.append('thumbnail', projectThumbnail);
      }

      if (editingProject) {
        await updateProject(editingProject.id, formData);
        showToast('Proyek berhasil diperbarui!', 'success');
      } else {
        await createProject(formData);
        showToast('Proyek baru berhasil ditambahkan!', 'success');
      }
      setProjectFormOpen(false);
      fetchData();
    } catch (err) {
      showToast('Gagal menyimpan proyek: ' + err.message, 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const confirmDelete = (type, id) => {
    setDeleteModal({ open: true, type, id });
  };

  const executeDelete = async () => {
    const { type, id } = deleteModal;
    setDeleteModal({ open: false, type: null, id: null });
    try {
      if (type === 'project') {
        await deleteProject(id);
        showToast('Proyek berhasil dihapus.', 'success');
      } else if (type === 'category') {
        await deleteCategory(id);
        showToast('Kategori berhasil dihapus.', 'success');
      } else if (type === 'gallery_item') {
        await deleteGalleryItem(id);
        setGalleryItems(prev => prev.filter(i => i.id !== id));
        showToast('Gambar galeri dihapus.', 'success');
      }
      if (type !== 'gallery_item') fetchData();
    } catch (err) {
      showToast(`Gagal menghapus: ${err.message}`, 'error');
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, { name: categoryName });
        showToast('Kategori berhasil diperbarui.', 'success');
      } else {
        await createCategory({ name: categoryName });
        showToast('Kategori baru berhasil ditambahkan.', 'success');
      }
      setCategoryName('');
      setEditingCategory(null);
      fetchData();
    } catch (err) {
      showToast('Gagal menyimpan kategori: ' + err.message, 'error');
    }
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setSettingsLoading(true);
    try {
      await updateSettings(settingsData);
      showToast('Pengaturan berhasil disimpan!', 'success');
    } catch (err) {
      showToast('Gagal menyimpan pengaturan: ' + err.message, 'error');
    } finally {
      setSettingsLoading(false);
    }
  };

  const openGalleryManager = (project) => {
    setActiveGalleryProject(project);
    loadGallery(project.id);
  };

  const handleAddGalleryUrl = async () => {
    if (!newGalleryImageUrl.trim()) return;
    try {
      const formData = new FormData();
      formData.append('image_url', newGalleryImageUrl.trim());
      await uploadGallery(activeGalleryProject.id, formData);
      setNewGalleryImageUrl('');
      showToast('Gambar berhasil ditambahkan ke galeri.', 'success');
      loadGallery(activeGalleryProject.id);
    } catch (err) {
      showToast('Gagal tambah gambar: ' + err.message, 'error');
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setGalleryLoading(true);
    try {
      let successCount = 0;
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'starcon_portfolio');
        const res = await fetch(`https://api.cloudinary.com/v1_1/dx81b0a6y/image/upload`, { method: 'POST', body: formData });
        const data = await res.json();
        if (data.secure_url) {
          const galleryData = new FormData();
          galleryData.append('image_url', data.secure_url);
          await uploadGallery(activeGalleryProject.id, galleryData);
          successCount++;
        }
      }
      showToast(`${successCount} gambar berhasil diunggah.`, 'success');
      loadGallery(activeGalleryProject.id);
    } catch (err) {
      showToast('Gagal upload gambar: ' + err.message, 'error');
      setGalleryLoading(false);
    }
  };

  const handleGalleryItemUpdate = async (itemId, updates) => {
    try {
      const formData = new FormData();
      if (updates.title) formData.append('title', updates.title);
      if (updates.description) formData.append('description', updates.description);
      await updateGalleryItem(itemId, formData);
      showToast('Info gambar berhasil diperbarui.', 'success');
    } catch (err) {
      showToast('Gagal update info gambar: ' + err.message, 'error');
    }
  };

  const handleGalleryItemDelete = async (itemId) => {
    confirmDelete('gallery_item', itemId);
  };

  const dragItem = React.useRef(null);
  const handleDragStart = (idx) => { dragItem.current = idx; };
  const handleDragOver = (e) => { e.preventDefault(); };
  const handleDrop = async (e, dropIdx) => {
    e.preventDefault();
    if (dragItem.current === null || dragItem.current === dropIdx) return;
    
    const newItems = [...galleryItems];
    const item = newItems.splice(dragItem.current, 1)[0];
    newItems.splice(dropIdx, 0, item);
    
    const orderedItems = newItems.map((it, i) => ({ ...it, sort_order: i + 1 }));
    setGalleryItems(orderedItems);
    dragItem.current = null;
    
    try {
      await reorderGallery(activeGalleryProject.id, orderedItems.map(it => it.id));
      showToast('Urutan galeri berhasil disimpan.', 'success');
    } catch (err) {
      showToast('Gagal simpan urutan: ' + err.message, 'error');
    }
  };

  if (!session) {
    return (
      <AdminLogin
        email={email} setEmail={setEmail}
        password={password} setPassword={setPassword}
        authError={authError} authLoading={authLoading}
        handleLogin={handleLogin} onExit={onExit}
      />
    );
  }

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-[#18181b] text-slate-800 dark:text-slate-100 font-sans selection:bg-slate-800 selection:text-white dark:selection:bg-white dark:selection:text-slate-800 overflow-hidden">
      
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'info' })} />

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && isMobile && (
        <div className="fixed inset-0 bg-white/80 dark:bg-[#18181b]/80 backdrop-blur-sm z-20" onClick={() => setIsSidebarOpen(false)} />
      )}

      <AdminSidebar
        activeTab={activeTab} setActiveTab={setActiveTab}
        activeGalleryProject={activeGalleryProject} setActiveGalleryProject={setActiveGalleryProject}
        onExit={onExit} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col w-0 overflow-hidden">
        <AdminHeader
          toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}
          handleLogout={handleLogout} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-6 md:p-12">
          {activeGalleryProject ? (
            <GalleryView
              activeGalleryProject={activeGalleryProject} setActiveGalleryProject={setActiveGalleryProject}
              newGalleryImageUrl={newGalleryImageUrl} setNewGalleryImageUrl={setNewGalleryImageUrl}
              handleAddGalleryUrl={handleAddGalleryUrl} handleGalleryUpload={handleGalleryUpload}
              galleryLoading={galleryLoading} galleryItems={galleryItems}
              handleDragStart={handleDragStart} handleDragOver={handleDragOver} handleDrop={handleDrop}
              handleGalleryItemUpdate={handleGalleryItemUpdate} handleGalleryItemDelete={handleGalleryItemDelete}
            />
          ) : (
            <>
              {activeTab === 'projects' && (
                <ProjectsTab
                  error={error} loading={loading} projects={projects}
                  openCreateProject={openCreateProject} openEditProject={openEditProject}
                  handleProjectDelete={(id) => confirmDelete('project', id)} openGalleryManager={openGalleryManager}
                  categoryName={categoryName} setCategoryName={setCategoryName}
                  editingCategory={editingCategory} setEditingCategory={setEditingCategory}
                  handleCategorySubmit={handleCategorySubmit} handleCategoryDelete={(id) => confirmDelete('category', id)}
                  categories={categories}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsTab
                  settingsData={settingsData} setSettingsData={setSettingsData}
                  handleSettingsSubmit={handleSettingsSubmit} settingsLoading={settingsLoading}
                />
              )}
            </>
          )}
        </main>
      </div>

      <ProjectFormModal
        projectFormOpen={projectFormOpen} setProjectFormOpen={setProjectFormOpen}
        editingProject={editingProject} handleProjectSubmit={handleProjectSubmit}
        projectTitle={projectTitle} setProjectTitle={setProjectTitle}
        projectCategoryId={projectCategoryId} setProjectCategoryId={setProjectCategoryId} categories={categories}
        projectStatus={projectStatus} setProjectStatus={setProjectStatus}
        projectAddress={projectAddress} setProjectAddress={setProjectAddress}
        projectDescription={projectDescription} setProjectDescription={setProjectDescription}
        thumbnailPreview={thumbnailPreview} projectThumbnailUrl={projectThumbnailUrl}
        setProjectThumbnailUrl={setProjectThumbnailUrl} setThumbnailPreview={setThumbnailPreview}
        setProjectThumbnail={setProjectThumbnail} handleThumbnailChange={handleThumbnailChange} formLoading={formLoading}
      />

      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, type: null, id: null })}
        onConfirm={executeDelete}
        title="Konfirmasi Penghapusan"
        message={`Apakah Anda yakin ingin menghapus ${deleteModal.type === 'project' ? 'proyek' : 'kategori'} ini? Tindakan ini tidak dapat dibatalkan.`}
      />
    </div>
  );
}
