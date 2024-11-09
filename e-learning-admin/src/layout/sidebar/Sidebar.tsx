import { Button } from '@/components/ui/button';
import { topNavs } from '@/data/topNav';
import { cn } from '@/lib/utils'
import { ChevronsLeftIcon, MenuIcon } from 'lucide-react';
import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area';
import MenuItem from './MenuItem';
import DropdownItem from './DropdownItem';

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
    isCollapsed: boolean;
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
    return (
        <aside
            className={cn("fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh lg:block md:hidden sm:hidden hidden",
                isCollapsed ? "md:w-16" : "md:w-64"
            )}
        >
            <div className={cn("sticky z-50 flex items-center px-4 py-3 shadow-sm md:px-4",
                isCollapsed ? "justify-center md:px-2" : "justify-between"
            )}>
                {!isCollapsed && (
                    <div className="flex gap-3">
                        <div className="flex flex-col">
                            <h5 className="font-extrabold">OC English</h5>
                        </div>
                    </div>
                )}
                <Button
                    size={'icon'}
                    variant={'ghost'}
                    onClick={() => setIsCollapsed(prev => !prev)}
                    title='menu-toggle'
                >
                    {isCollapsed ? <MenuIcon size={20} /> : <ChevronsLeftIcon size={20} />}
                </Button>
            </div>
            <div className="z-40 h-full flex-1 overflow-auto max-h-screen" >
                <ScrollArea className={cn("h-calcTopNav p-4", isCollapsed && "px-2")}>
                    <div className="flex flex-col gap-2 pb-5">
                        {topNavs.map((item) =>
                            item.children ? (
                                <DropdownItem
                                    key={item.title}
                                    item={item}
                                    isCollapsed={isCollapsed}
                                />
                            ) : (
                                <MenuItem
                                    key={item.title}
                                    item={item}
                                    isCollapsed={isCollapsed}
                                />
                            )
                        )}
                    </div>
                </ScrollArea>
            </div>
        </aside >
    )
}

export default Sidebar;
