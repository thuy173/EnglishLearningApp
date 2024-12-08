import React, { useEffect } from 'react'
import Sidebar from './sidebar/Sidebar';
import useIsCollapsedSidebar from '@/hooks/useIsCollapsedSidebar';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { getRefreshTokenFromCookie, getTokenFromCookie } from '@/utils/cookieUtils';
import { fetchUser } from '@/store/user/userSlice';
import LoadingPage from '@/components/loading/LoadingPage';

const AppShell: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useIsCollapsedSidebar();
    const { fetching } = useSelector((state: RootState) => state.users);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (getTokenFromCookie() || getRefreshTokenFromCookie()) {
            dispatch(fetchUser());
        }
    }, [dispatch]);

    return (
        <div className='relative h-full overflow-hidden bg-background'>
            {fetching ? (
                <LoadingPage />
            ) : (
                <>
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
                        <div className="py-3 min-h-screen">
                            <Outlet />
                        </div>
                        <Toaster
                            visibleToasts={5}
                            richColors
                            position='top-right'
                            closeButton
                        />
                    </main>
                </>
            )}
        </div>
    )
}

export default AppShell