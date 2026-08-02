/**
 * Static fallback data for timeline section.
 * Used when CMS is unavailable or not configured.
 *
 * Shape: TimelineEntry[]
 * {
 *   id: string,
 *   type: 'education' | 'experience',
 *   institutionOrCompany: string,
 *   roleOrDegree: string,
 *   startDate: string,   // ISO 8601 or "YYYY-MM"
 *   endDate?: string,    // undefined means "Present"
 *   description: string,
 * }
 */

/** @type {Array<{id: string, type: 'education'|'experience', institutionOrCompany: string, roleOrDegree: string, startDate: string, endDate?: string, description: string}>} */
export const timeline = [
  {
    id: 'edu-001',
    type: 'education',
    institutionOrCompany: 'Bartin University',
    roleOrDegree: 'Undergraduate of Computer Science',
    startDate: '2023-09',
    endDate: undefined,
    description:
      'Aktif mengikuti berbagai kegiatan akademik dan non-akademik. Berhasil mendapatkan IPK 3.50 selama masa studi dan aktif dalam berbagai organisasi mahasiswa internasional.',
  },
  {
    id: 'exp-001',
    type: 'experience',
    institutionOrCompany: 'Digination Festival 2026',
    roleOrDegree: 'Chief of Organizing Committee',
    startDate: '2026-03',
    endDate: '2026-06',
    description:
      'Bertanggung jawab penuh atas pelaksanaan Digination Festival 2026, salah satu acara terbesar yang diselenggarakan oleh Himpunan Mahasiswa Ilmu Komputer. Mengelola tim yang terdiri dari 150+ panitia yang dibagi ke dalam 10 divisi berbeda, memastikan koordinasi yang mulus dan pencapaian target acara.',
  },
  {
    id: 'exp-002',
    type: 'experience',
    institutionOrCompany: 'PPI Bartin',
    roleOrDegree: 'UI/UX Designer',
    startDate: '2026-01',
    endDate: '2026-05',
    description:
      'Bertanggung jawab merancang antarmuka pengguna (UI) dan pengalaman pengguna (UX) untuk website resmi PPI Bartin, memastikan tampilan yang modern dan navigasi yang intuitif untuk anggota komunitas.',
  },
  {
    id: 'exp-003',
    type: 'experience',
    institutionOrCompany: 'PPI Dunia',
    roleOrDegree: 'Head of Division of Digital Inovation',
    startDate: '2025-10',
    endDate: undefined,
    description:
      'Bertanggung jawab penuh atas pengembangan dan pemeliharaan platform digital PPI Dunia, termasuk website resmi dan aplikasi mobile. ',
  },
];

export default timeline;
