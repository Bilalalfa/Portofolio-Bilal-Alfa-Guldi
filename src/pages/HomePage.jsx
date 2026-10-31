import SEOHead from '../components/ui/SEOHead';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/sections/SkillsSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import TimelineSection from '../components/sections/TimelineSection';
import ContactSection from '../components/sections/ContactSection';

/**
 * HomePage — renders all portfolio sections in order within a semantic <main> element.
 * Includes SEO metadata unique to the home page.
 * Requirements: 1.1, 12.1
 */
const HomePage = () => (
  <>
    <SEOHead
      title="Bilal Alfa Guldi — UI/UX Designer"
      description="Bilal Alfa Guldi — UI/UX Designer & Flutter Developer. Award-winning UI/UX projects, case studies and experience. Open to internships."
    />
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TimelineSection />
      <SkillsSection />
      <ContactSection />
    </main>
  </>
);

export default HomePage;
