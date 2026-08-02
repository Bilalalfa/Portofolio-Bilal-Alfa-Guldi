import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Owner info — update these values as needed
const OWNER_NAME = 'Bilal Alfa Guldi';
const TAGLINE = 'UI/UX Designer & Front-end Developer';
const CTA_LABEL = 'View My Projects';
const CTA_TARGET = '#projects';

/**
 * Hero animation variants for staggered entrance.
 * Each element fades in and slides down from y: -20.
 */
const heroVariants = {
  name: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } },
  },
  tagline: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5 } },
  },
  cta: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.5 } },
  },
};

/**
 * HeroSection — full-viewport hero with name, tagline, and CTA.
 * Supports prefers-reduced-motion: animations are disabled when active.
 */
const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();

  /**
   * Smooth-scroll to the target section.
   * Falls back gracefully if the element is not found.
   */
  const handleCTAClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(CTA_TARGET);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // When reduced motion is preferred, skip all animation variants
  const getVariant = (key) => (shouldReduceMotion ? {} : heroVariants[key]);
  const initialState = shouldReduceMotion ? false : 'hidden';

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-white"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/home-bg.png"
          alt="Hero Background"
          className="h-full w-full object-cover object-center"
        />
        {/* Subtle Overlay to ensure high contrast & readability */}
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />
      </div>

      {/* Decorative blurred circles for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 z-0 h-96 w-96 rounded-full bg-indigo-500 opacity-20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 z-0 h-96 w-96 rounded-full bg-blue-400 opacity-20 blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
        <motion.h1
          className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
          variants={getVariant('name')}
          initial={initialState}
          animate="visible"
        >
          {OWNER_NAME}
        </motion.h1>

        <motion.p
          className="mt-4 text-lg font-medium text-indigo-200 sm:text-xl md:text-2xl"
          variants={getVariant('tagline')}
          initial={initialState}
          animate="visible"
        >
          {TAGLINE}
        </motion.p>

        <motion.div
          className="mt-8"
          variants={getVariant('cta')}
          initial={initialState}
          animate="visible"
        >
          <a
            href={CTA_TARGET}
            onClick={handleCTAClick}
            className="inline-block rounded-full bg-white px-8 py-3 text-base font-semibold text-indigo-900 shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {CTA_LABEL}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
