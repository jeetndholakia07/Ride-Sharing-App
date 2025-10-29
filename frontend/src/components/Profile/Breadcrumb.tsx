import { useLocation, Link } from "react-router-dom";

const formatPath = (segment: string) =>
  segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const Breadcrumb = () => {
  const { pathname } = useLocation();

  // Split the path and remove empty segments
  const segments = pathname.split("/").filter(Boolean);

  // Create an array of breadcrumb data
  const crumbs = segments.map((segment, index) => ({
    name: formatPath(segment),
    path: "/" + segments.slice(0, index + 1).join("/"),
    isLast: index === segments.length - 1,
  }));

  return (
    <nav
      className="text-sm text-gray-600 mb-6 overflow-hidden"
      aria-label="Breadcrumb"
    >
      <ol
        className="
          flex flex-wrap items-center gap-x-2 gap-y-1
          break-words whitespace-normal
        "
      >
        {/* Home Link */}
        <li className="flex items-center">
          <Link to="/" className="hover:underline text-gray-500 break-all">
            Home
          </Link>
        </li>

        {/* Dynamic segments */}
        {crumbs.map(({ name, path, isLast }) => (
          <li
            key={path}
            className="flex items-center space-x-2 text-gray-600 break-all"
          >
            <span className="text-gray-400">/</span>
            {isLast ? (
              <span className="text-gray-700 font-medium break-words">
                {name}
              </span>
            ) : (
              <Link
                to={path}
                className="hover:underline text-gray-500 break-words"
              >
                {name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;