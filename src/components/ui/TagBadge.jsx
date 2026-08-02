/**
 * TagBadge — renders a styled tag pill for project/blog tags.
 * @param {{ tag: string }} props
 */
const TagBadge = ({ tag }) => {
  return (
    <span className="inline-block bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-transparent dark:border-blue-800/40 text-sm font-medium px-2 py-1 rounded">
      {tag}
    </span>
  );
};

export default TagBadge;
