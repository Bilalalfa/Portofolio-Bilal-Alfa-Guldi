# Requirements Document

## Introduction

Website portofolio personal untuk seorang mahasiswa computer science yang dibangun menggunakan React dan Tailwind CSS. Website ini bersifat publik dan menampilkan profil, keahlian, proyek, pengalaman, dan artikel blog. Konten dikelola melalui Headless CMS (Contentful atau Sanity), animasi menggunakan Framer Motion atau AOS, dan proyek dibangun dari nol sebagai aplikasi baru.

## Glossary

- **Portfolio Website**: Aplikasi web publik yang menampilkan profil, keahlian, proyek, pengalaman, dan artikel blog milik mahasiswa computer science.
- **CMS**: Headless Content Management System (Contentful atau Sanity) yang digunakan untuk mengelola konten dinamis seperti proyek, artikel blog, dan data pengalaman.
- **Visitor**: Pengguna publik yang mengakses Portfolio Website tanpa autentikasi.
- **Header Section**: Bagian paling atas halaman utama yang menampilkan nama, tagline, dan navigasi utama.
- **About Section**: Bagian halaman yang menampilkan deskripsi singkat dan foto profil pemilik website.
- **Skills Section**: Bagian halaman yang menampilkan daftar keahlian teknis dan non-teknis.
- **Projects Section**: Bagian halaman yang menampilkan daftar kartu proyek yang dapat diklik.
- **Project Detail Page**: Halaman individual yang menampilkan informasi lengkap satu proyek.
- **Contact Section**: Bagian halaman yang menyediakan formulir pengiriman pesan atau tautan kontak.
- **Blog Section**: Bagian halaman yang menampilkan daftar artikel yang ditulis pemilik website.
- **Blog Detail Page**: Halaman individual yang menampilkan konten lengkap satu artikel blog.
- **Timeline Section**: Bagian halaman yang menampilkan riwayat pendidikan dan pengalaman secara kronologis.
- **Animation Library**: Framer Motion atau AOS (Animate On Scroll) yang digunakan untuk animasi elemen halaman.
- **Responsive Layout**: Tata letak yang menyesuaikan tampilan untuk perangkat mobile, tablet, dan desktop.

## Requirements

### Requirement 1 — Struktur Halaman Utama (Landing Page)

**User Story:** As a Visitor, I want to see all key sections on the main page, so that I can get a complete overview of the owner's profile without navigating to multiple pages.

#### Acceptance Criteria

1. THE Portfolio Website SHALL render a single-page layout containing the following sections in order: Header, About, Skills, Projects, Blog, Timeline, and Contact.
2. THE Portfolio Website SHALL provide a persistent navigation bar that links to each section via smooth scrolling.
3. WHEN a Visitor clicks a navigation link, THE Portfolio Website SHALL scroll smoothly to the corresponding section within the same page.
4. THE Portfolio Website SHALL render all sections correctly on viewport widths of 320px, 768px, and 1280px (Responsive Layout).

---

### Requirement 2 — Header Section

**User Story:** As a Visitor, I want to see an impactful introduction at the top of the page, so that I immediately understand who owns the website and what they do.

#### Acceptance Criteria

1. THE Header Section SHALL display the owner's full name, a short tagline or role description, and a call-to-action button.
2. WHEN the Header Section is loaded, THE Animation Library SHALL animate the name, tagline, and call-to-action button with an entrance animation.
3. THE Header Section SHALL display a background image or gradient that visually distinguishes it from other sections.
4. WHEN a Visitor clicks the call-to-action button in the Header Section, THE Portfolio Website SHALL scroll to the Projects Section or the Contact Section as configured.

---

### Requirement 3 — About Section

**User Story:** As a Visitor, I want to read a brief bio and see a profile photo, so that I can learn about the person behind the portfolio.

#### Acceptance Criteria

1. THE About Section SHALL display a profile photo and a written biography of the owner.
2. THE About Section SHALL display at least one downloadable or linkable resume/CV button.
3. WHEN a Visitor clicks the resume button, THE Portfolio Website SHALL open the resume file in a new browser tab.
4. WHEN the About Section enters the viewport, THE Animation Library SHALL animate the section content with a scroll-triggered entrance animation.

