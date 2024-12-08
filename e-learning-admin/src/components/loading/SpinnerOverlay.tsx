import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface SpinnerOverlayProps {
    loading: boolean;
    children: React.ReactNode;
    isScreenLoading?: boolean;
}

const SpinnerOverlay: React.FC<SpinnerOverlayProps> = ({
    loading = false,
    children,
    isScreenLoading
}) => {
    if (!loading) return <>{children}</>;

    return (
        <div className={cn("relative", isScreenLoading && "overflow-hidden h-screen")}>
            {children}
            <div className="absolute inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
                <div className="py-5 flex items-center justify-center">
                    <Loader2 className="animate-spin h-8 w-8" />
                </div>
            </div>
        </div>
    );
};

export default SpinnerOverlay