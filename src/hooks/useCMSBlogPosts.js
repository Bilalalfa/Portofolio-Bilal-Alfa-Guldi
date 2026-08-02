/**
 * useCMSBlogPosts(slug?)
 *
 * Jika slug diberikan: fetch satu blog post via fetchBlogPostBySlug(slug)
 * Jika tidak: fetch semua blog posts via fetchBlogPosts()
 *
 * Returns: { data, loading, error }
 *
 * Requirements: 10.1, 10.3
 */

import { useState, useEffect } from 'react';
import { fetchBlogPosts, fetchBlogPostBySlug } from '../services/cmsClient';

/**
 * @param {string} [slug] - Slug blog post yang ingin di-fetch. Jika tidak diberikan, fetch semua.
 * @returns {{ data: object[]|object|null, loading: boolean, error: Error|null }}
 */
export function useCMSBlogPosts(slug) {
  const [data, setData] = useState(slug ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = slug
          ? await fetchBlogPostBySlug(slug)
          : await fetchBlogPosts();

        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        // cmsClient tidak pernah throw, tapi sebagai safety net
        if (!cancelled) {
          setError(err);
          setData(slug ? null : []);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { data, loading, error };
}

export default useCMSBlogPosts;
