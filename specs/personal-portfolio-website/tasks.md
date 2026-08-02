# Implementation Plan: Personal Portfolio Website

## Overview

Implementasi website portofolio personal sebagai React SPA menggunakan Vite, Tailwind CSS, Framer Motion, React Router v6, dan Headless CMS (Contentful/Sanity). Konten dinamis (proyek, blog, timeline) di-fetch dari CMS dengan fallback graceful, animasi scroll-triggered, form kontak dengan validasi, dan SEO per halaman.

---

## Tasks

- [x] 1. Inisialisasi proyek dan setup infrastruktur
  - Buat proyek Vite + React baru, install dependensi: `tailwindcss`, `framer-motion`, `react-router-dom`, `react-helmet-async`, `react-hook-form`, `react-icons`, `@contentful/rich-text-react-renderer` (atau `@portabletext/react` untuk Sanity)
  - Konfigurasi Tailwind CSS (`tailwind.config.js`, `postcss.config.js`, import di `index.css`)
  - Buat file `.env.example` dengan semua placeholder environment variables (`VITE_CMS_TYPE`, `VITE_CONTENTFUL_SPACE_ID`, `VITE_CONTENTFUL_ACCESS_TOKEN`, `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, `VITE_SANITY_API_TOKEN`, `VITE_FORM_ENDPOINT`)
  - Buat struktur direktori awal: `src/components/layout/`, `src/components/sections/`, `src/components/ui/`, `src/pages/`, `src/hooks/`, `src/services/`, `src/data/`, `src/utils/`
  - _Requirements: 10.4_

- [x] 2. Services layer dan static fallback data
  - [x] 2.1 Implementasi `src/services/cmsClient.js`
    - Implementasi adapter dengan switch berdasarkan `VITE_CMS_TYPE` untuk Contentful dan Sanity
    - Export fungsi: `fetchProjects()`, `fetchProjectBySlug(slug)`, `fetchBlogPosts()`, `fetchBlogPostBySlug(slug)`, `fetchTimelineEntries()`
    - Wrap setiap fungsi dengan try-catch; kembalikan `[]` atau `null` jika fetch gagal (bukan throw)
    - _Requirements: 10.1, 10.2, 10.3_

  - [x] 2.2 Implementasi `src/services/formService.js`
    - Implementasi `submitContactForm({ name, email, message })` yang POST ke `VITE_FORM_ENDPOINT`
    - Throw error jika response tidak ok
    - _Requirements: 9.2_

  - [x] 2.3 Buat static fallback data
    - Buat `src/data/skills.js` dengan array `SkillItem[]` (minimal dua kategori: Frontend, Backend)
    - Buat `src/data/timeline.js` dengan array `TimelineEntry[]` (minimal dua entri, satu education dan satu experience)
    - _Requirements: 4.4, 8.5_

- [x] 3. Custom hooks
  - [x] 3.1 Implementasi `useCMSProjects(slug?)`, `useCMSBlogPosts(slug?)`, `useCMSTimeline()`
    - Setiap hook memanggil fungsi `cmsClient.js` yang sesuai, mengelola state `{ data, loading, error }`
    - `useCMSTimeline` menggunakan fallback ke `data/timeline.js` jika CMS mengembalikan `[]` atau error
    - `useCMSProjects` dan `useCMSBlogPosts` jika slug diberikan fetch satu item, jika tidak fetch semua
    - _Requirements: 10.1, 10.3_

  - [x] 3.2 Implementasi `useReducedMotion()`
    - Buat `src/hooks/useReducedMotion.js` sebagai wrapper `useReducedMotion` dari Framer Motion
    - Returns `boolean`; fallback ke `false` jika nilai undefined
    - _Requirements: 11.4_

- [x] 4. Komponen UI atoms dan utilities
  - [x] 4.1 Implementasi utility functions
    - Buat `src/utils/filterProjects.js`: fungsi `filterProjects(projects, activeTag)` — kembalikan semua proyek jika `activeTag` null/empty, jika tidak filter berdasarkan `project.tags.includes(activeTag)`
    - Buat `src/utils/formatDate.js`: fungsi `formatDate(isoString)` untuk memformat tanggal ke format lokal Indonesia (e.g., "12 Januari 2024")
    - _Requirements: 5.4_

  - [ ]* 4.2 Tulis property test untuk `filterProjects`
    - **Property 3: Filter proyek hanya mengembalikan proyek yang relevan**
    - **Validates: Requirements 5.4**
    - Gunakan library property-based testing (e.g., `fast-check`): untuk semua kumpulan proyek dan semua tag, setiap proyek yang dikembalikan memiliki tag tersebut; jika tidak ada yang cocok, hasil adalah array kosong (bukan error)

  - [x] 4.3 Implementasi komponen UI atoms: `TagBadge`, `SkillItem`, `AnimatedSection`, `SEOHead`
    - `TagBadge`: render `<span>` dengan styling Tailwind untuk tag
    - `SkillItem`: render ikon (dari `react-icons`) dan label skill
    - `AnimatedSection`: wrapper `motion.section` dengan scroll-trigger, periksa `useReducedMotion()`, jika true matikan animasi (`initial={false}`, variants kosong)
    - `SEOHead`: wrapper `react-helmet-async` untuk `<title>` dan `<meta name="description">`
    - _Requirements: 4.2, 11.4, 12.1, 12.2_

  - [ ]* 4.4 Tulis property test untuk `AnimatedSection` (reduced motion)
    - **Property 16: Animasi dinonaktifkan saat prefers-reduced-motion aktif**
    - **Validates: Requirements 11.4**
    - Test bahwa komponen render dengan `initial={false}` dan variants `{}` ketika `useReducedMotion` mengembalikan `true`

  - [x] 4.5 Implementasi `ProjectCard` dan `BlogCard`
    - `ProjectCard`: render `<article>` dengan thumbnail (`loading="lazy"`, `alt` required), judul, deskripsi singkat, tags (`TagBadge`), dan `<Link>` ke `/projects/${slug}`
    - `BlogCard`: render `<article>` dengan cover image (`loading="lazy"`, `alt` required), judul, tanggal (via `formatDate`), dan excerpt
    - _Requirements: 5.2, 7.1, 11.3, 12.3_

  - [ ]* 4.6 Tulis property test untuk `ProjectCard` (field wajib)
    - **Property 2: Kartu proyek menampilkan semua field wajib**
    - **Validates: Requirements 5.2**
    - Untuk semua data proyek valid, verifikasi render mengandung judul, deskripsi singkat, minimal satu tag, dan `<img>` dengan `alt` non-kosong

  - [x] 4.7 Implementasi `TimelineEntry`
    - Render `<li>` atau `<div>` dengan institusi/perusahaan, peran/gelar, durasi (format "MM/YYYY – Present" atau end date), deskripsi
    - Diferensiasi visual berdasarkan `type`: 'education' vs 'experience' (ikon berbeda atau warna badge)
    - _Requirements: 8.2, 8.3_

  - [ ]* 4.8 Tulis property test untuk `TimelineEntry` (field wajib dan type)
    - **Property 9: Timeline entry menampilkan semua field wajib dan memiliki tipe yang terdefinisi**
    - **Validates: Requirements 8.2, 8.3**

- [x] 5. Layout components: Navbar dan Footer
  - [x] 5.1 Implementasi `Navbar`
    - Sticky/fixed di atas viewport, link ke setiap section dengan smooth scroll (`react-scroll` atau CSS `scroll-behavior: smooth`)
    - Hamburger menu responsive untuk mobile (viewport < 768px)
    - Seluruh link dapat difokus dengan keyboard, `focus-visible` indicator aktif
    - _Requirements: 1.2, 1.3, 12.5_

  - [x] 5.2 Implementasi `Footer`
    - Gunakan elemen semantik `<footer>`, tampilkan copyright dan tautan media sosial
    - _Requirements: 12.2_

- [x] 6. Section components: HeroSection dan AboutSection
  - [x] 6.1 Implementasi `HeroSection`
    - Tampilkan nama pemilik, tagline, dan CTA button
    - Animasi entrance (`fadeInUp`) dengan delay bertahap untuk nama, tagline, CTA menggunakan `heroVariants` dari Framer Motion
    - CTA button scroll ke Projects atau Contact section
    - Background image atau gradient
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 6.2 Implementasi `AboutSection`
    - Bungkus dengan `AnimatedSection` (scroll-triggered)
    - Tampilkan foto profil (`<img>` dengan `alt` deskriptif) dan biografi pemilik
    - Tombol download/link CV/resume yang membuka di tab baru (`target="_blank"`)
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 7. Section components: SkillsSection dan ProjectsSection
  - [x] 7.1 Implementasi `SkillsSection`
    - Fetch data skills dari CMS atau fallback ke `data/skills.js`
    - Kelompokkan berdasarkan kategori, render `SkillItem` per skill dengan stagger animation (`staggerContainer` / `staggerItem` variants)
    - Bungkus dengan `AnimatedSection`
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ]* 7.2 Tulis property test untuk skills data
    - **Property 1: Setiap skill item memiliki ikon dan label**
    - **Validates: Requirements 4.2**
    - Untuk semua data skills (CMS atau static), setiap item memiliki `icon` dan `name` non-kosong

  - [x] 7.3 Implementasi `ProjectsSection`
    - Fetch data proyek dari CMS via `useCMSProjects()`
    - Tampilkan `FilterBar` (komponen inline atau terpisah) dengan semua unique tags dari proyek
    - Filter proyek menggunakan `filterProjects(projects, activeTag)` dari utils
    - Render `ProjectCard` dengan `AnimatePresence` dan stagger animation
    - Bungkus dengan `AnimatedSection`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 7.4 Tulis property test untuk filter proyek di ProjectsSection
    - **Property 3: Filter proyek hanya mengembalikan proyek yang relevan** (validasi di level komponen/state)
    - **Validates: Requirements 5.4**

- [x] 8. Section components: BlogSection, TimelineSection, dan ContactSection
  - [x] 8.1 Implementasi `BlogSection`
    - Fetch data blog posts dari CMS via `useCMSBlogPosts()`
    - Render `BlogCard` per artikel dengan animasi stagger
    - Klik BlogCard navigasi ke `/blog/${slug}`
    - Bungkus dengan `AnimatedSection`
    - _Requirements: 7.1, 7.2_

  - [ ]* 8.2 Tulis property test untuk blog preview (field wajib)
    - **Property 7: Preview artikel blog menampilkan semua metadata wajib**
    - **Validates: Requirements 7.1**
    - Untuk semua data blog valid, render preview mengandung judul, tanggal terformat, cover image dengan `alt`, dan excerpt

  - [x] 8.3 Implementasi `TimelineSection`
    - Fetch data timeline via `useCMSTimeline()` (dengan fallback ke `data/timeline.js`)
    - Urutkan entries secara reverse chronological berdasarkan `startDate`
    - Render `TimelineEntry` per item dengan animasi sequential
    - Bungkus dengan `AnimatedSection`
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

  - [ ]* 8.4 Tulis property test untuk pengurutan timeline
    - **Property 10: Timeline diurutkan secara reverse chronological**
    - **Validates: Requirements 8.1**
    - Untuk semua kumpulan entries, setelah sort, setiap `entries[i].startDate >= entries[i+1].startDate`

  - [x] 8.5 Implementasi `ContactSection`
    - Gunakan React Hook Form untuk form dengan field: `name` (required), `email` (required, format email), `message` (required)
    - Tampilkan inline error per field jika validasi gagal, tidak submit jika ada error
    - Kirim data via `formService.submitContactForm()`, tampilkan pesan sukses atau error
    - Jika submit gagal, pertahankan data form (tidak reset)
    - Tampilkan minimal satu direct contact link (LinkedIn, GitHub, atau email)
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

  - [ ]* 8.6 Tulis property test untuk validasi form kontak
    - **Property 11: Validasi form menolak field kosong dan email invalid**
    - **Validates: Requirements 9.5, 9.6**
    - Untuk semua kombinasi field kosong/whitespace-only, form tidak submit; untuk email tidak valid, tampilkan error

  - [ ]* 8.7 Tulis property test untuk form submission gagal
    - **Property 12: Form submission gagal mempertahankan data**
    - **Validates: Requirements 9.4**
    - Simulasi network failure; verifikasi data form tetap tersedia dan pesan error ditampilkan

- [x] 9. Checkpoint — Semua section components selesai
  - Pastikan semua tests lulus, tanya user jika ada pertanyaan.

- [x] 10. Page components: HomePage, ProjectDetailPage, BlogDetailPage, NotFoundPage
  - [x] 10.1 Implementasi `HomePage`
    - Render semua sections secara berurutan di dalam `<main>`: HeroSection, AboutSection, SkillsSection, ProjectsSection, BlogSection, TimelineSection, ContactSection
    - Pasang `<SEOHead>` dengan title dan description unik untuk home page
    - _Requirements: 1.1, 12.1_

  - [x] 10.2 Implementasi `NotFoundPage`
    - Tampilkan pesan 404 Not Found dan link kembali ke halaman utama
    - Pasang `<SEOHead>` dengan title "404 Not Found"
    - _Requirements: 6.5, 7.5, 12.1_

  - [x] 10.3 Implementasi `ProjectDetailPage`
    - Terima `slug` dari React Router params (`/projects/:slug`)
    - Fetch data via `useCMSProjects(slug)`; jika data null/tidak ditemukan, render `<NotFoundPage />`
    - Tampilkan: judul, deskripsi detail, tech stack list, peran, gambar/screenshot (`loading="lazy"`, `alt` required)
    - Tampilkan link live demo dan source code HANYA jika `liveDemoUrl`/`sourceCodeUrl` non-null dan non-kosong
    - Tombol back ke `/#projects`
    - Pasang `<SEOHead>` dengan title `{projectTitle} — {ownerName}` dan description berupa short description proyek
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 12.1_

  - [ ]* 10.4 Tulis property test untuk Project Detail Page (field wajib)
    - **Property 4: Project Detail Page menampilkan semua field wajib**
    - **Validates: Requirements 6.1**

  - [ ]* 10.5 Tulis property test untuk conditional link demo/repo
    - **Property 5: Link demo/repo hanya ditampilkan jika tersedia**
    - **Validates: Requirements 6.2**
    - Untuk semua proyek dengan `liveDemoUrl` null/kosong, link demo tidak dirender; berlaku juga untuk `sourceCodeUrl`

  - [ ]* 10.6 Tulis property test untuk slug tidak valid (404)
    - **Property 6: Slug tidak valid menghasilkan tampilan 404**
    - **Validates: Requirements 6.5, 7.5**
    - Simulasi CMS mengembalikan null; verifikasi halaman render 404 dan link kembali

  - [x] 10.7 Implementasi `BlogDetailPage`
    - Terima `slug` dari React Router params (`/blog/:slug`)
    - Fetch data via `useCMSBlogPosts(slug)`; jika data null/tidak ditemukan, render `<NotFoundPage />`
    - Tampilkan: judul, tanggal (via `formatDate`), cover image (`loading="lazy"`, `alt` required), nama penulis, konten rendered dari rich text/Markdown
    - Pasang `<SEOHead>` dengan title `{articleTitle} — Blog {ownerName}` dan description berupa excerpt
    - _Requirements: 7.3, 7.4, 7.5, 7.6, 12.1_

  - [ ]* 10.8 Tulis property test untuk Blog Detail Page (field wajib)
    - **Property 8: Blog Detail Page menampilkan semua konten dan metadata wajib**
    - **Validates: Requirements 7.3, 7.6**

- [x] 11. Routing, App setup, dan SEO
  - [x] 11.1 Implementasi routing di `App.jsx`
    - Setup `BrowserRouter` dengan `Routes`: `/` → `HomePage`, `/projects/:slug` → `ProjectDetailPage` (lazy-loaded), `/blog/:slug` → `BlogDetailPage` (lazy-loaded), `*` → `NotFoundPage`
    - Bungkus app dengan `HelmetProvider` dari `react-helmet-async`
    - _Requirements: 6.3, 7.4, 11.2_

  - [ ]* 11.2 Tulis property test untuk SEO (title dan description unik per halaman)
    - **Property 15: Setiap halaman memiliki title dan meta description yang unik**
    - **Validates: Requirements 12.1**
    - Untuk setiap kombinasi halaman yang di-render, `<title>` dan `<meta name="description">` berbeda satu sama lain

- [x] 12. Aksesibilitas dan performa akhir
  - [x] 12.1 Audit dan perbaiki aksesibilitas
    - Pastikan semua elemen `<img>` memiliki `alt` non-kosong untuk gambar informatif dan `alt=""` untuk gambar dekoratif
    - Pastikan seluruh halaman menggunakan elemen semantik: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
    - Pastikan semua elemen interaktif dapat difokus dengan keyboard dan memiliki `focus-visible` indicator
    - Verifikasi rasio kontras warna minimal 4.5:1 pada teks utama
    - _Requirements: 12.2, 12.3, 12.4, 12.5_

  - [ ]* 12.2 Tulis property test untuk atribut alt pada semua gambar
    - **Property 14: Semua elemen gambar memiliki atribut alt**
    - **Validates: Requirements 12.3**
    - Untuk setiap `<img>` yang di-render di seluruh halaman, atribut `alt` ada dan (untuk gambar informatif) non-kosong

  - [x] 12.3 Implementasi lazy loading dan optimasi performa
    - Pastikan semua `<img>` menggunakan `loading="lazy"` (kecuali hero image above-the-fold yang menggunakan `loading="eager"`)
    - Pastikan `ProjectDetailPage` dan `BlogDetailPage` di-lazy-load via `React.lazy()` dan `Suspense`
    - _Requirements: 11.2, 11.3_

  - [ ]* 12.4 Tulis property test untuk lazy loading images
    - **Property 17: Semua gambar menggunakan lazy loading**
    - **Validates: Requirements 11.3**
    - Untuk semua `<img>` di luar area above-the-fold, atribut `loading` diset ke `"lazy"`

- [x] 13. Integrasi akhir dan CMS graceful fallback
  - [x] 13.1 Verifikasi integrasi keseluruhan
    - Pastikan semua hooks (`useCMSProjects`, `useCMSBlogPosts`, `useCMSTimeline`) terhubung ke services layer dan state loading/error ditangani di setiap section
    - Verifikasi bahwa ketika `VITE_CMS_TYPE` tidak diset atau CMS tidak tersedia, aplikasi tetap render dengan fallback (empty sections atau data statis)
    - _Requirements: 10.1, 10.2, 10.3_

  - [ ]* 13.2 Tulis property test untuk graceful fallback CMS
    - **Property 13: CMS tidak tersedia menghasilkan graceful fallback, bukan crash**
    - **Validates: Requirements 10.3**
    - Simulasi semua fungsi CMS melempar error; verifikasi tidak ada unhandled exception dan komponen render tanpa crash

- [x] 14. Final checkpoint — Semua tests lulus
  - Pastikan semua tests lulus, lakukan audit Lighthouse untuk memverifikasi Lighthouse Performance ≥ 80 pada desktop, tanya user jika ada pertanyaan.

---

## Notes

- Tasks bertanda `*` bersifat opsional dan dapat dilewati untuk MVP yang lebih cepat
- Setiap task mereferensikan requirements spesifik untuk keterlacakan
- Property tests memvalidasi sifat universal dari correctness properties di design document
- Unit tests memvalidasi kasus spesifik dan edge cases
- Data `skills.js` dan `timeline.js` digunakan sebagai fallback statis, bukan pengganti CMS
- Environment variables harus ada di `.env` lokal (tidak di-commit); `.env.example` di-commit ke repo
- Gunakan `React.lazy()` + `Suspense` untuk code splitting pada halaman detail

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1", "2.2", "2.3"] },
    { "id": 1, "tasks": ["3.1", "3.2", "4.1"] },
    { "id": 2, "tasks": ["4.2", "4.3", "4.5", "4.7"] },
    { "id": 3, "tasks": ["4.4", "4.6", "4.8", "5.1", "5.2"] },
    { "id": 4, "tasks": ["6.1", "6.2", "7.1", "7.3", "8.1", "8.3", "8.5"] },
    { "id": 5, "tasks": ["7.2", "7.4", "8.2", "8.4", "8.6", "8.7", "10.1", "10.2", "10.3", "10.7"] },
    { "id": 6, "tasks": ["10.4", "10.5", "10.6", "10.8", "11.1"] },
    { "id": 7, "tasks": ["11.2", "12.1", "12.3", "13.1"] },
    { "id": 8, "tasks": ["12.2", "12.4", "13.2"] }
  ]
}
```
