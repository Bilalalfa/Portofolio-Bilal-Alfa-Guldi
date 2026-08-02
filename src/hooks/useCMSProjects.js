/**
 * useCMSProjects(slug?)
 *
 * Jika slug diberikan: fetch satu project via fetchProjectBySlug(slug)
 * Jika tidak: fetch semua projects via fetchProjects()
 *
 * Returns: { data, loading, error }
 *
 * Requirements: 10.1, 10.3
 */

import { useState, useEffect } from 'react';
import { fetchProjects, fetchProjectBySlug } from '../services/cmsClient';
import fallbackProjects from '../data/projects';

/**
 * @param {string} [slug] - Slug proyek yang ingin di-fetch. Jika tidak diberikan, fetch semua.
 * @returns {{ data: object[]|object|null, loading: boolean, error: Error|null }}
 */
export function useCMSProjects(slug) {
  const [data, setData] = useState(slug ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        if (slug) {
          const result = await fetchProjectBySlug(slug);
          if (!cancelled) {
            const finalData =
              result ?? fallbackProjects.find((p) => p.slug === slug) ?? null;
            setData(finalData);
          }
        } else {
          const result = await fetchProjects();
          if (!cancelled) {
            const finalData =
              result && result.length > 0 ? result : fallbackProjects;
            setData(finalData);
          }
        }
      } catch (err) {
        // cmsClient tidak pernah throw, tapi sebagai safety net
        if (!cancelled) {
          setError(err);
          if (slug) {
            setData(fallbackProjects.find((p) => p.slug === slug) ?? null);
          } else {
            setData(fallbackProjects);
          }
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

export default useCMSProjects;
