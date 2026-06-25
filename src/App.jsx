import React, { useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Tentang from './components/Tentang';
import Layanan from './components/Layanan';
import Statistics from './components/Statistics';
import Portofolio from './components/Portofolio';
import Sertifikasi from './components/Sertifikasi';
import Kontak from './components/Kontak';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Force page to start from the top on load/refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);

    // Intersection Observer for scroll-reveal animations
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });
    
    setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      revealElements.forEach(el => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 min-h-screen">

      <Navbar />
      <Hero />
      <Tentang />
      <Layanan />
      <Statistics />
      <Portofolio />
      <Sertifikasi />
      <Kontak />
      <Footer />
    </div>
  );
}

export default App;
