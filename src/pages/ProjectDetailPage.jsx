import { useParams, Link } from 'react-router-dom';
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
        <p className="text-gray-500 text-lg">Memuat data proyek…</p>
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
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-8">
        {/* Back navigation */}
        <Link
          to="/#projects"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
        >
          ← Kembali ke Proyek
        </Link>

        {/* Hero / title */}
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">{title}</h1>

        {shortDescription && (
          <p className="mt-3 text-lg text-gray-600">{shortDescription}</p>
        )}

        {/* Screenshots / images */}
        {allImages.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {allImages.map((img, index) => (
              <img
                key={img.url || index}
                src={img.url}
                alt={img.alt || `Screenshot ${index + 1} dari ${title}`}
                loading="lazy"
                width={img.width}
                height={img.height}
                className="w-full rounded-lg object-cover shadow"
              />
            ))}
          </div>
        )}

        {/* Metadata: role */}
        {role && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Peran
            </h2>
            <p className="mt-1 text-base text-gray-800">{role}</p>
          </div>
        )}

        {/* Tech stack */}
        {techStack.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Tech Stack
            </h2>
            <ul className="mt-2 flex flex-wrap gap-2" aria-label="Daftar teknologi yang digunakan">
              {techStack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800"
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
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Deskripsi
            </h2>
            <p className="mt-2 whitespace-pre-wrap text-base leading-relaxed text-gray-700">
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
                className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                Live Demo ↗
              </a>
            )}
            {showSourceCode && (
              <a
                href={sourceCodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700 transition-colors"
              >
                Source Code ↗
              </a>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default ProjectDetailPage;
