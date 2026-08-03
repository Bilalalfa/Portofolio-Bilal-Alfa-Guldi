import * as SiIcons from 'react-icons/si';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

const ICON_ALIASES = {
  SiCss3: 'SiCss',
  FaCss3: 'SiCss',
  FaCss3Alt: 'SiCss',
};

/**
 * Dynamically resolves a react-icons icon component by name.
 * Searches si (Simple Icons), fa (Font Awesome), and md (Material Design) icon sets.
 * @param {string} iconName - e.g. "SiReact", "FaNodeJs", "MdCode"
 * @returns {React.ComponentType|null}
 */
const resolveIcon = (iconName) => {
  if (!iconName) return null;
  const name = ICON_ALIASES[iconName] || iconName;
  return (
    SiIcons[name] ||
    FaIcons[name] ||
    MdIcons[name] ||
    null
  );
};

/**
 * SkillItem — renders a skill icon (from react-icons) and its label.
 * @param {{ icon: string, name: string }} props
 *   icon — icon component name string, e.g. "SiReact"
 *   name — display label for the skill
 */
const SkillItem = ({ icon, name }) => {
  const IconComponent = resolveIcon(icon);

  return (
    <div className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 shadow-sm hover:border-indigo-500/40 dark:hover:border-indigo-500/40 hover:shadow-md transition-all duration-200">
      {IconComponent ? (
        <IconComponent className="text-3xl text-gray-700 dark:text-slate-200" aria-hidden="true" />
      ) : (
        <span className="text-3xl text-gray-400 dark:text-slate-500" aria-hidden="true">?</span>
      )}
      <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-slate-300 text-center">{name}</span>
    </div>
  );
};

export default SkillItem;
