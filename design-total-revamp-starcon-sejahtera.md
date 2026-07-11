# Design System & Blueprint — Total Revamp
## Website CV. Starcon Sejahtera

> Dokumen ini disusun berdasarkan struktur & konten yang sudah ada di `xlnt.freedev.app` (React + Tailwind: Navbar, Hero, Tentang, Layanan, Statistics, Portofolio, Sertifikasi, Kontak, Footer + Admin Dashboard). Tujuannya: menaikkan kelas visual dari "template korporat generik" menjadi **identitas brand konstruksi yang kokoh, presisi, dan meyakinkan** — bukan sekadar poles warna, tapi rombak sistem desainnya dari fondasi.

---

## 1. Tujuan Revamp

| Masalah Saat Ini | Target Setelah Revamp |
|---|---|
| Semua section terlihat seperti template SaaS generik (card putih + border tipis di mana-mana) | Punya *signature look* yang langsung dikenali sebagai brand konstruksi |
| Tidak ada hierarki visual — semua tombol & section punya "berat" yang sama | Ada jelas mana CTA utama, mana section paling penting (hero, portofolio, kontak) |
| Kepercayaan (trust) hanya disampaikan lewat teks, minim bukti visual konkret | Trust ditunjukkan lewat foto real, angka konkret, sertifikasi yang menonjol, testimoni |
| Layout tiap section terasa "kotak-kotak" berulang (heading tengah → grid 3 kolom, terus-menerus) | Variasi ritme layout: ada yang asimetris, ada full-bleed, ada split-screen |
| Belum ada elemen yang terasa "industrial/konstruksi" — semua terasa netral seperti web fintech/SaaS | Aksen visual khas konstruksi: garis ukur (blueprint), safety stripe, tekstur beton/blueprint grid, foto lapangan yang jujur |

---

## 2. Prinsip Desain

1. **Bukti, bukan klaim.** Setiap pernyataan ("berpengalaman", "profesional", "terpercaya") harus didampingi bukti visual: foto proyek nyata, angka, badge legal, atau testimoni — bukan cuma teks generik.
2. **Kontras yang disengaja.** Satu warna aksen dipakai konsisten dan hemat untuk memandu mata ke aksi yang diinginkan (CTA), bukan tersebar di semua elemen.
3. **Kejujuran material.** Konstruksi adalah industri fisik — desain harus terasa "solid" (garis tegas, sudut presisi, tipografi tebal), bukan lembut/playful.
4. **Ritme, bukan pengulangan.** Hindari pola "judul di tengah → grid 3 kolom" di setiap section berturut-turut; variasikan agar halaman terasa hidup saat di-scroll.
5. **Kecepatan & kejelasan.** Calon klien B2B/tender datang untuk mencari jawaban cepat: apa yang dikerjakan, seberapa berpengalaman, legal atau tidak, bagaimana cara menghubungi. Jangan sembunyikan ini di balik dekorasi.

---

## 3. Visual Identity System

### 3.1 Palet Warna

Base warna lama (navy/slate) dipertahankan sebagai identitas yang sudah dikenal, tapi diperdalam & diberi 1 aksen tegas.

| Token | Peran | Hex |
|---|---|---|
| `navy-950` | Background gelap utama (hero, footer, stats) | `#0B1220` |
| `navy-900` | Section gelap sekunder | `#111C34` |
| `blue-800` (existing) | Warna brand primer — ikon, link, badge info | `#1E3A8A` |
| `blue-600` | Aksen interaktif ringan (hover link) | `#2563EB` |
| `amber-500` | **Aksen tunggal untuk CTA & highlight** ("safety accent") | `#F59E0B` |
| `amber-400` | Hover/aksen di atas background gelap | `#FBBF24` |
| `slate-50–200` | Background terang, border | `#F8FAFC`–`#E2E8F0` |
| `slate-500–950` | Body text, heading gelap | — |
| `emerald-600` | Khusus tombol WhatsApp saja (brand recognition) | `#059669` |

**Aturan pemakaian amber:** hanya untuk 1 CTA utama per layar (tombol utama Hero, tombol submit form, 1 badge unggulan). Jangan dipakai untuk dekorasi berulang — begitu dipakai di mana-mana, efek "menonjol"-nya hilang.

### 3.2 Tipografi

| Peran | Font | Alasan |
|---|---|---|
| Heading (H1–H4) | **Outfit** (600–800) | Geometris, tegas, terasa "engineering" — bukan font playful |
| Body | **Inter** (400–500) | Netral, sangat mudah dibaca di ukuran kecil (form, deskripsi) |
| Angka besar (statistik, nomor urut) | Outfit ExtraBold, tabular numbers | Konsistensi lebar digit untuk counter animasi |

