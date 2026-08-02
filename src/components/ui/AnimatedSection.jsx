import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * AnimatedSection — reusable scroll-triggered animation wrapper.
 * Respects the OS-level `prefers-reduced-motion` setting:
 * when reduced motion is preferred, animations are fully disabled.
 *
 * @param {{ children: React.ReactNode, variants: object, className?: string }} props
 */
const AnimatedSection = ({ children, variants, ...props }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? false : 'visible'}
      viewport={{ once: true }}
      variants={shouldReduceMotion ? {} : variants}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
