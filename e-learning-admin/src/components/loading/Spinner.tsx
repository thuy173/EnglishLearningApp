import { cn } from "@/lib/utils";
import '@/styles/spinner.css'

function Spinner({ className }: { className?: string }) {
    return (
        <div className={cn(className)}>
            <div className='w-full h-full flex items-center justify-center z-50 bg-background'>
                <div className="logo-container">
                    <div className='md:size-12 size-8 relative flex items-center justify-center m-0'>
                        <h5 className='text-primary font-extrabold'>OC</h5>
                    </div>
                </div>
                <div className='md:size-20 size-12 absolute border-4 border-[rgba(0,118,255,0.5)] animate-spin-slow' />
                <div className='md:size-24 size-12 absolute border-4 border-[rgba(64,159,255,0.5)] bg-[rgba(0,118,255,0.1)] animate-pulse-rotate' />
            </div>
        </div>
    );
}

export default Spinner;