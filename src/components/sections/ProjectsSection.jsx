import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';
import ProjectCard from '../ui/ProjectCard';
import { useCMSProjects } from '../../hooks/useCMSProjects';
import { filterProjects } from '../../utils/filterProjects';

// Scroll-triggered entrance for the section wrapper
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Stagger container for the grid
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// Individual card animation
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/**
 * FilterBar — renders "All" + one button per unique tag.
 *
 * @param {{ tags: string[], activeTag: string|null, onFilter: (tag: string|null) => void }} props
 */
function FilterBar({ tags, activeTag, onFilter }) {
  const baseClass =
    'px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';
  const activeClass = 'bg-indigo-600 text-white shadow-sm';
  const inactiveClass =
    'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700';

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8" role="group" aria-label="Filter proyek berdasarkan tag">
      <button
        className={`${baseClass} ${activeTag === null ? activeClass : inactiveClass}`}
        onClick={() => onFilter(null)}
        aria-pressed={activeTag === null}
      >
        Semua
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          className={`${baseClass} ${activeTag === tag ? activeClass : inactiveClass}`}
          onClick={() => onFilter(tag)}
          aria-pressed={activeTag === tag}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

/**
 * ProjectsSection — displays CMS projects in a filterable, animated grid.
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5
 */
function ProjectsSection() {
  const { data: projects, loading } = useCMSProjects();
  const [activeTag, setActiveTag] = useState(null);

  // Derive unique tags from all projects
  const allTags = useMemo(() => {
    if (!projects || projects.length === 0) return [];
    const tagSet = new Set();
    projects.forEach((project) => {
      (project.tags ?? []).forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [projects]);

  const filteredProjects = useMemo(
    () => filterProjects(projects ?? [], activeTag),
    [projects, activeTag],
  );

  return (
    <AnimatedSection id="projects" variants={fadeInUp} className="py-20 px-4 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Proyek
        </h2>
        <p className="text-center text-gray-600 dark:text-slate-400 mb-10">
          Kumpulan proyek yang pernah saya kerjakan.
        </p>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-20" aria-live="polite">
            <span className="text-gray-500 dark:text-slate-400 text-sm">Memuat proyek…</span>
          </div>
        )}

        {/* Loaded state */}
        {!loading && (
          <>
            {/* Filter bar — only shown when there are tags */}
            {allTags.length > 0 && (
              <FilterBar tags={allTags} activeTag={activeTag} onFilter={setActiveTag} />
            )}

            {/* Empty state */}
            {filteredProjects.length === 0 && (
              <p className="text-center text-gray-500 dark:text-slate-400 py-16" aria-live="polite">
                Tidak ada proyek yang ditemukan.
              </p>
            )}

            {/* Project grid with stagger animation */}
            {filteredProjects.length > 0 && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, i) => (
                    <motion.div
                      key={project.slug}
                      variants={staggerItem}
                      custom={i}
                      layout
                      className="h-full flex flex-col"
                      exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}
      </div>
    </AnimatedSection>
  );
}

export default ProjectsSection;
