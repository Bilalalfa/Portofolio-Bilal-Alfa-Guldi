# Design Document — Personal Portfolio Website

## Overview

Website portofolio personal single-page application (SPA) yang dibangun dengan React, Tailwind CSS, dan Framer Motion. Konten dinamis (proyek, blog, timeline) dikelola melalui Headless CMS (Contentful atau Sanity). Routing halaman detail ditangani oleh React Router. Form kontak menggunakan layanan third-party (Formspree atau EmailJS). SEO diimplementasikan menggunakan React Helmet Async.

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Browser (Visitor)                │
└────────────────────────┬────────────────────────────┘
                         │ HTTP
┌────────────────────────▼────────────────────────────┐
│              React SPA (Vite + React Router)        │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  Pages      │  │  Components  │  │  Hooks     │ │
│  │  - Home     │  │  - Sections  │  │  useCMS    │ │
│  │  - Project  │  │  - UI atoms  │  │  useForm   │ │
│  │  - Blog     │  │  - Layout    │  │  useMotion │ │
│  └─────────────┘  └──────────────┘  └────────────┘ │
│  ┌──────────────────────────────────────────────┐   │
│  │             Services Layer                   │   │
│  │  - cmsClient.js   (CMS API adapter)          │   │
│  │  - formService.js (Formspree/EmailJS adapter)│   │
│  └──────────────────────────────────────────────┘   │
└──────────────┬──────────────────────┬───────────────┘
               │ REST/GraphQL         │ HTTP POST
┌──────────────▼────────┐  ┌──────────▼──────────────┐
│   Headless CMS        │  │  Form Submission Service │
│ (Contentful / Sanity) │  │  (Formspree / EmailJS)  │
└───────────────────────┘  └─────────────────────────┘
```

### Tech Stack

| Layer           | Teknologi                          |
|-----------------|-------------------------------------|
| Framework       | React 18 + Vite                     |
| Styling         | Tailwind CSS v3                     |
| Animation       | Framer Motion v11                   |
| Routing         | React Router v6                     |
| CMS Client      | Contentful JS SDK / Sanity Client   |
| SEO             | React Helmet Async                  |
| Form            | React Hook Form + Formspree/EmailJS |
| Icons           | React Icons / Simple Icons          |
| Image Opt       | Native `loading="lazy"` + Cloudinary (via CMS) |

---

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── HeroSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── SkillsSection.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── BlogSection.jsx
│   │   ├── TimelineSection.jsx
│   │   └── ContactSection.jsx
│   └── ui/
│       ├── ProjectCard.jsx
│       ├── BlogCard.jsx
│       ├── TimelineEntry.jsx
│       ├── SkillItem.jsx
│       ├── TagBadge.jsx
│       ├── AnimatedSection.jsx  ← wrapper Framer Motion scroll-trigger
│       └── SEOHead.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── ProjectDetailPage.jsx
│   ├── BlogDetailPage.jsx
│   └── NotFoundPage.jsx
├── hooks/
│   ├── useCMSProjects.js
│   ├── useCMSBlogPosts.js
│   ├── useCMSTimeline.js
│   └── useReducedMotion.js
├── services/
│   ├── cmsClient.js
│   └── formService.js
├── data/
│   ├── skills.js        ← fallback static skills data
│   └── timeline.js      ← fallback static timeline data
├── utils/
│   ├── filterProjects.js
│   └── formatDate.js
├── App.jsx
└── main.jsx
```

---

## Component Design

### Layout Components

#### `Navbar`
- Fixed/sticky di bagian atas viewport
- Berisi tautan navigasi ke setiap section (`#hero`, `#about`, `#skills`, `#projects`, `#blog`, `#timeline`, `#contact`)
- Setiap tautan menggunakan `scroll-behavior: smooth` atau `react-scroll`
- Responsive: hamburger menu di mobile

#### `Footer`
- Menampilkan copyright dan tautan media sosial
- Semantic: `<footer>` element

### Page Components

#### `HomePage`
```jsx
// Renders all sections in order
<main>
  <HeroSection />
  <AboutSection />
  <SkillsSection />
  <ProjectsSection />
  <BlogSection />
  <TimelineSection />
  <ContactSection />
</main>
```

