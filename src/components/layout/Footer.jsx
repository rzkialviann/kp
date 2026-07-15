import React from 'react';

export default function Footer({ settings }) {
  const waNumber = settings?.contact_wa?.replace(/[^0-9]/g, '') || '6281234567890';
  const igUser = settings?.contact_ig?.replace('@', '') || '';

  return (
    <footer className="bg-zinc-50 dark:bg-[#18181b] pt-24 pb-12 border-t border-slate-200 dark:border-slate-800">
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">

          <div className="md:col-span-4 lg:col-span-5">
            <a href="#" className="inline-block mb-6">
              <img src="/images/logo_dark.png" alt="Starcon Logo" className="h-12 sm:h-16 block dark:hidden" />
              <img src="/images/logo_light.png" alt="Starcon Logo" className="h-12 sm:h-16 hidden dark:block" />
            </a>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Mitra konstruksi profesional yang berdedikasi untuk menciptakan infrastruktur presisi dan berkualitas tinggi sejak 2013.
            </p>
          </div>

          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 mb-6">Navigasi</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#tentang" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Tentang Kami</a></li>
              <li><a href="#layanan" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Layanan</a></li>
              <li><a href="#portofolio" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Portofolio</a></li>
            </ul>
          </div>

          <div className="md:col-span-5 lg:col-span-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-300 mb-6">Kontak</h4>
            <div className="text-sm text-slate-500 dark:text-slate-400 space-y-4">
              <p className="max-w-xs">{settings?.contact_address || 'Griya Permata Gedangan Blok I3 No.9, Sidoarjo, Jawa Timur.'}</p>
              <div className="pt-2 flex flex-col space-y-2">
                <a href={`mailto:${settings?.contact_email || 'info@starconsejahtera.co.id'}`} className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors inline-block">
                  {settings?.contact_email || 'info@starconsejahtera.co.id'}
                </a>
                <a href={`tel:${settings?.contact_phone?.replace(/[^0-9]/g, '') || '0315558899'}`} className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors inline-block">
                  {settings?.contact_phone || '(031) 555-8899'}
                </a>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest hover:text-slate-800 dark:hover:text-slate-200 transition-colors">WhatsApp</a>
                {igUser && <a href={`https://instagram.com/${igUser}`} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Instagram</a>}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-medium text-slate-400 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} CV. STARCON SEJAHTERA</p>
          <p className="mt-2 sm:mt-0">INDONESIA</p>
        </div>
      </div>
    </footer>
  );
}
