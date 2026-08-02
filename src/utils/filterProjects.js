/**
 * Filters an array of projects by a given tag.
 *
 * @param {Array} projects - Array of Project objects, each with a `tags: string[]` field.
 * @param {string|null|undefined} activeTag - The tag to filter by.
 * @returns {Array} All projects if activeTag is null/undefined/empty, otherwise only
 *                  projects that include the activeTag in their tags array.
 */
export function filterProjects(projects, activeTag) {
  if (!activeTag || activeTag.trim() === '') {
    return projects;
  }

  return projects.filter((project) => project.tags.includes(activeTag));
}