---

### Requirement 4 — Skills Section

**User Story:** As a Visitor, I want to see a categorized list of technical and non-technical skills, so that I can quickly assess the owner's competencies.

#### Acceptance Criteria

1. THE Skills Section SHALL display skills grouped into at least two categories (UI/UX Design, Tools).
2. THE Skills Section SHALL represent each skill with an icon or logo and a label.
3. WHEN the Skills Section enters the viewport, THE Animation Library SHALL animate each skill item with a staggered entrance animation.
4. THE Skills data SHALL be sourced either from the CMS or from a static configuration file within the codebase.

---

### Requirement 5 — Projects Section

**User Story:** As a Visitor, I want to browse a list of projects, so that I can evaluate the owner's practical work and experience.

#### Acceptance Criteria

1. THE Projects Section SHALL display project data fetched from the CMS as a grid of project cards.
2. THE Projects Section SHALL display on each project card: project title, short description, technology tags, and a thumbnail image.
3. WHEN a Visitor clicks a project card, THE Portfolio Website SHALL navigate to the corresponding Project Detail Page.
4. THE Projects Section SHALL support filtering projects by technology tag or category.
5. WHEN the Projects Section enters the viewport, THE Animation Library SHALL animate project cards with a staggered entrance animation.

---

### Requirement 6 — Project Detail Page

**User Story:** As a Visitor, I want to read complete information about a specific project, so that I can understand the scope, technologies used, and outcomes of the project.

#### Acceptance Criteria

1. THE Project Detail Page SHALL display the project title, tagline/summary, and hero image or prototype preview.
2. THE Project Detail Page SHALL display project metadata including year, duration, and the owner's role.
3. THE Project Detail Page SHALL display a "Problem" section describing the design challenge being addressed.
4. THE Project Detail Page SHALL display a "Solution" section listing the key features delivered, each with a title, description, and supporting image.
5. THE Project Detail Page SHALL display a "Research" section summarizing research methods used (e.g., surveys, interviews, competitive analysis) and key findings.
6. THE Project Detail Page SHALL display a "Design Process" section showing the design evolution (e.g., wireframes, user flows, high-fidelity mockups).
7. THE Project Detail Page SHALL display a "Testing & Iteration" section showing user feedback and before/after design changes.
8. THE Project Detail Page SHALL display a "Results" section summarizing outcomes or metrics (e.g., satisfaction score, usability test results).
9. THE Project Detail Page SHALL display a "Final Thoughts" section covering key learnings, next steps, and what the owner is most proud of.
10. THE Project Detail Page SHALL display a link to an external prototype (e.g., Figma) where available.
11. THE Project Detail Page SHALL be accessible via a unique URL path (e.g., `/projects/{slug}`).
12. THE Project Detail Page SHALL fetch its content from the CMS using the project slug as the identifier.
13. IF the CMS returns no data for a given slug, THEN THE Project Detail Page SHALL display a 404 Not Found message and a link to return to the Projects Section.
14. WHEN a Visitor clicks the back navigation element on the Project Detail Page, THE Portfolio Website SHALL navigate back to the Projects Section.

---

### Requirement 7 — Blog Section dan Blog Detail Page

**User Story:** As a Visitor, I want to read articles written by the owner, so that I can learn from their insights and assess their communication skills.

#### Acceptance Criteria

1. THE Blog Section SHALL display a list of article previews fetched from the CMS, each showing: title, publication date, cover image, and excerpt.
2. WHEN a Visitor clicks an article preview in the Blog Section, THE Portfolio Website SHALL navigate to the corresponding Blog Detail Page.
3. THE Blog Detail Page SHALL display the full article content rendered from rich text or Markdown sourced from the CMS.
4. THE Blog Detail Page SHALL be accessible via a unique URL path (e.g., `/blog/{slug}`).
5. IF the CMS returns no data for a given blog slug, THEN THE Blog Detail Page SHALL display a 404 Not Found message and a link to return to the Blog Section.
6. THE Blog Detail Page SHALL display the article title, publication date, cover image, and author name.

---

