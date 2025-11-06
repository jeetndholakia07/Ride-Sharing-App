import { useEffect, useState } from "react";

const useMediaQuery = (args: string) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia(args);
        setMatches(mediaQuery.matches);

        const handler = (event: any) => setMatches(event.matches);
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return matches;
}
export default useMediaQuery;