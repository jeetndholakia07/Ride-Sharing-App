import { useLocation, Link } from 'react-router-dom';

const formatPath = (segment: string) => {
    return segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

const Breadcrumb = () => {
    const location = useLocation();
    const segments = location.pathname.split('/').filter(Boolean);

    return (
        <nav className="text-sm text-gray-600 mb-6">
            <ol className="flex items-center space-x-2">
                <li>
                    <Link to="/" className="hover:underline text-gray-500">
                        Home
                    </Link>
                </li>

                {segments.map((segment, index) => {
                    const path = '/' + segments.slice(0, index + 1).join('/');
                    const isLast = index === segments.length - 1;

                    return (
                        <li key={path} className="flex items-center space-x-2">
                            <span className="text-gray-400">/</span>
                            {isLast ? (
                                <span className="text-gray-700 font-medium">{formatPath(segment)}</span>
                            ) : (
                                <Link to={path} className="hover:underline text-gray-500">
                                    {formatPath(segment)}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
