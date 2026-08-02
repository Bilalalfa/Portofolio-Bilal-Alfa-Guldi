/**
 * Formats an ISO 8601 date string into a localized Indonesian date string.
 *
 * @param {string|null|undefined} isoString - An ISO 8601 date string (e.g., "2024-01-12" or "2024-01-12T00:00:00Z").
 * @returns {string} A formatted date string in Indonesian locale (e.g., "12 Januari 2024"),
 *                   or an empty string if the input is null/undefined/invalid.
 */
export function formatDate(isoString) {
  if (!isoString) {
    return '';
  }

  try {
    const date = new Date(isoString);

    // Check for invalid date (NaN)
    if (isNaN(date.getTime())) {
      return isoString;
    }

    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return isoString;
  }
}