#### `ProjectDetailPage`
- Menerima `slug` dari React Router params (`/projects/:slug`)
- Memanggil `useCMSProjects(slug)` untuk fetch data
- Jika data tidak ditemukan: render `<NotFoundPage />`
- Menampilkan: judul, deskripsi, tech stack, role, gambar, link demo/repo
- Tombol back ke `/#projects`

#### `BlogDetailPage`
- Menerima `slug` dari React Router params (`/blog/:slug`)
- Memanggil `useCMSBlogPosts(slug)` untuk fetch data
- Jika data tidak ditemukan: render `<NotFoundPage />`
- Menampilkan: judul, tanggal, cover image, penulis, konten rich-text/Markdown

### Section Components

#### `HeroSection`
```jsx
<section id="hero">
  <motion.h1>{ownerName}</motion.h1>
  <motion.p>{tagline}</motion.p>
  <motion.button onClick={scrollToTarget}>{ctaLabel}</motion.button>
</section>
```
Animasi entrance (`fadeInUp`) pada nama, tagline, dan CTA.

#### `SkillsSection`
```jsx
<section id="skills">
  {skillCategories.map(category => (
    <div key={category.name}>
      <h3>{category.name}</h3>
      <div className="skills-grid">
        {category.skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            variants={staggerVariants}
            custom={i}
          >
            <SkillItem icon={skill.icon} label={skill.name} />
          </motion.div>
        ))}
      </div>
    </div>
  ))}
</section>
```

#### `ProjectsSection`
```jsx
<section id="projects">
  <FilterBar tags={allTags} onFilter={setActiveTag} />
  <AnimatePresence>
    {filteredProjects.map((project, i) => (
      <motion.div key={project.slug} variants={staggerVariants} custom={i}>
        <ProjectCard project={project} />
      </motion.div>
    ))}
  </AnimatePresence>
</section>
```

#### `ContactSection`
Menggunakan React Hook Form untuk validasi:
```jsx
const { register, handleSubmit, formState: { errors } } = useForm();
```
Field: `name` (required), `email` (required, email format), `message` (required).

### UI Components

#### `AnimatedSection`
Wrapper reusable untuk scroll-triggered animation:
```jsx
// Checks useReducedMotion() dan menonaktifkan animasi jika true
const AnimatedSection = ({ children, variants, ...props }) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.section
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? false : "visible"}
      viewport={{ once: true }}
      variants={shouldReduceMotion ? {} : variants}
      {...props}
    >
      {children}
    </motion.section>
  );
};
```

#### `SEOHead`
```jsx
// Menggunakan React Helmet Async
const SEOHead = ({ title, description }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Helmet>
);
```

#### `ProjectCard`
```jsx
<article>
  <img src={project.thumbnail} alt={project.title} loading="lazy" />
  <h3>{project.title}</h3>
  <p>{project.shortDescription}</p>
  <div>{project.tags.map(tag => <TagBadge key={tag} tag={tag} />)}</div>
  <Link to={`/projects/${project.slug}`}>Lihat Detail</Link>
</article>
```

---

## Data Models

### CMS Content Types

#### Project
```typescript
interface Project {
  slug: string;           // unique identifier, digunakan di URL
  title: string;
  shortDescription: string;
  detailedDescription: string; // rich text / Markdown
  techStack: string[];
  tags: string[];         // untuk filtering
  role: string;
  images: CMSImage[];
  thumbnailImage: CMSImage;
  liveDemoUrl?: string;
  sourceCodeUrl?: string;
  category?: string;
}
```

#### BlogPost
```typescript
interface BlogPost {
  slug: string;           // unique identifier, digunakan di URL
  title: string;
  excerpt: string;
  content: string;        // rich text / Markdown dari CMS
  coverImage: CMSImage;
  publishedDate: string;  // ISO 8601
  author: string;
}
```

#### TimelineEntry
```typescript
interface TimelineEntry {
  id: string;
  type: 'education' | 'experience';
  institutionOrCompany: string;
  roleOrDegree: string;
  startDate: string;      // ISO 8601 atau "YYYY-MM"
  endDate?: string;       // undefined = "Present"
  description: string;
}
```

#### SkillItem
```typescript
interface SkillItem {
  name: string;
  icon: string;           // nama icon dari React Icons / URL
  category: string;       // e.g., "Frontend", "Backend", "Tools"
}
```

