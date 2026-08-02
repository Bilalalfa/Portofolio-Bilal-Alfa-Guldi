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
    roleOrDegree: 'Computer Science Student',
    startDate: '2023-09',
    endDate: undefined,
    description:
      'Aktif mengikuti berbagai kegiatan akademik dan non-akademik, termasuk organisasi mahasiswa internasional, serta beberapa kompetisi UI/UX Design yang diselenggarakan oleh institusi di luar perkuliahan.',
  },
  {
    id: 'exp-001',
    type: 'experience',
    institutionOrCompany: 'Digination Festival 2026',
    roleOrDegree: 'Chief of Organizing Committee',
    startDate: '2026-03',
    endDate: '2026-06',
    description:
      'Bertanggung jawab penuh atas pelaksanaan Digination Festival 2026, salah satu acara terbesar yang diselenggarakan oleh Direktorat Komunikasi dan Informasi PPI Dunia. Memimpin tim yang terdiri dari 65+ panitia yang terbagi ke dalam 7 divisi, dengan mengangkat tema IoT dan teknologi, serta menyelenggarakan rangkaian perlombaan dan webinar bersama pembicara yang ahli di bidangnya.',
  },
  {
    id: 'exp-002',
    type: 'experience',
    institutionOrCompany: 'PPI Bartin',
    roleOrDegree: 'UI/UX Designer',
    startDate: '2026-01',
    endDate: '2026-05',
    description:
      'Merancang antarmuka pengguna (UI) dan pengalaman pengguna (UX) untuk website resmi PPI Bartin, memastikan tampilan yang modern dan navigasi yang mudah digunakan.',
  },
  {
    id: 'exp-003',
    type: 'experience',
    institutionOrCompany: 'PPI Dunia',
    roleOrDegree: 'Head of Division of Digital Inovation',
    startDate: '2025-10',
    endDate: undefined,
    description:
      'Bertanggung jawab atas pelaksanaan program kerja Divisi Inovasi Digital, meliputi penyelenggaraan Digination Festival hingga pengelolaan berbagai platform digital PPI Dunia.',
  },
];

export default timeline;
