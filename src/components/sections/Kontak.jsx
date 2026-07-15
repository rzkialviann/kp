import React, { useState, useEffect } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { getSettings } from '../../api/settings';
import { SquareDecoration, DotsDecoration } from '../ui/Shapes';
import emailjs from '@emailjs/browser';

export default function Kontak({ initialCategory }) {
  const [settings, setSettings] = useState({});
  const [category, setCategory] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getSettings().then(s => setSettings(s || {})).catch(() => {});
  }, []);

  useEffect(() => {
    if (initialCategory) setCategory(initialCategory);
  }, [initialCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const selectedCategory = formData.get('category');
    const desc = formData.get('desc');
    
    const targetEmail = settings?.contact_email || 'hello@company.com';
    
    const templateParams = {
      name: name,
      email: email,
      phone: phone || '-',
      category: selectedCategory,
      desc: desc,
      to_email: targetEmail
    };

    try {
      await emailjs.send(
        'service_z156pau',
        'template_gy1a1ar',
        templateParams,
        '_p9ygtIng8EVJSPLB'
      );
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      e.target.reset();
      setCategory('');
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontak" className="py-24 lg:py-32 bg-white dark:bg-zinc-900 border-t border-slate-200 dark:border-slate-800 relative overflow-hidden">
      <SquareDecoration className="w-[500px] h-[500px] -top-20 -left-40 rotate-12" />
      <DotsDecoration className="bottom-20 right-20" rows={5} cols={5} />

      <div className="w-full px-6 lg:px-12 xl:px-20 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 reveal">
          <div className="lg:col-span-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 block">Inisiasi Proyek</h2>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-slate-800 dark:text-slate-300 leading-[1.05] mb-8">
              Mari diskusikan detail visi konstruksi Anda.
            </h3>
            <p className="text-sm font-light text-slate-500 dark:text-slate-400 leading-relaxed mb-12">
              Tim perencana kami siap membantu memetakan kebutuhan arsitektur maupun struktural Anda. Kami akan merespon dalam waktu 1x24 jam kerja.
            </p>
            <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 mb-2">Alamat Kantor</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-light max-w-xs">{settings?.contact_address || 'Griya Permata Gedangan Blok I3 No.9, Sidoarjo, Jawa Timur.'}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <CheckCircle className="w-12 h-12 text-slate-800 dark:text-slate-300 mb-6" strokeWidth={1} />
                <h4 className="text-2xl font-medium tracking-tight text-slate-800 dark:text-slate-300 mb-2">Pesan Diterima</h4>
                <p className="text-slate-500 dark:text-slate-400 font-light text-sm">Tim kami akan segera meninjau dan menghubungi Anda kembali.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Nama Lengkap</label>
                    <input type="text" name="name" required placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Alamat Email</label>
                    <input type="email" name="email" required placeholder="john@company.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Nomor Telepon</label>
                    <input type="tel" name="phone" placeholder="0812xxxx" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Kategori Proyek</label>
                    <select name="category" value={category} onChange={e => setCategory(e.target.value)} required>
                      <option value="">Pilih kategori...</option>
                      <option value="gedung">Konstruksi Gedung</option>
                      <option value="jalan">Pekerjaan Jalan</option>
                      <option value="jembatan">Pembangunan Jembatan</option>
                      <option value="infrastruktur">Drainase & Irigasi</option>
                      <option value="renovasi">Renovasi Bangunan</option>
                      <option value="desain">Perencanaan & Pengawasan</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Deskripsi Kebutuhan</label>
                  <textarea name="desc" rows="3" required placeholder="Jelaskan secara singkat rencana proyek Anda..."></textarea>
                </div>

                <div className="pt-4">
                  <button type="submit" disabled={isSubmitting} className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 border-b-2 border-slate-800 dark:border-slate-200 pb-1 hover:opacity-70 disabled:opacity-50 transition-opacity flex items-center gap-2">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Kirim Pesan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