#### CMSImage
```typescript
interface CMSImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}
```

### Static Fallback Data Shape

`src/data/skills.js` dan `src/data/timeline.js` mengekspor array dengan shape yang identik dengan tipe CMS di atas, sehingga hook dapat menggunakannya sebagai fallback.

---

## Services Layer

### `cmsClient.js`

Abstraksi adapter yang memisahkan logika CMS dari komponen:

```javascript
// src/services/cmsClient.js
const CMS_TYPE = import.meta.env.VITE_CMS_TYPE; // 'contentful' | 'sanity'

export async function fetchProjects() { /* ... */ }
export async function fetchProjectBySlug(slug) { /* ... */ }
export async function fetchBlogPosts() { /* ... */ }
export async function fetchBlogPostBySlug(slug) { /* ... */ }
export async function fetchTimelineEntries() { /* ... */ }
```

Error handling: setiap fungsi di-wrap dengan try-catch. Jika CMS tidak tersedia, mengembalikan `null` atau `[]` (bukan throw), sehingga komponen dapat menampilkan fallback gracefully.

### `formService.js`

```javascript
// src/services/formService.js
export async function submitContactForm({ name, email, message }) {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ name, email, message }),
  });
  if (!response.ok) throw new Error('Submission failed');
  return response.json();
}
```

---

## Custom Hooks

### `useCMSProjects(slug?)`
```javascript
// Jika slug diberikan: fetch satu project
// Jika tidak: fetch semua projects
// Returns: { data, loading, error }
```

### `useCMSBlogPosts(slug?)`
Sama seperti `useCMSProjects` namun untuk blog posts.

### `useCMSTimeline()`
Fetch semua timeline entries. Fallback ke `data/timeline.js` jika CMS gagal.

### `useReducedMotion()`
```javascript
// Wrapper tipis atas Framer Motion's useReducedMotion()
// Returns: boolean
import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';
export const useReducedMotion = () => useFramerReducedMotion() ?? false;
```

---

## Routing

```jsx
// App.jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/projects/:slug" element={<ProjectDetailPage />} />
    <Route path="/blog/:slug" element={<BlogDetailPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
</BrowserRouter>
```

---

## Animation Strategy

### Scroll-Triggered Entrance (via `AnimatedSection`)

Semua section halaman utama menggunakan `AnimatedSection` dengan variant `fadeInUp`:
```javascript
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
```

### Stagger Children (Skills, Projects, Timeline)

```javascript
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
```

### Hero Entrance

Nama, tagline, dan CTA muncul secara berurutan dengan `delay`:
```javascript
const heroVariants = {
  name:    { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.2 } } },
  tagline: { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.4 } } },
  cta:     { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.6 } } },
};
```

### Reduced Motion

`AnimatedSection` memeriksa `useReducedMotion()`. Jika `true`, semua variants diset ke `{}` dan `initial={false}`, sehingga animasi tidak berjalan.

---

## SEO Strategy

Setiap page menggunakan `<SEOHead>` dengan `title` dan `description` yang unik:

| Page                   | Title Format                              | Description                        |
|------------------------|-------------------------------------------|------------------------------------|
| Home                   | `{ownerName} — Portfolio`                 | Tagline pemilik                    |
| `/projects/:slug`      | `{projectTitle} — {ownerName}`            | Short description proyek           |
| `/blog/:slug`          | `{articleTitle} — Blog {ownerName}`       | Excerpt artikel                    |
| 404                    | `404 Not Found — {ownerName}`             | Halaman tidak ditemukan            |

---

## Environment Variables

```env
# .env (tidak di-commit ke version control)
VITE_CMS_TYPE=contentful          # atau 'sanity'
VITE_CONTENTFUL_SPACE_ID=xxx
VITE_CONTENTFUL_ACCESS_TOKEN=xxx
VITE_SANITY_PROJECT_ID=xxx
VITE_SANITY_DATASET=production
VITE_SANITY_API_TOKEN=xxx
VITE_FORM_ENDPOINT=https://formspree.io/f/xxx
```

`.env.example` di-commit ke repository dengan placeholder values.

---

## Error Handling

