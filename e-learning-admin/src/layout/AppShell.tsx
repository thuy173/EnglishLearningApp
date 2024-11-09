import React from 'react'
import Sidebar from './sidebar/Sidebar';
import TopNav from './top-nav/TopNav';
import useIsCollapsedSidebar from '@/hooks/useIsCollapsedSidebar';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

const AppShell: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useIsCollapsedSidebar();

    return (
        <div className='relative h-full overflow-hidden bg-background'>
            <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />
            <main
                id='content'
                className={cn("h-full overflow-x-hidden transition-[margin] md:overflow-y-hidden md:pt-0",
                    isCollapsed ? "lg:ml-16" : "lg:ml-64"
                )}
            >
                <div className={cn("h-topNav fixed top-0 right-0 left-0 z-10 bg-white dark:bg-background flex items-center lg:justify-end md:justify-between sm:justify-between justify-between px-8 py-9",
                    isCollapsed ? "lg:left-16" : "lg:left-64"
                )}>
                    <TopNav />
                </div>
                <div className="mt-topNav pt-3">
                    <Outlet />
                </div>
                <Toaster
                    visibleToasts={5}
                    richColors
                    position='top-right'
                    closeButton
                />
            </main>
        </div>
    )
}

export default AppShell