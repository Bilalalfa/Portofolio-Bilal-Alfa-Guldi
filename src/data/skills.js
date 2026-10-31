/**
 * Static fallback data for skills section.
 * Used when CMS is unavailable or not configured.
 *
 * Shape: SkillItem[]
 * {
 *   name: string,
 *   icon: string,    // React Icons component name (e.g., "SiReact")
 *   category: string // e.g., "Design", "Mobile", "Web", "Tools"
 * }
 */

/** @type {Array<{name: string, icon: string, category: string}>} */
export const skills = [
  // Design
  { name: 'Figma', icon: 'SiFigma', category: 'UI/UX Design' },
  { name: 'User Research', icon: 'MdPersonSearch', category: 'UI/UX Design' },
  { name: 'Wireframing', icon: 'MdDashboardCustomize', category: 'UI/UX Design' },
  { name: 'Prototyping', icon: 'MdTouchApp', category: 'UI/UX Design' },
  { name: 'Design Systems', icon: 'MdViewQuilt', category: 'UI/UX Design' },
  { name: 'Usability Testing', icon: 'MdFactCheck', category: 'UI/UX Design' },

  // Mobile
  { name: 'Flutter', icon: 'SiFlutter', category: 'Mobile' },
  { name: 'Dart', icon: 'SiDart', category: 'Mobile' },
  { name: 'Firebase', icon: 'SiFirebase', category: 'Mobile' },

  // Web & Programming
  { name: 'HTML5', icon: 'SiHtml5', category: 'Web & Programming' },
  { name: 'CSS3', icon: 'SiCss', category: 'Web & Programming' },
  { name: 'JavaScript', icon: 'SiJavascript', category: 'Web & Programming' },
  { name: 'Python', icon: 'SiPython', category: 'Web & Programming' },

  // Tools
  { name: 'Git', icon: 'SiGit', category: 'Tools' },
  { name: 'GitHub', icon: 'SiGithub', category: 'Tools' },
];

export default skills;
