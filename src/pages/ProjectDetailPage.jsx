import { useParams, Link } from 'react-router-dom';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { useCMSProjects } from '../hooks/useCMSProjects';
import NotFoundPage from './NotFoundPage';
import SEOHead from '../components/ui/SEOHead';

// Must match the constant used elsewhere (e.g. HeroSection, NotFoundPage)
const OWNER_NAME = 'Bilal Alfa Guldi';

/**
 * ProjectDetailPage — renders the full details of a single project.
 *
 * Route: /projects/:slug
 *
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 12.1
 */
const ProjectDetailPage = () => {
  const { slug } = useParams();
  const { data: project, loading, error } = useCMSProjects(slug);

  // While fetching, show a minimal loading state
  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen" aria-busy="true">
        <p className="text-gray-500 text-lg">Loading project…</p>
      </main>
    );
  }

  // CMS returned null / project not found — or a fetch error occurred
  if (error || !project) {
    return <NotFoundPage />;
  }

  // Destructure only the fields we display
  const {
    title,
    award,
    shortDescription,
    detailedDescription,
    techStack = [],
    role,
    images = [],
    thumbnailImage,
    liveDemoUrl,
    sourceCodeUrl,
  } = project;

  // Render detailedDescription only if it's a non-empty string
  const descriptionText =
    typeof detailedDescription === 'string' && detailedDescription.trim()
      ? detailedDescription
      : null;

  // Determine whether the optional links should be shown
  const showLiveDemo =
    typeof liveDemoUrl === 'string' && liveDemoUrl.trim().length > 0;
  const showSourceCode =
    typeof sourceCodeUrl === 'string' && sourceCodeUrl.trim().length > 0;

  // Build the images list: lead with thumbnailImage if present, then the rest
  const allImages = [
    ...(thumbnailImage ? [thumbnailImage] : []),
    ...images.filter((img) => img?.url !== thumbnailImage?.url),
  ];

  return (
    <>
      <SEOHead
        title={`${title} — ${OWNER_NAME}`}
        description={shortDescription || ''}
      />

      {/* All content lives inside a single <main> for correct semantics */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 pb-16 pt-24 min-h-screen">
        {/* Back navigation */}
        <Link
          to="/#projects"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
        >
          ← Back to Projects
        </Link>

        {/* Hero / title */}
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">{title}</h1>

        {award && (
          <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-100 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-400/30 px-3 py-1 text-sm font-semibold text-amber-800 dark:text-amber-300">
            <span aria-hidden="true">🏆</span> {award}
          </p>
        )}

        {shortDescription && (
          <p className="mt-3 text-lg text-gray-600 dark:text-slate-300">{shortDescription}</p>
        )}

        {/* Screenshots / images */}
        {allImages.length > 0 && (
          <div className="mt-8 flex flex-col gap-6">
            {allImages.map((img, index) => (
              <div
                key={img.url || index}
                className="w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-slate-800 border border-gray-200/80 dark:border-slate-700/80 shadow-md transition-shadow hover:shadow-lg"
              >
                <img
                  src={img.url}
                  alt={img.alt || `Screenshot ${index + 1} of ${title}`}
                  loading="lazy"
                  width={img.width}
                  height={img.height}
                  className="w-full h-auto max-h-[600px] md:max-h-[750px] object-cover object-top"
                />
              </div>
            ))}
          </div>
        )}

        {/* Metadata: role */}
        {role && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400">
              Role
            </h2>
            <p className="mt-1 text-base text-gray-800 dark:text-slate-200">{role}</p>
          </div>
        )}

        {/* Tech stack */}
        {techStack.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400">
              Tech Stack
            </h2>
            <ul className="mt-2 flex flex-wrap gap-2" aria-label="Technologies used">
              {techStack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-indigo-100 dark:bg-indigo-950/70 border border-transparent dark:border-indigo-800/50 px-3 py-1 text-sm font-medium text-indigo-800 dark:text-indigo-300"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Detailed description */}
        {descriptionText && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400">
              Case Study
            </h2>
            <p className="mt-2 whitespace-pre-wrap text-base leading-relaxed text-gray-700 dark:text-slate-300">
              {descriptionText}
            </p>
          </div>
        )}

        {/* External links — only shown when available */}
        {(showLiveDemo || showSourceCode) && (
          <div className="mt-8 flex flex-wrap gap-4">
            {showLiveDemo && (
              <a
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 dark:bg-blue-600 text-white font-semibold px-5 py-2.5 text-sm shadow hover:bg-blue-700 dark:hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                <FiExternalLink className="w-4 h-4" />
                <span>{liveDemoUrl.includes('figma.com') ? 'View Prototype' : 'Live Demo'}</span>
              </a>
            )}
            {showSourceCode && (
              <a
                href={sourceCodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-slate-200 shadow hover:bg-gray-50 dark:hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700 transition-colors"
              >
                <div className="inline-flex items-center gap-2">
                  <FiGithub className="w-4 h-4" />
                  <span>Source Code</span>
                </div>
              </a>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default ProjectDetailPage;
