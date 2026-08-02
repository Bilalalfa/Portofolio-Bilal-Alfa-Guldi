import { useParams, Link } from 'react-router-dom';
import { useCMSBlogPosts } from '../hooks/useCMSBlogPosts';
import NotFoundPage from './NotFoundPage';
import SEOHead from '../components/ui/SEOHead';
import { formatDate } from '../utils/formatDate';

/**
 * Renders rich text / Markdown content from a CMS in a simple way.
 * - If content is a plain string, render it as-is (preserving line breaks).
 * - If content is an object or array (Contentful rich text / Sanity portable text),
 *   render a placeholder until a proper renderer is integrated.
 */
function renderContent(content) {
  if (!content) return null;

  if (typeof content === 'string') {
    return (
      <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap">
        {content}
      </div>
    );
  }

  // Object or array — rich text from CMS (Contentful / Sanity)
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <p className="text-gray-500 italic">Rich text content from CMS</p>
    </div>
  );
}

/**
 * BlogDetailPage — displays a single blog article fetched from the CMS.
 *
 * Route: /blog/:slug
 * Requirements: 7.3, 7.4, 7.5, 7.6, 12.1
 */
const BlogDetailPage = () => {
  const { slug } = useParams();
  const { data: post, loading } = useCMSBlogPosts(slug);

  // While fetching, show a loading state
  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500" aria-live="polite">
          Memuat artikel...
        </p>
      </main>
    );
  }

  // CMS returned null / post not found
  if (!post) {
    return <NotFoundPage />;
  }

  const ownerName = 'Your Name';
  const seoTitle = `${post.title} — Blog ${ownerName}`;

  return (
    <>
      <SEOHead title={seoTitle} description={post.excerpt} />

      <main className="min-h-screen bg-white dark:bg-gray-900">
        <article className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            to="/#blog"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 mb-8 transition-colors"
          >
            ← Kembali ke Blog
          </Link>

          {/* Cover image */}
          {post.coverImage && (
            <img
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              loading="lazy"
              width={post.coverImage.width}
              height={post.coverImage.height}
              className="w-full rounded-xl object-cover mb-8 max-h-96"
            />
          )}

          {/* Article title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {post.title}
          </h1>

          {/* Meta: date + author */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
            {post.publishedDate && (
              <time dateTime={post.publishedDate}>
                {formatDate(post.publishedDate)}
              </time>
            )}
            {post.publishedDate && post.author && (
              <span aria-hidden="true">·</span>
            )}
            {post.author && (
              <span>
                Oleh <span className="font-medium text-gray-700 dark:text-gray-300">{post.author}</span>
              </span>
            )}
          </div>

          {/* Article content */}
          <section aria-label="Isi artikel">
            {renderContent(post.content)}
          </section>
        </article>
      </main>
    </>
  );
};

export default BlogDetailPage;
