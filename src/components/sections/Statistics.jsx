import React, { useEffect, useRef, useState } from 'react';
import { getSettings } from '../../api/settings';

const Counter = ({ target, suffix = '+' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (target === undefined || target === null) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = null;
          const duration = 2000;
          const step = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        } else {
          setCount(0);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function Statistics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const s = await getSettings();
        if (s) setStats([
          { target: parseInt(s.stats_projects) || 214, suffix: '+', label: 'Proyek Terselesaikan' },
          { target: parseInt(s.stats_years) || 9, suffix: '+', label: 'Tahun Pengalaman' },
          { target: parseInt(s.stats_clients) || 74, suffix: '+', label: 'Klien Korporat & Publik' },
          { target: parseInt(s.stats_quality) || 99, suffix: '%', label: 'Indeks Kepuasan Kualitas' },
        ]);
      } catch {}
    };
    fetch();
  }, []);

  return (
    <section className="bg-slate-800 dark:bg-[#18181b] text-white py-24 border-y border-slate-800">
      <div className="w-full px-6 lg:px-12 xl:px-20">
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 reveal">
            {stats.map((item, i) => (
              <div key={item.label} className={`pt-8 sm:pt-0 ${i !== 0 ? 'sm:pl-8 lg:pl-12' : ''}`}>
                <div className="font-light text-6xl tracking-tighter text-white mb-4">
                  <Counter target={item.target} suffix={item.suffix} />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
