import React from 'react';
import Spinner from './Spinner';
import { cn } from '@/lib/utils';

export interface LoadingOverlayProps {
    loading: boolean;
    children: React.ReactNode;
    isScreenLoading?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
    loading = false,
    children,
    isScreenLoading
}) => {
    if (!loading) return <>{children}</>;

    return (
        <div className={cn("relative", isScreenLoading && "overflow-hidden h-screen")}>
            {children}
            <div className="absolute inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
                <Spinner />
            </div>
        </div>
    );
};

export default LoadingOverlay