| Skenario                              | Perilaku                                                     |
|---------------------------------------|--------------------------------------------------------------|
| CMS tidak tersedia (fetch error)      | Hook mengembalikan `[]` atau `null`; komponen render fallback placeholder |
| Project slug tidak ditemukan di CMS   | `ProjectDetailPage` render `<NotFoundPage />`                |
| Blog slug tidak ditemukan di CMS      | `BlogDetailPage` render `<NotFoundPage />`                   |
| Form submission gagal                 | Tampilkan pesan error, pertahankan nilai form                |
| Validasi form gagal (field kosong)    | Tampilkan inline error per field, tidak submit               |
| Invalid email format                  | Tampilkan inline error pada field email                      |
| Image gagal dimuat                    | `alt` text tetap mendeskripsikan konten                      |

---

## Accessibility (WCAG 2.1 AA)

- Seluruh halaman menggunakan elemen semantik: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Semua `<img>` memiliki atribut `alt` yang deskriptif (non-kosong untuk gambar informatif; `alt=""` untuk gambar dekoratif)
- Rasio kontras warna teks utama vs latar belakang minimal 4.5:1 (diverifikasi dengan alat seperti axe atau Lighthouse)
- Seluruh elemen interaktif (`<a>`, `<button>`, `<input>`) dapat difokus dengan keyboard, dengan `focus-visible` indicator
- `AnimatedSection` menonaktifkan animasi ketika `prefers-reduced-motion: reduce`

---

## Performance Strategy

- **Lazy loading gambar**: semua `<img>` menggunakan `loading="lazy"`
- **Code splitting**: React Router lazy-loads `ProjectDetailPage` dan `BlogDetailPage`
- **CMS image CDN**: gambar di-serve dari CDN Contentful/Sanity dengan URL resize
- **Bundle size**: Framer Motion tree-shaking melalui named imports
- **Target**: Lighthouse Performance ≥ 80 pada desktop

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

---

### Property 1: Setiap skill item memiliki ikon dan label

*For any* kumpulan data skills yang di-load (dari CMS atau static file), setiap item skill SHALL memiliki nilai `icon` yang non-kosong dan nilai `name`/label yang non-kosong.

**Validates: Requirements 4.2**

---

### Property 2: Kartu proyek menampilkan semua field wajib

*For any* proyek yang di-fetch dari CMS, kartu proyek yang di-render SHALL mengandung: judul proyek, deskripsi singkat, minimal satu technology tag, dan thumbnail image dengan atribut `alt`.

**Validates: Requirements 5.2**

---

### Property 3: Filter proyek hanya mengembalikan proyek yang relevan

*For any* kumpulan proyek dan *for any* tag yang dipilih sebagai filter aktif, semua proyek yang ditampilkan setelah filter diaplikasikan SHALL memiliki tag tersebut dalam daftar tags mereka. Jika tidak ada proyek yang cocok, tampilan SHALL menunjukkan hasil kosong (bukan error).

**Validates: Requirements 5.4**

---

### Property 4: Project Detail Page menampilkan semua field wajib

*For any* proyek yang di-fetch dari CMS menggunakan slug yang valid, halaman detail proyek SHALL menampilkan: judul lengkap, deskripsi detail, daftar tech stack (minimal satu item), peran pemilik, dan minimal satu gambar dengan atribut `alt`.

**Validates: Requirements 6.1**

---

### Property 5: Link demo/repo hanya ditampilkan jika tersedia

*For any* proyek yang di-fetch dari CMS, link live demo SHALL hanya ditampilkan jika field `liveDemoUrl` non-null dan non-kosong, dan link source code SHALL hanya ditampilkan jika field `sourceCodeUrl` non-null dan non-kosong.

**Validates: Requirements 6.2**

---

### Property 6: Slug tidak valid menghasilkan tampilan 404

*For any* slug proyek yang tidak ada di CMS (atau ketika CMS mengembalikan data kosong), halaman `/projects/{slug}` SHALL menampilkan pesan 404 Not Found dan link untuk kembali ke halaman proyek. Hal yang sama berlaku untuk *any* slug blog yang tidak ada di `/blog/{slug}`.

**Validates: Requirements 6.5, 7.5**

---

### Property 7: Preview artikel blog menampilkan semua metadata wajib

