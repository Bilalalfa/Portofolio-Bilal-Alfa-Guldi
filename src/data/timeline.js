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
    institutionOrCompany: 'Bartın University, Türkiye',
    roleOrDegree: 'B.Sc. Computer Technology and Information Systems',
    startDate: '2023-09',
    endDate: undefined,
    description:
      'Expected graduation: July 2027. Relevant coursework: UI/UX Design, Human–Computer Interaction, Visual Programming and Software Engineering. Two-time UI/UX competition winner: 3rd place at the Teknofest Creathon and 2nd place at the PPI Dunia UI/UX Design Competition.',
  },
  {
    id: 'exp-001',
    type: 'experience',
    institutionOrCompany: 'Digination Festival 2026 · PPI Dunia',
    roleOrDegree: 'Chief Executive',
    startDate: '2026-03',
    endDate: '2026-06',
    description:
      "Led a 78-member committee and 6 division heads to deliver one of PPI Dunia's largest student-led technology events. Organized a national IoT Innovation Competition with 21 teams and technology webinars attended by 300+ participants, managing planning, stakeholder relations and operations end to end.",
  },
  {
    id: 'exp-002',
    type: 'experience',
    institutionOrCompany: 'PPI Bartın',
    roleOrDegree: 'UI/UX Designer — Official Website',
    startDate: '2026-01',
    endDate: '2026-05',
    description:
      "Designed the UX/UI and information architecture of PPI Bartın's official website, iterating on the design through reviews and feedback from developers and users.",
  },
  {
    id: 'exp-003',
    type: 'experience',
    institutionOrCompany: 'Directorate of Communication & Information · PPI Dunia',
    roleOrDegree: 'Head of Digital Innovation Subdivision',
    startDate: '2025-11',
    endDate: '2026-07',
    description:
      'Planned innovation programs and designed competition and webinar concepts on emerging technologies. Prepared competition frameworks, judging criteria and technical guidelines, and built connections with practitioners, mentors and speakers.',
  },
  {
    id: 'exp-004',
    type: 'experience',
    institutionOrCompany: 'PPI Bartın',
    roleOrDegree: 'Head of Creative Media',
    startDate: '2024-04',
    endDate: '2025-03',
    description:
      "Led the content, design and social media teams, growing Instagram and TikTok reach through data-driven content strategy. Launched PPI Bartın's first official LinkedIn page and kept branding consistent across channels.",
  },
];

export default timeline;
