import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { MenuObj } from '@/data/topNav';
import useCheckActiveNav from '@/hooks/useCheckActiveNav';
import { cn } from '@/lib/utils';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';

type DropdownItemProps = {
    item: MenuObj;
    isCollapsed?: boolean;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ item, isCollapsed }) => {
    const { checkActiveNav } = useCheckActiveNav();
    const isChildActive = !!item.children?.find((s) => checkActiveNav(s.href));

    return (
        <>
            {!isCollapsed && (
                <Collapsible defaultOpen={isChildActive}>
                    <CollapsibleTrigger
                        className={cn(
                            'group w-full hover:bg-secondary hover:text-primary dark:hover:text-white inline-flex items-center rounded-md text-sm font-medium transition-colors py-6 h-6 gap-2',
                            isCollapsed ? "justify-center px-2" : "justify-start px-4",
                            isChildActive && "bg-primary text-white hover:bg-primary hover:text-white dark:hover:text-white"
                        )}
                    >
                        {item.icon}
                        {!isCollapsed && item.title}
                        {!isCollapsed && (
                            <span
                                className={cn(
                                    'ml-auto transition-all group-data-[state="open"]:-rotate-180'
                                )}
                            >
                                <ChevronDownIcon size={18} />
                            </span>
                        )}
                    </CollapsibleTrigger>
                    <CollapsibleContent
                        className={cn(
                            'transition-[max-height] ease-in-out duration-300 overflow-hidden',
                            isCollapsed ? 'max-h-0' : 'max-h-[500px]'
                        )}
                    >
                        <ul>
                            {item.children?.map((subLink) => (
                                <li key={subLink.title}>
                                    <NavLink
                                        to={subLink.href}
                                        className={cn(
                                            "hover:text-yellow-700 inline-flex w-full items-center justify-center rounded-md text-sm transition-colors py-6 h-6 gap-2",
                                            isCollapsed ? "justify-center px-2" : "justify-start px-4",
                                            checkActiveNav(subLink.href) && "text-yellow-700 font-semibold"
                                        )}
                                    >
                                        {subLink.icon}
                                        {!isCollapsed && subLink.title}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </CollapsibleContent>
                </Collapsible>
            )}

            {isCollapsed && (
                <DropdownMenu>
                    <TooltipProvider delayDuration={300}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DropdownMenuTrigger
                                    className={cn(
                                        'group w-full hover:bg-accent inline-flex items-center rounded-md text-sm font-medium transition-colors py-6 h-6 gap-2',
                                        isCollapsed ? "justify-center px-2" : "justify-start px-4",
                                        isChildActive && "bg-accent"
                                    )}>
                                    {item.icon}
                                </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <DropdownMenuContent side='right' align='start' className='ms-1'>
                                <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {item.children?.map((subLink) => (
                                    <DropdownMenuItem key={subLink.title}>
                                        <NavLink
                                            to={subLink.href}
                                        >
                                            {subLink.title}
                                        </NavLink>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                            {isCollapsed && (
                                <TooltipContent side='right' className='ms-2'>
                                    <div className='inline-flex items-center justify-between gap-2'>
                                        {item.title}
                                        <ChevronRightIcon size={16} />
                                    </div>
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </TooltipProvider>
                </DropdownMenu>
            )}
        </>


    )
}

export default DropdownItem;
