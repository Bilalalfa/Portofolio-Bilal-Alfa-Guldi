import { motion } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';
import BlogCard from '../ui/BlogCard';
import { useCMSBlogPosts } from '../../hooks/useCMSBlogPosts';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/**
 * BlogSection — displays a list of blog post preview cards fetched from CMS.
 * Wraps content in AnimatedSection for scroll-triggered entrance animation.
 * Each BlogCard links to /blog/${slug}.
 *
 * Requirements: 7.1, 7.2
 */
function BlogSection() {
  const { data: posts, loading } = useCMSBlogPosts();

  return (
    <AnimatedSection id="blog" variants={fadeInUp} className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Blog</h2>
        <p className="text-gray-500 dark:text-slate-400 mb-10">Latest articles and writing</p>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20" aria-live="polite" aria-label="Loading articles">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {/* Error / Empty state */}
        {!loading && (!posts || posts.length === 0) && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No articles yet.</p>
          </div>
        )}

        {/* Blog cards grid with stagger animation */}
        {!loading && posts && posts.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {posts.map((post) => (
              <motion.div key={post.slug} variants={staggerItem}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </AnimatedSection>
  );
}

export default BlogSection;
