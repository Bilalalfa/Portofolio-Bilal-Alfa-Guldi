import AnimatedSection from '../ui/AnimatedSection';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/**
 * AboutSection — displays profile photo, biography, and CV download link.
 * Wrapped in AnimatedSection for scroll-triggered entrance animation.
 * Requirements: 3.1, 3.2, 3.3, 3.4
 */
const AboutSection = () => {
  return (
    <AnimatedSection id="about" variants={fadeInUp} className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          About Me
        </h2>

        {/* Two-column layout: photo left, bio right on desktop; stacked on mobile */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Profile photo — Requirement 3.1 */}
          <div className="flex-shrink-0">
            <img
              src="/personal-photo.webp"
              alt="Portrait photo of Bilal Alfa Guldi"
              width={300}
              height={300}
              className="rounded-2xl shadow-lg object-cover w-64 h-64 md:w-72 md:h-72 border border-gray-100 dark:border-slate-800"
              loading="lazy"
            />
          </div>

          {/* Biography and CV button — Requirements 3.1, 3.2, 3.3 */}
          <div className="flex flex-col gap-5 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-slate-100">
              Hi, I&apos;m Bilal 👋
            </h3>

            <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
              I&apos;m a Computer Science student at Bartın University, Türkiye, focused on UI/UX and mobile product design.
              I turn user research into clear flows, wireframes and high-fidelity Figma prototypes, and I can bring designs to
              life with Flutter. My work has won 3rd place at the Teknofest Creathon and 2nd place at the PPI Dunia UI/UX
              Design Competition, and I&apos;ve led student tech teams of up to 78 people. I speak Indonesian, Turkish and
              English, and I&apos;m currently looking for a UI/UX or product design internship.
            </p>

            {/* CV / Resume download link — opens in new tab (Requirements 3.2, 3.3) */}
            <div className="mt-2">
              <a
                href="/Bilal_Alfa_Guldi_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-600 dark:bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                Download CV / Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AboutSection;
