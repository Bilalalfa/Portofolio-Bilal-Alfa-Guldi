# Pedoman Kontribusi (Contributing Guidelines)

Terima kasih atas minat Anda untuk berkontribusi pada proyek Personal Portfolio Website. Dokumen ini berisi panduan dan pedoman yang dirancang untuk memastikan proses kontribusi berjalan dengan efisien, terstruktur, dan selaras dengan standar kualitas proyek.

## Kode Etik dan Etika Komunikasi

Dalam rangka menjaga lingkungan komunitas yang inklusif dan profesional, setiap kontributor diharapkan mematuhi etika komunikasi berikut:

1. Profesionalisme dan Menghormati Sesama: Gunakan bahasa yang sopan, jelas, dan konstruktif dalam seluruh diskusi (Issue, Pull Request, maupun Code Review).
2. Kritik Konstruktif: Fokus pada evaluasi kode dan solusi teknis, bukan pada individu. Berikan umpan balik yang membangun beserta saran perbaikan.
3. Keterbukaan dan Kolaborasi: Hormati sudut pandang dan pengalaman teknis kontributor lain. Hindari penggunaan bahasa yang terkesan patronizing atau tidak inklusif.
4. Resolusi Konflik: Jika terjadi perbedaan pendapat teknis, selesaikan melalui diskusi berbasis data, benchmark, atau pertimbangan arsitektur yang rasional.

## Alur Kerja dan Aturan Pull Request

### 1. Pelaporan Masalah (Issue)

Sebelum mulai menulis kode, pastikan untuk memeriksa daftar Issue yang ada atau membuat Issue baru:
- Bug Report: Sertakan langkah-langkah reproduksi masalah, hasil yang diharapkan, dan hasil aktual yang terjadi.
- Feature Request: Jelaskan latar belakang kebutuhan fitur, manfaat bagi proyek, dan usulan pendekatan implementasi.

### 2. Strategi Percabangan (Branching Strategy)

- Selalu buat cabangan (branch) baru dari cabang `main`.
- Gunakan penamaan cabang yang deskriptif dan konsisten dengan format:
  - `feat/nama-fitur` (untuk penambahan fitur baru)
  - `fix/deskripsi-perbaikan` (untuk perbaikan bug)
  - `docs/perubahan-dokumentasi` (untuk pembaruan dokumentasi)
  - `refactor/nama-komponen` (untuk pembenahan struktur kode)
  - `style/penyesuaian-tampilan` (untuk perubahan gaya/UI)

Contoh: `feat/integrasi-dark-mode`, `fix/navigasi-mobile`

### 3. Konvensi Pesan Commit (Commit Message Convention)

Gunakan format Conventional Commits agar riwayat perubahan mudah dilacak:

```text
<tipe>(<cakupan-opsional>): <deskripsi singkat>
```

Tipe commit yang diizinkan:
- `feat`: Penambahan fitur baru.
- `fix`: Perbaikan bug atau kesalahan program.
- `docs`: Pembaruan atau penambahan dokumentasi.
- `style`: Perubahan format kode, titik koma, atau penyesuaian CSS tanpa mengubah logika.
- `refactor`: Pengorganisasian ulang kode tanpa mengubah perilaku fitur.
- `test`: Penambahan atau pembaruan berkas pengujian.
- `chore`: Tugas rutin pemeliharaan proyek (pembaruan dependensi, konfigurasi build).

Contoh:
- `feat(ui): tambah widget AI chat berbasis Google Gemini`
- `fix(cms): perbaiki penanganan error saat token Contentful tidak valid`
- `docs: perbarui panduan instalasi di README.md`

### 4. Daftar Periksa Pull Request (PR Checklist)

Sebelum mengajukan Pull Request, pastikan Anda telah menyelesaikan hal-hal berikut:
1. Jalankan linter dan pastikan tidak ada kesalahan sintaks atau peringatan:
   ```bash
   npm run lint
   ```
2. Pastikan proses *build* berjalan tanpa masalah:
   ```bash
   npm run build
   ```
3. Uji perubahan secara lokal, baik pada mode terang maupun mode gelap.
4. Buat Pull Request yang ditujukan ke cabang `main`.
5. Isi templat deskripsi PR dengan mencantumkan:
   - Ringkasan perubahan yang dilakukan.
   - Referensi nomor Issue yang diselesaikan (misalnya: `Fixes #12`).
   - Tangkapan layar (*screenshot*) atau rekaman untuk perubahan tampilan UI.

## Standar Gaya Penulisan Kode (Coding Style)

Untuk menjaga konsistensi dan keterbacaan berkas dalam seluruh *codebase*, mohon patuhi standar berikut:

### 1. Struktur Komponen dan Modul React

- Gunakan Functional Components dengan React Hooks.
- Ekspor komponen menggunakan *named exports* atau *default export* secara konsisten sesuai struktur folder yang ada.
- Tempatkan komponen sesuai kategori struktur folder:
  - `src/components/layout/`: Komponen struktur tata letak (seperti Navbar dan Footer).
  - `src/components/sections/`: Bagian utama halaman (seperti Hero, Projects, Contact).
  - `src/components/ui/`: Komponen kecil yang dapat digunakan kembali (seperti Button, Card, Badge).
- Pisahkan logika pengambil data (API/CMS) ke dalam `services/` atau *custom hooks* di `hooks/`, hindari menulis panggilan API langsung di dalam komponen UI.

### 2. Penamaan Berkas dan Variabel

- PascalCase untuk berkas komponen React dan konteks (contoh: `ProjectCard.jsx`, `ThemeContext.jsx`).
- camelCase untuk berkas *utility*, *hooks*, *services*, dan instansiasi fungsi (contoh: `filterProjects.js`, `useCMSProjects.js`, `cmsClient.js`).
- UPPER_SNAKE_CASE untuk konstanta global atau variabel konfigurasi lingkungan (contoh: `VITE_CMS_TYPE`).

### 3. Penataan Gaya dengan Tailwind CSS

- Manfaatkan kelas utilitas Tailwind CSS untuk penataan gaya visual.
- Susun kelas Tailwind dengan urutan yang logis: tata letak (layout/positioning), ukuran (sizing), tipografi, warna, dan efek interaksi (hover/focus).
- Untuk kondisi dinamis atau penggabungan kelas, gunakan pendekatan perkondisian string yang rapi.

### 4. Penanganan State dan Prop Passing

- Gunakan React Context (`ThemeContext`) untuk *state* global yang diakses lintas komponen.
- Gunakan *state* lokal (`useState`) hanya untuk komponen yang membutuhkan kontrol internal.
- Lakukan destrukturisasi *props* di parameter fungsi komponen untuk kejelasan antarmuka komponen.

### 5. Linting dan Pengujian Kode

- Proyek ini menggunakan `oxlint` untuk menjaga kualitas dan kepatuhan aturan JavaScript/React.
- Pastikan kode Anda bersih dari *dead code*, `console.log` sisa pengembangan, dan variabel yang tidak digunakan sebelum mengajukan PR.

---

Dengan mengikuti pedoman ini, Anda membantu menjaga kualitas proyek tetap tinggi serta mempermudah proses peninjauan kode. Kami sangat menghargai kontribusi Anda!
