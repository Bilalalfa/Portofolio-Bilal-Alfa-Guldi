/**
 * TagBadge — renders a styled tag pill for project/blog tags.
 * @param {{ tag: string }} props
 */
const TagBadge = ({ tag }) => {
  return (
    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
      {tag}
    </span>
  );
};

export default TagBadge;