Skala tipe (desktop → mobile):
- H1 Hero: 56px → 34px, leading 1.05, tracking -0.02em
- H2 Section: 36px → 26px
- H3 Card title: 20px
- Body: 16px, Small: 14px, Eyebrow label: 12px uppercase tracking wide

### 3.3 Ikonografi & Motif Grafis

- Ikon garis (`lucide-react`, sudah dipakai) — pertahankan, konsisten `strokeWidth={2}`.
- **Motif blueprint grid**: garis tipis 1px membentuk grid seperti kertas gambar teknik, dipakai sebagai tekstur background di section gelap (statistics, CTA banner) — memberi nuansa "engineering" tanpa ramai.
- **Safety stripe** (diagonal amber-hitam, sudah diterapkan di revamp sebelumnya): dipakai *hanya* sebagai garis pembatas tipis (3–4px) antar section besar, bukan dekorasi permukaan luas.
- **Crop foto tegas**: semua foto proyek di-crop dengan rasio konsisten (4:3 untuk kartu portofolio, 16:9 untuk hero/banner), hindari foto lonjong/random ratio yang membuat grid berantakan.

### 3.4 Elevation & Surface

| Level | Kegunaan | Style |
|---|---|---|
| Flat | Section background | Tanpa border/shadow |
| Level 1 | Card statis (sertifikasi, layanan) | `border` tipis slate-200, no shadow saat idle |
| Level 2 | Card interaktif (portofolio, hover state) | shadow lembut naik saat hover (`translateY(-4px)`) + shadow 20–40px blur |
| Level 3 | Elemen mengambang (badge, floating card di foto) | shadow lebih tegas + backdrop-blur (glassmorphism tipis, dipakai sangat terbatas) |

### 3.5 Spacing & Grid

- Container max-width 1280px, padding horizontal 24px (mobile) / 32px (desktop)
- Section padding vertikal: 96–128px desktop, 56–72px mobile — **lebih lega dari sebelumnya** supaya tiap section punya "napas" dan terasa premium, bukan padat.
- Radius: 12px untuk card, 8px untuk tombol/input — sudut tidak terlalu bulat (kesan solid, bukan playful).

### 3.6 Motion

- Reveal-on-scroll dipertahankan (`IntersectionObserver`, sudah ada di kode), tapi kurangi jarak translate dari 24px → 16px & durasi 0.5s agar terasa halus bukan lambat.
- Hover card: `translateY(-4px)` + shadow, transisi 300ms cubic-bezier.
- Counter angka statistik: easing ease-out, sudah bagus — pertahankan.
- Hindari animasi berlebihan (parallax berat, particle effect) — target audiens B2B/tender menghargai kecepatan loading di atas efek visual.

---

## 4. Component Library

### 4.1 Button
| Varian | Pemakaian | Style |
|---|---|---|
| Primary (amber) | 1 per layar — aksi utama | `bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold shadow-lg shadow-amber-500/20` |
| Secondary (outline) | Aksi sekunder di sebelah primary | `border border-white/25 bg-white/5 backdrop-blur` (di atas foto) atau `border-slate-300` (di atas putih) |
| Ghost/Text | Navigasi, "Lihat Detail →" | Text only + underline/arrow on hover |
| WhatsApp | Khusus kontak cepat | `bg-emerald-600`, ikon WA, dipakai di footer & floating action button (baru) |

### 4.2 Card
- **Info card** (layanan, sertifikasi, nilai perusahaan): icon box 40–48px radius 8px, judul Outfit semibold, deskripsi 2–3 baris max.
- **Portfolio card**: foto 4:3 dengan badge kategori amber di pojok, judul + lokasi + tahun, hover → foto zoom halus + shadow naik.
- **Testimonial card** (baru, lihat §5.9): foto/avatar klien, kutipan, nama & posisi, rating.

### 4.3 Badge
- Badge kredibilitas (SBU/NIB/NPWP/K3): kotak icon + kode besar + label kecil — pertahankan pola yang sudah ada, tambahkan status visual (✓ hijau kecil) untuk penegasan "aktif/berlaku".

### 4.4 Form
- Input dengan label di atas (bukan placeholder-only) — sudah diterapkan, pertahankan.
- Tambahkan **stepper visual 1-2-3** di atas form (Isi Data → Tim Menghubungi → Survey Lokasi) agar form tidak terasa seperti "kotak kosong tanpa ekspektasi jelas".

---

## 5. Struktur Halaman — Redesign per Section

### 5.1 Navbar
- Tetap sticky glass-nav, tapi tambahkan **subtle bottom accent line** (1px amber gradient) yang muncul hanya saat discroll — memberi penanda "kelas premium" tanpa mengganggu.
- CTA "Hubungi Kami" tetap amber (primary), konsisten dengan seluruh halaman.

