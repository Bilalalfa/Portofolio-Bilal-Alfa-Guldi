import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

/**
 * BlogCard component — displays a blog post preview card.
 *
 * @param {{ post: {
 *   slug: string,
 *   title: string,
 *   excerpt: string,
 *   coverImage: { url: string, alt: string } | null,
 *   publishedDate: string
 * }}} props
 */
function BlogCard({ post }) {
  const { slug, title, excerpt, coverImage, publishedDate } = post;

  return (
    <article className="flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 shadow-md hover:shadow-xl dark:shadow-slate-950/50 transition-all duration-300">
      {/* Cover Image */}
      <div className="relative w-full aspect-video bg-gray-100 dark:bg-slate-800">
        {coverImage ? (
          <img
            src={coverImage.url}
            alt={coverImage.alt || title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-slate-500 text-sm"
            aria-label={`Cover untuk ${title}`}
          >
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-2">
        {/* Date */}
        <time
          dateTime={publishedDate}
          className="text-xs text-gray-500 dark:text-slate-400 font-medium uppercase tracking-wide"
        >
          {formatDate(publishedDate)}
        </time>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-snug">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed flex-1 line-clamp-3">
          {excerpt}
        </p>

        {/* Read more link */}
        <Link
          to={`/blog/${slug}`}
          className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200"
        >
          Baca Selengkapnya
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export default BlogCard;
