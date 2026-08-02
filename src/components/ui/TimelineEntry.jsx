import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';

/**
 * Formats a "YYYY-MM" string into "MM/YYYY".
 * Returns the original string if it doesn't match the expected format.
 *
 * @param {string} dateStr - A date string in "YYYY-MM" format.
 * @returns {string}
 */
function formatMonthYear(dateStr) {
  if (!dateStr) return '';
  const match = dateStr.match(/^(\d{4})-(\d{2})$/);
  if (!match) return dateStr;
  const [, year, month] = match;
  return `${month}/${year}`;
}

/**
 * TimelineEntry — renders a single timeline item for education or experience.
 *
 * @param {{
 *   id: string,
 *   type: 'education' | 'experience',
 *   institutionOrCompany: string,
 *   roleOrDegree: string,
 *   startDate: string,
 *   endDate?: string,
 *   description: string,
 * }} props
 */
const TimelineEntry = ({
  type,
  institutionOrCompany,
  roleOrDegree,
  startDate,
  endDate,
  description,
}) => {
  const isEducation = type === 'education';

  const duration = `${formatMonthYear(startDate)} – ${endDate ? formatMonthYear(endDate) : 'Present'}`;

  return (
    <div className="flex gap-4">
      {/* Icon + vertical line */}
      <div className="flex flex-col items-center">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${
            isEducation
              ? 'bg-purple-100 text-purple-700'
              : 'bg-blue-100 text-blue-700'
          }`}
          aria-hidden="true"
        >
          {isEducation ? (
            <FaGraduationCap size={18} />
          ) : (
            <FaBriefcase size={18} />
          )}
        </div>
        {/* Connector line — purely decorative */}
        <div className="w-px flex-1 bg-gray-200 mt-2" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="pb-8 min-w-0">
        {/* Type badge */}
        <span
          className={`inline-block text-xs font-semibold px-2 py-0.5 rounded mb-2 ${
            isEducation
              ? 'bg-purple-100 text-purple-700'
              : 'bg-blue-100 text-blue-700'
          }`}
        >
          {isEducation ? 'Education' : 'Experience'}
        </span>

        {/* Role / Degree */}
        <h3 className="text-base font-semibold text-gray-900 leading-snug">
          {roleOrDegree}
        </h3>

        {/* Institution / Company */}
        <p className="text-sm font-medium text-gray-600 mt-0.5">
          {institutionOrCompany}
        </p>

        {/* Duration */}
        <p className="text-xs text-gray-500 mt-1">{duration}</p>

        {/* Description */}
        <p className="text-sm text-gray-700 mt-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TimelineEntry;
