/**
 * useCMSTimeline()
 *
 * Fetch semua timeline entries via fetchTimelineEntries().
 * Fallback ke data/timeline.js jika CMS mengembalikan [] atau error.
 *
 * Returns: { data, loading, error }
 *
 * Requirements: 10.1, 10.3
 */

import { useState, useEffect } from 'react';
import { fetchTimelineEntries } from '../services/cmsClient';
import fallbackTimeline from '../data/timeline';

/**
 * @returns {{ data: object[], loading: boolean, error: Error|null }}
 */
export function useCMSTimeline() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchTimelineEntries();

        if (!cancelled) {
          // Fallback ke data statis jika CMS mengembalikan array kosong
          if (!result || result.length === 0) {
            setData(fallbackTimeline);
          } else {
            setData(result);
          }
        }
      } catch (err) {
        // cmsClient tidak pernah throw, tapi sebagai safety net
        if (!cancelled) {
          setError(err);
          setData(fallbackTimeline);
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
  }, []);

  return { data, loading, error };
}

export default useCMSTimeline;
