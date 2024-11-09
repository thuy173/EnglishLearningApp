import { useLocation } from 'react-router-dom';

export default function useCheckActiveNav() {
    const { pathname } = useLocation();

    const checkActiveNav = (nav: string) => {
        // Remove leading and trailing slashes for comparison
        const formattedNav = nav.replace(/^\/|\/$/g, '');
        const formattedPathname = pathname.replace(/^\/|\/$/g, '');

        // If root path ('/') is passed, check for exact match with pathname
        if (formattedNav === '') return formattedPathname === '';

        // Check if the current pathname starts with the provided nav
        return formattedPathname.startsWith(formattedNav);
    };

    return { checkActiveNav };
}
