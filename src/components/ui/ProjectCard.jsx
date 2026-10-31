import { Link } from 'react-router-dom';
import TagBadge from './TagBadge';

/**
 * ProjectCard component — displays a project summary card.
 *
 * @param {{ project: {
 *   slug: string,
 *   title: string,
 *   shortDescription: string,
 *   tags: string[],
 *   thumbnailImage: { url: string, alt: string } | null
 * }}} props
 */
function ProjectCard({ project }) {
  const { slug, title, award, shortDescription, tags = [], thumbnailImage } = project;

  return (
    <article className="flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 shadow-md hover:shadow-xl dark:shadow-slate-950/50 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video bg-gray-100 dark:bg-slate-800">
        {thumbnailImage ? (
          <img
            src={thumbnailImage.url}
            alt={thumbnailImage.alt || title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-slate-500 text-sm"
            aria-label={`Thumbnail for ${title}`}
          >
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {award && (
          <span className="self-start inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-400/30 px-2.5 py-0.5 text-xs font-semibold text-amber-800 dark:text-amber-300">
            <span aria-hidden="true">🏆</span> {award}
          </span>
        )}

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-snug">
          {title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed flex-1">
          {shortDescription}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}

        {/* CTA Link */}
        <Link
          to={`/projects/${slug}`}
          className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200"
        >
          View Details
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export default ProjectCard;
