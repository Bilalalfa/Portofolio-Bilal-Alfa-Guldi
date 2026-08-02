import { motion } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';
import SkillItem from '../ui/SkillItem';
import skills from '../../data/skills';

/**
 * Framer Motion variants for the skills grid container.
 * Staggers the entrance of each child skill item.
 */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/**
 * Framer Motion variants for each individual skill item.
 */
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Fade-in-up variant for the section wrapper (used by AnimatedSection).
 */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/**
 * Groups a flat array of skill objects by their `category` field.
 * @param {Array<{name: string, icon: string, category: string}>} skillsArray
 * @returns {Array<{name: string, skills: Array<{name: string, icon: string}>}>}
 */
const groupByCategory = (skillsArray) => {
  const grouped = skillsArray.reduce((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return Object.entries(grouped).map(([name, skillList]) => ({
    name,
    skills: skillList,
  }));
};

/**
 * SkillsSection — displays skills grouped by category with stagger animations.
 * Data sourced from the static fallback `data/skills.js`.
 * Wrapped in AnimatedSection for scroll-triggered entrance.
 */
const SkillsSection = () => {
  const skillCategories = groupByCategory(skills);

  return (
    <AnimatedSection id="skills" variants={fadeInUp} className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Skills</h2>

        <div className="space-y-10">
          {skillCategories.map((category) => (
            <div key={category.name}>
              <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">
                {category.name}
              </h3>

              <motion.div
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {category.skills.map((skill) => (
                  <motion.div key={skill.name} variants={staggerItem}>
                    <SkillItem icon={skill.icon} name={skill.name} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default SkillsSection;
