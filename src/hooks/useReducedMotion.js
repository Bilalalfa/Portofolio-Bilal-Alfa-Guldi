import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * Wrapper tipis atas Framer Motion's useReducedMotion().
 * Returns boolean; fallback ke false jika nilai undefined.
 * @returns {boolean}
 */
export const useReducedMotion = () => useFramerReducedMotion() ?? false;