### Requirement 8 — Timeline Section (Pengalaman dan Pendidikan)

**User Story:** As a Visitor, I want to see the owner's education and experience history in chronological order, so that I can understand their academic and professional journey.

#### Acceptance Criteria

1. THE Timeline Section SHALL display education and experience entries in reverse chronological order (newest first).
2. THE Timeline Section SHALL display for each entry: institution or company name, role or degree title, duration (start and end date or "Present"), and a short description.
3. THE Timeline Section SHALL visually differentiate education entries from experience entries (e.g., using icons or color coding).
4. WHEN the Timeline Section enters the viewport, THE Animation Library SHALL animate each timeline entry with a sequential entrance animation.
5. THE Timeline data SHALL be sourced from the CMS or from a static configuration file within the codebase.

---

### Requirement 9 — Contact Section

**User Story:** As a Visitor, I want to send a message or find contact information, so that I can reach out to the owner for collaboration or opportunities.

#### Acceptance Criteria

1. THE Contact Section SHALL display a contact form with the following fields: name (required), email address (required), and message (required).
2. WHEN a Visitor submits the contact form with all required fields filled, THE Portfolio Website SHALL send the form data to a configured form submission service (e.g., Formspree, EmailJS, or equivalent).
3. WHEN the form submission succeeds, THE Portfolio Website SHALL display a success confirmation message to the Visitor.
4. IF the form submission fails, THEN THE Portfolio Website SHALL display an error message and retain the filled form data.
5. IF a Visitor submits the contact form with one or more required fields empty, THEN THE Portfolio Website SHALL display an inline validation error message for each empty required field without submitting the form.
6. IF a Visitor enters an invalid email address format in the email field, THEN THE Portfolio Website SHALL display an inline validation error message for the email field.
7. THE Contact Section SHALL display at least one direct contact link such as a LinkedIn profile URL, GitHub profile URL, or email address.

---

### Requirement 10 — Manajemen Konten via CMS

**User Story:** As the website owner, I want to manage dynamic content through a CMS, so that I can update projects, blog articles, and experience data without modifying the codebase.

#### Acceptance Criteria

1. THE Portfolio Website SHALL fetch Projects, Blog Articles, and Timeline data from the CMS API at build time or request time.
2. THE CMS SHALL serve as the single source of truth for Projects, Blog Articles, and Timeline entries.
3. WHEN the CMS API is unavailable during build, THE Portfolio Website SHALL display a graceful fallback state (e.g., empty section with a placeholder message) rather than crashing.
4. THE Portfolio Website SHALL use environment variables to store CMS API credentials and endpoint URLs, and SHALL NOT hardcode these values in the source code.

---

### Requirement 11 — Animasi dan Performa

**User Story:** As a Visitor, I want the website to feel smooth and responsive with animations, so that I have an enjoyable browsing experience without performance degradation.

#### Acceptance Criteria

1. THE Animation Library SHALL be used consistently across all sections for scroll-triggered entrance animations.
2. THE Portfolio Website SHALL achieve a Lighthouse Performance score of at least 80 on desktop.
3. THE Portfolio Website SHALL lazy-load images to reduce initial page load time.
4. WHEN a user has enabled the "prefers-reduced-motion" OS setting, THE Portfolio Website SHALL disable or reduce animations to respect the user's accessibility preference.

---

### Requirement 12 — SEO dan Aksesibilitas

**User Story:** As the website owner, I want the portfolio to be discoverable and accessible, so that it reaches a wider audience and complies with basic accessibility standards.

#### Acceptance Criteria

1. THE Portfolio Website SHALL include a unique `<title>` tag and `<meta name="description">` tag for the main page, each Project Detail Page, and each Blog Detail Page.
2. THE Portfolio Website SHALL use semantic HTML elements (e.g., `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`) throughout the page structure.
3. THE Portfolio Website SHALL provide `alt` attributes on all `<img>` elements.
4. THE Portfolio Website SHALL maintain a color contrast ratio of at least 4.5:1 between foreground text and background colors, in compliance with WCAG 2.1 AA.
5. THE Portfolio Website SHALL be navigable using keyboard-only input, with visible focus indicators on interactive elements.