### 5.2 Hero — *Full redesign*
**Masalah saat ini:** hero standar (teks kiri + background foto), sudah diperbaiki sebagian, tapi masih generik dibanding kompetitor top-tier.

**Redesign:**
- Layout **split asymmetric**: teks di kiri (60%), panel statistik ringkas melayang di kanan-bawah (bukan section terpisah di bawah — pindahkan preview 2 angka utama, mis. "214+ Proyek" & "9+ Tahun", langsung ke hero sebagai social proof instan).
- Background: foto proyek asli (bukan cuma satu foto statis) — idealnya carousel/crossfade 3 foto proyek berbeda tiap beberapa detik (subtle, tidak mengganggu keterbacaan teks).
- Tambahkan **breadcrumb kredibilitas** di atas H1 (badge asosiasi/sertifikasi kecil, bukan cuma teks) — mis. logo LPJK/GAPENSI kalau tersedia.
- CTA ganda dipertahankan (Konsultasi Gratis / Lihat Portofolio), tombol primary amber.

### 5.3 Trust Bar (BARU — belum ada di versi sekarang)
Section tipis (80–100px) tepat di bawah Hero, sebelum "Tentang":
- Baris logo grayscale: klien/instansi yang pernah bekerja sama, atau badge asosiasi (GAPENSI/ASPEKNAS), sertifikasi ISO.
- Kalau belum ada logo klien yang boleh dipublikasikan, ganti dengan 3–4 **badge teks kredibilitas** bergaya minimal (mis. "SBU Aktif · NIB Terverifikasi · Anggota GAPENSI · Zero Accident 2024") — tetap memberi efek "diverifikasi" tanpa perlu logo.
- Ini section paling murah untuk dibuat tapi dampaknya besar terhadap *first impression* kredibilitas.

### 5.4 Tentang Kami
- Pertahankan layout 2 kolom (teks + foto), tapi:
  - Ganti foto stok Unsplash generik dengan **foto tim/kantor/lapangan asli**. Ini prioritas tertinggi — foto generik adalah red flag kredibilitas bagi calon klien B2B.
  - Pecah paragraf panjang jadi poin-poin scan-able (angka tahun berdiri, jumlah tenaga ahli, cakupan wilayah) di samping narasi.
  - Floating badge "9+ Tahun Pengalaman" & "K3 Tersertifikasi" dipertahankan dari revamp sebelumnya.

### 5.5 Layanan
- Pertahankan grid, tapi ubah interaksi: card yang di-hover **expand sedikit** menampilkan 1 baris highlight tambahan (mis. contoh proyek terkait) — menghubungkan section Layanan langsung ke bukti di Portofolio (klik → filter portofolio sesuai kategori).
- Nomor urut dekoratif (01–06) dipertahankan sebagai identitas visual.

### 5.6 Proses Kerja (BARU — belum ada)
Section timeline horizontal (4–5 langkah): `Konsultasi → Survey & RAB → Kontrak → Pelaksanaan → Serah Terima`.
- Ini section yang sangat mengurangi keraguan calon klien awam ("bagaimana prosesnya nanti?") — cukup sederhana untuk dibuat, dampak kepercayaan tinggi.
- Style: garis horizontal dengan titik-titik bernomor, tiap titik expand jadi card kecil saat di-scroll ke viewport.

### 5.7 Statistics
- Sudah diperkuat di revamp sebelumnya (tekstur grid, separator, aksen amber). Pertahankan, tambahkan 1 ikon kecil di atas tiap angka untuk asosiasi visual cepat (🏗 Proyek, 📅 Tahun, 🤝 Klien, ✅ Kualitas).

### 5.8 Portofolio
- Pertahankan filter kategori & card, tapi:
  - Tambahkan **featured project** — 1 proyek unggulan ditampilkan besar (span 2 kolom) di posisi pertama grid, memberi variasi ritme layout dan menonjolkan proyek terbaik.
  - Detail proyek (saat diklik) idealnya menampilkan galeri foto progres (before → during → after), bukan cuma 1 foto — ini yang paling meyakinkan calon klien tender/pemerintah.

### 5.9 Testimoni Klien (BARU — belum ada, prioritas tinggi)
Section carousel sederhana:
- Kutipan klien + nama + posisi/instansi + (kalau ada) logo perusahaan klien.
- Kalau belum ada testimoni tertulis, mulai kumpulkan dari klien lama — bahkan 2–3 testimoni singkat sudah jauh meningkatkan kepercayaan dibanding tidak ada sama sekali.
- Alternatif sementara jika belum ada testimoni: tampilkan **rating agregat** dari Google Business Profile (kalau ada) dengan badge bintang.

