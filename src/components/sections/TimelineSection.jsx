import { motion } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';
import TimelineEntry from '../ui/TimelineEntry';
import { useCMSTimeline } from '../../hooks/useCMSTimeline';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/**
 * TimelineSection — displays education and experience entries in reverse
 * chronological order. Fetches from CMS via useCMSTimeline() with automatic
 * fallback to data/timeline.js when CMS is unavailable.
 *
 * Requirements: 8.1, 8.2, 8.3, 8.4, 8.5
 */
function TimelineSection() {
  const { data: entries, loading } = useCMSTimeline();

  // Sort entries in reverse chronological order (newest startDate first).
  // "YYYY-MM" strings compare correctly using localeCompare.
  const sortedEntries = [...entries].sort((a, b) =>
    b.startDate.localeCompare(a.startDate)
  );

  return (
    <AnimatedSection
      id="timeline"
      variants={fadeInUp}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section heading */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Pendidikan &amp; Pengalaman
        </h2>
        <p className="text-gray-500 dark:text-slate-400 mb-10">
          Perjalanan akademik dan profesional saya
        </p>

        {/* Loading state */}
        {loading && (
          <div
            className="flex items-center justify-center py-20"
            aria-live="polite"
            aria-label="Memuat timeline"
          >
            <div
              className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"
              role="status"
            >
              <span className="sr-only">Memuat...</span>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && sortedEntries.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">Belum ada data timeline yang tersedia.</p>
          </div>
        )}

        {/* Timeline list with sequential stagger animation */}
        {!loading && sortedEntries.length > 0 && (
          <motion.ul
            className="list-none"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {sortedEntries.map((entry) => (
              <motion.li key={entry.id} variants={staggerItem}>
                <TimelineEntry
                  id={entry.id}
                  type={entry.type}
                  institutionOrCompany={entry.institutionOrCompany}
                  roleOrDegree={entry.roleOrDegree}
                  startDate={entry.startDate}
                  endDate={entry.endDate}
                  description={entry.description}
                />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </AnimatedSection>
  );
}

export default TimelineSection;
