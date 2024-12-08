import { useState, useEffect } from 'react';
import '@/styles/spinner.css'

const LoadingPage = ({ delay = 500 }) => {
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    if (!showLoader) {
        return null;
    }

    return (
        <div className='w-full h-full fixed right-0 bottom-0 flex items-center justify-center z-50 bg-background'>
            <div className="logo-container">
                <div className='md:size-12 size-8 relative flex items-center justify-center m-0'>
                    <h5 className='text-primary font-extrabold'>OC</h5>
                </div>
            </div>
            <div className='md:size-20 size-12 absolute border-4 border-[rgba(0,118,255,0.5)] animate-spin-slow' />
            <div className='md:size-24 size-12 absolute border-4 border-[rgba(64,159,255,0.5)] bg-[rgba(0,118,255,0.1)] animate-pulse-rotate' />
        </div>
    );
};

export default LoadingPage