### 5.10 Sertifikasi & Legalitas
- Pertahankan grid 4 badge (SBU/NIB/NPWP/SMK3), tambahkan tombol/link kecil "Lihat Sertifikat" (kalau ada scan dokumen yang boleh dipublikasikan) — ini penting khusus untuk calon klien tender pemerintah yang akan memverifikasi legalitas.

### 5.11 CTA Banner (BARU, sebelum footer)
Full-width banner dengan foto proyek + overlay gelap:
- Headline ajakan langsung: "Punya Rencana Proyek? Diskusikan dengan Tim Kami"
- Dua tombol: WhatsApp langsung (respons cepat) + Form konsultasi (untuk yang lebih formal/tender)
- Section ini memberi *exit point* konversi terakhir sebelum footer, terpisah dari section Kontak yang lebih detail.

### 5.12 Kontak
- Pertahankan peta + form. Tambahkan **jam operasional** & **waktu respons rata-rata** ("Kami membalas dalam 1x24 jam") di dekat form — mengurangi kecemasan "apakah akan dibalas".
- Tambahkan stepper 1-2-3 seperti disebut di §4.4.

### 5.13 Footer
- Pertahankan struktur 4 kolom. Pastikan link sosial media hanya ditampilkan jika akunnya nyata (jangan link ke homepage generik platform).

---

## 6. Content & Copywriting Checklist

- [ ] Ganti semua foto stok generik dengan foto asli (tim, kantor, lapangan, proyek)
- [ ] Kumpulkan 2–3 testimoni klien (tulisan singkat + nama + posisi, idealnya dengan izin publikasi)
- [ ] Siapkan logo klien/instansi yang boleh ditampilkan di Trust Bar
- [ ] Tulis 4–5 langkah "Proses Kerja" sesuai alur nyata perusahaan
- [ ] Verifikasi ulang semua nomor legalitas (SBU, NIB, NPWP, SMK3) masih berlaku
- [ ] Tentukan 1 "proyek unggulan" untuk ditampilkan sebagai featured project

---

## 7. Responsif & Aksesibilitas

- Breakpoints: Mobile <768px · Tablet 768–1024px · Desktop >1024px
- Kontras teks minimum WCAG AA (terutama teks putih di atas foto hero — pastikan gradient overlay cukup gelap di area teks)
- Semua tombol punya target sentuh minimal 44×44px di mobile
- Trust bar & proses kerja di-stack vertikal di mobile, jangan dipaksa horizontal-scroll

---

## 8. Rekomendasi Teknis

- Stack tetap React + Tailwind (sudah sesuai, tidak perlu migrasi framework)
- Compress semua foto ke WebP, lazy-load galeri portofolio & testimoni
- Carousel hero (kalau multi-foto) pakai crossfade CSS murni, hindari library berat
- Section baru (Trust Bar, Proses Kerja, Testimoni, CTA Banner) bisa dibangun sebagai komponen terpisah baru di `src/components/sections/`, mengikuti pola komponen yang sudah ada — tidak mengubah arsitektur project

---

## 9. Prioritas Implementasi (Roadmap)

| Fase | Item | Dampak | Effort |
|---|---|---|---|
| **1 — Cepat & Dampak Tinggi** | Ganti foto stok → foto asli; Trust Bar; badge "Lihat Sertifikat" | Tinggi | Rendah |
| **2 — Section Baru** | Testimoni Klien; Proses Kerja; CTA Banner | Tinggi | Sedang |
| **3 — Penyempurnaan** | Featured project di Portofolio; galeri before/after; hero carousel foto | Sedang | Sedang |
| **4 — Polish Akhir** | Micro-interaction, dark mode konsistensi, audit aksesibilitas | Rendah–Sedang | Rendah |

---

## 10. Data & Aset yang Perlu Dilengkapi

- [ ] Minimal 6–10 foto asli berkualitas baik (tim, kantor, lapangan, proyek before/after)
- [ ] 2–3 testimoni klien tertulis + izin publikasi nama
- [ ] Logo klien/instansi/asosiasi yang boleh ditampilkan
- [ ] Deskripsi 4–5 langkah proses kerja aktual perusahaan
- [ ] Nomor & masa berlaku SBU/NIB/NPWP/SMK3 terbaru
- [ ] 1 proyek yang ditetapkan sebagai "proyek unggulan" beserta galeri fotonya

---

*Dokumen ini adalah blueprint desain — siap dijadikan acuan implementasi bertahap sesuai roadmap di atas. Kalau kamu sudah siapkan aset (foto, testimoni, logo klien), saya bisa langsung bangun section-section baru ini ke source code React yang sudah ada.*