*For any* artikel blog yang di-fetch dari CMS, preview yang di-render di Blog Section SHALL mengandung: judul artikel, tanggal publikasi (terformat), cover image dengan atribut `alt`, dan excerpt/ringkasan.

**Validates: Requirements 7.1**

---

### Property 8: Blog Detail Page menampilkan semua konten dan metadata wajib

*For any* artikel blog yang di-fetch dari CMS menggunakan slug yang valid, halaman detail blog SHALL menampilkan: judul artikel, tanggal publikasi, cover image dengan `alt`, nama penulis, dan konten artikel yang di-render dari rich text/Markdown.

**Validates: Requirements 7.3, 7.6**

---

### Property 9: Timeline entry menampilkan semua field wajib dan memiliki tipe yang terdefinisi

*For any* timeline entry yang di-load (dari CMS atau static file), entry yang di-render SHALL mengandung: nama institusi/perusahaan, judul peran/gelar, durasi (start date dan end date atau "Present"), deskripsi singkat, dan memiliki `type` yang merupakan salah satu dari `'education'` atau `'experience'` (digunakan untuk diferensiasi visual).

**Validates: Requirements 8.2, 8.3**

---

### Property 10: Timeline diurutkan secara reverse chronological

*For any* kumpulan timeline entries, urutan yang di-render SHALL dimulai dari entry dengan `startDate` terbaru (paling baru) hingga yang tertua, sehingga untuk setiap pasangan entry berurutan `(e_i, e_{i+1})`, `e_i.startDate >= e_{i+1}.startDate`.

**Validates: Requirements 8.1**

---

### Property 11: Validasi form menolak field kosong dan email invalid

*For any* percobaan submit form kontak dengan satu atau lebih field wajib (`name`, `email`, `message`) yang kosong atau hanya berisi whitespace, form SHALL menampilkan inline error per field yang kosong dan SHALL NOT mengirimkan data ke form submission service.

*For any* string email yang tidak sesuai format email valid (e.g., tidak mengandung `@domain.tld`), form SHALL menampilkan inline error pada field email dan SHALL NOT submit.

**Validates: Requirements 9.5, 9.6**

---

### Property 12: Form submission gagal mempertahankan data

*For any* kumpulan data form yang valid (nama, email valid, pesan), jika submission ke form service menghasilkan error/network failure, data yang sudah diisi di form SHALL tetap tersedia (tidak ter-reset), dan pesan error SHALL ditampilkan kepada visitor.

**Validates: Requirements 9.4**

---

### Property 13: CMS tidak tersedia menghasilkan graceful fallback, bukan crash

*For any* skenario di mana CMS API tidak dapat dijangkau (network error, timeout, invalid credentials), aplikasi SHALL tetap render tanpa unhandled exception, dengan section yang bergantung pada CMS menampilkan konten fallback atau placeholder kosong.

**Validates: Requirements 10.3**

---

### Property 14: Semua elemen gambar memiliki atribut alt

*For any* elemen `<img>` yang di-render di seluruh halaman (home, project detail, blog detail), elemen tersebut SHALL memiliki atribut `alt`. Untuk gambar informatif (thumbnail, cover, profile photo), `alt` SHALL non-kosong dan deskriptif.

**Validates: Requirements 12.3**

---

### Property 15: Setiap halaman memiliki title dan meta description yang unik

*For any* halaman yang di-render (home page, `/projects/:slug`, `/blog/:slug`), `<title>` tag dan `<meta name="description">` SHALL ada dan SHALL berbeda satu sama lain — tidak ada dua halaman yang menggunakan title atau description yang identik.

**Validates: Requirements 12.1**

---

### Property 16: Animasi dinonaktifkan saat prefers-reduced-motion aktif

*For any* komponen yang menggunakan `AnimatedSection` atau Framer Motion variants, ketika `prefers-reduced-motion: reduce` aktif di sistem operasi pengguna, animasi tersebut SHALL tidak berjalan (tidak ada perubahan opacity/transform berbasis waktu).

**Validates: Requirements 11.4**

---

### Property 17: Semua gambar menggunakan lazy loading

*For any* elemen `<img>` yang di-render di halaman, atribut `loading` SHALL diset ke `"lazy"`, kecuali untuk gambar yang berada di above-the-fold (hero image), yang boleh menggunakan `loading="eager"`.

**Validates: Requirements 11.3**
