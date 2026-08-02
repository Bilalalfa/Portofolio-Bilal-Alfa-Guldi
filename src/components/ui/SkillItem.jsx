import * as SiIcons from 'react-icons/si';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

/**
 * Dynamically resolves a react-icons icon component by name.
 * Searches si (Simple Icons), fa (Font Awesome), and md (Material Design) icon sets.
 * @param {string} iconName - e.g. "SiReact", "FaNodeJs", "MdCode"
 * @returns {React.ComponentType|null}
 */
const resolveIcon = (iconName) => {
  if (!iconName) return null;
  return (
    SiIcons[iconName] ||
    FaIcons[iconName] ||
    MdIcons[iconName] ||
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
    <div className="flex flex-col items-center gap-1 p-2">
      {IconComponent ? (
        <IconComponent className="text-3xl text-gray-700" aria-hidden="true" />
      ) : (
        <span className="text-3xl text-gray-400" aria-hidden="true">?</span>
      )}
      <span className="text-sm text-gray-600 text-center">{name}</span>
    </div>
  );
};

export default SkillItem;
