/**
 * Static fallback data for skills section.
 * Used when CMS is unavailable or not configured.
 *
 * Shape: SkillItem[]
 * {
 *   name: string,
 *   icon: string,    // React Icons component name (e.g., "SiReact")
 *   category: string // e.g., "Frontend", "Backend", "Tools"
 * }
 */

/** @type {Array<{name: string, icon: string, category: string}>} */
export const skills = [
  // Frontend
  { name: 'HTML5', icon: 'SiHtml5', category: 'Frontend' },
  { name: 'CSS3', icon: 'SiCss3', category: 'Frontend' },
  { name: 'JavaScript', icon: 'SiJavascript', category: 'Frontend' },

  // Backend
  { name: 'Python', icon: 'SiPython', category: 'Backend' },
  { name: 'Firebase', icon: 'SiFirebase', category: 'Backend' },

  // Tools
  { name: 'Figma', icon: 'SiFigma', category: 'Tools' },
  { name: 'Git', icon: 'SiGit', category: 'Tools' },
  { name: 'GitHub', icon: 'SiGithub', category: 'Tools' },
];

export default skills;
