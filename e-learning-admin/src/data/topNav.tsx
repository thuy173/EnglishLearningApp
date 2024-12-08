import { BlocksIcon, ChartNoAxesColumn, HomeIcon, ShapesIcon, UsersIcon, WholeWordIcon } from "lucide-react";

export interface MenuObj {
    title: string;
    icon: JSX.Element;
    href: string;
    children?: MenuObj[];
    external?: boolean;
}

export const topNavs: MenuObj[] = [
    {
        title: 'Dashboard',
        icon: <HomeIcon size={18} />,
        href: '/'
    },
    {
        title: 'Users',
        icon: <UsersIcon size={18} />,
        href: '/users'
    },
    {
        title: 'Categories',
        icon: <BlocksIcon size={18} />,
        href: '/categories'
    },
    {
        title: 'Levels',
        icon: <ChartNoAxesColumn size={18} />,
        href: '/levels'
    },
    {
        title: 'Courses',
        icon: <ShapesIcon size={18} />,
        href: '/courses'
    },
    {
        title: 'Vocabularies',
        icon: <WholeWordIcon size={18} />,
        href: '/vocabularies'
    },
]
