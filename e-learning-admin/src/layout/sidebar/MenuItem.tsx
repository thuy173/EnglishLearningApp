import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MenuObj } from '@/data/topNav';
import useCheckActiveNav from '@/hooks/useCheckActiveNav';
import { cn } from '@/lib/utils';
import React from 'react'
import { NavLink } from 'react-router-dom';

type MenuItemProps = {
    item: MenuObj;
    isCollapsed?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, isCollapsed }) => {
    const { checkActiveNav } = useCheckActiveNav()

    return (
        <>
            <TooltipProvider delayDuration={300}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <NavLink
                            to={item.href}
                            className={cn("hover:bg-secondary hover:text-primary dark:hover:text-white inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors py-6 h-6 gap-2",
                                isCollapsed ? "justify-center px-2" : "justify-start px-4",
                                checkActiveNav(item.href) && "bg-primary text-white hover:bg-primary hover:text-white dark:hover:text-white"
                            )}
                        >
                            {item.icon}
                            {!isCollapsed && item.title}
                        </NavLink>
                    </TooltipTrigger>
                    {isCollapsed && (
                        <TooltipContent side='right' className='ms-1'>
                            <p>{item.title}</p>
                        </TooltipContent>
                    )}
                </Tooltip>
            </TooltipProvider>
        </>
    )
}

export default MenuItem

