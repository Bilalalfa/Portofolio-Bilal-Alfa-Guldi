# Personal Portfolio Website

Personal Portfolio Website adalah aplikasi web portofolio pribadi modern, responsif, dan interaktif yang dibangun menggunakan React dan Vite. Web ini dirancang untuk menampilkan profil profesional, riwayat pengalaman, daftar proyek, keahlian, serta artikel blog. Proyek ini dilengkapi dengan integrasi ganda Headless CMS (Contentful & Sanity.io), asisten obrolan kecerdasan buatan (powered by Google Gemini API), pengalih tema gelap/terang (Dark/Light Mode), serta optimasi SEO dinamis.

## Fitur Utama

- Integrasi Headless CMS Ganda: Mendukung pengambilan data dari Contentful maupun Sanity.io secara dinamis dengan mekanisme fallback ke data lokal apabila CMS tidak terkonfigurasi.
- AI Chat Assistant: Widget obrolan interaktif yang memanfaatkan Google Gemini API untuk menjawab pertanyaan pengunjung seputar profil, keahlian, dan portofolio secara otomatis.
- Manajemen Proyek dan Blog: Halaman detail untuk proyek dan artikel blog yang mendukung rendering format Rich Text (Contentful Rich Text Renderer dan Sanity Portable Text) serta tagging berbasis kategori.
- Filter dan Pencarian Proyek: Fitur penyaringan interaktif pada daftar proyek berdasarkan teknologi dan kategori.
- Lini Masa Interaktif: Visualisasi riwayat karir, pendidikan, dan pencapaian profesional dalam format lini masa (timeline).
- Form Kontak Interaktif: Formulir komunikasi yang dilengkapi validasi data input menggunakan React Hook Form serta pengiriman pesan via endpoint API.
- Mode Gelap dan Terang: Penggantian dan peralihan tema visual secara dinamis menggunakan React Context API.
- Animasi dan Aksesibilitas: Animasi transisi halaman dan komponen yang halus berbasis Framer Motion dengan dukungan pengaturan pengurangan gerakan (Reduced Motion).
- Optimasi SEO: Pengelolaan meta tag dinamis di setiap halaman menggunakan React Helmet Async untuk mendukung visibilitas pada mesin pencari.

## Cara Instalasi dan Menjalankan Proyek

### Prasyarat

Sebelum memulai, pastikan perangkat Anda telah terinstal:
- Node.js (versi 18 atau yang lebih baru)
- npm, yarn, atau pnpm

### Langkah Instalasi

1. Clone repositori ini ke komputer lokal Anda:
   ```bash
   git clone <URL_REPOSITORI>
   cd personal-portfolio-website
   ```

2. Instal seluruh dependensi proyek:
   ```bash
   npm install
   ```

3. Konfigurasi Environment Variables:
   Buat berkas `.env` dengan menyalin sampel dari `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Buka berkas `.env` dan sesuaikan nilai variabel berikut sesuai kebutuhan:
   ```env
   # CMS Configuration ('contentful' atau 'sanity')
   VITE_CMS_TYPE=contentful

   # Contentful Configuration
   VITE_CONTENTFUL_SPACE_ID=your_space_id
   VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token

   # Sanity Configuration
   VITE_SANITY_PROJECT_ID=your_project_id
   VITE_SANITY_DATASET=production
   VITE_SANITY_API_TOKEN=your_api_token

   # Form Submission Endpoint
   VITE_FORM_ENDPOINT=your_form_endpoint

   # Google Gemini AI API Key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. Jalankan server pengembang (Development Server):
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan pada alamat `http://localhost:5173`.

### Skrip Lain yang Tersedia

- Build Produksi:
  ```bash
  npm run build
  ```
- Preview Build Produksi:
  ```bash
  npm run preview
  ```
- Linter Kode:
  ```bash
  npm run lint
  ```

## Struktur Folder

```text
personal-portfolio-website/
├── public/                  # Berkas statis publik
├── src/
│   ├── assets/              # Aset media (gambar, logo, ikon)
│   ├── components/          # Komponen UI modular
│   │   ├── layout/          # Komponen tata letak utama (Navbar, Footer)
│   │   ├── sections/        # Komponen bagian halaman (Hero, About, Projects, Skills, Timeline, Blog, Contact)
│   │   └── ui/              # Komponen UI reusable (AIChatWidget, ProjectCard, BlogCard, SkillItem, SEOHead)
│   ├── context/             # React Context untuk manajemen state global (ThemeContext)
│   ├── data/                # Data lokal sebagai fallback (projects, skills, timeline)
│   ├── hooks/               # Custom React Hooks (useCMSProjects, useCMSBlogPosts, useCMSTimeline, useReducedMotion)
│   ├── pages/               # Halaman utama aplikasi (HomePage, ProjectDetailPage, BlogDetailPage, NotFoundPage)
│   ├── services/            # Modul layanan integrasi API (cmsClient, aiService, formService)
│   ├── utils/               # Fungsi pembantu/utility (filterProjects, formatDate)
│   ├── App.jsx              # Komponen utama dan konfigurasi alur routing
│   ├── main.jsx             # Berkas entri utama aplikasi React
│   └── index.css            # Gaya global dan konfigurasi Tailwind CSS
├── .env.example             # Template berkas konfigurasi lingkungan
├── oxlintrc.json            # Konfigurasi Oxlint
├── package.json             # Manifes dependensi dan skrip proyek
├── tailwind.config.js       # Konfigurasi Tailwind CSS
└── vite.config.js           # Konfigurasi modul bundler Vite
```

## Teknologi yang Digunakan

- Core & Build Tool: React 19, Vite
- Routing & Navigation: React Router DOM v7
- Styling & UI: Tailwind CSS, PostCSS, Autoprefixer, React Icons
- Animation & Motion: Framer Motion
- Content Management System (CMS): Contentful SDK, Sanity Client (@sanity/client, @portabletext/react)
- Artificial Intelligence: Google Gemini API
- Form Management: React Hook Form
- SEO & Metadata: React Helmet Async
- Code Quality & Linting: Oxlint
