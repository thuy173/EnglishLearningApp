import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '@/lib/utils'
import { getActiveStatusStyles, getActiveStatusText } from '@/utils/getStatusStyle'
import { Check, ChevronDown } from 'lucide-react'
import { Button } from '../ui/button'

type Props = {
    status: boolean;
    onStatusUpdate: (newStatus: boolean) => void;
    loading: boolean;
}

const UpdateStatusForm: React.FC<Props> = ({ status, onStatusUpdate, loading }) => {
    const [open, setOpen] = useState<boolean>(false)

    const handleSelectStatus = (status: boolean) => {
        onStatusUpdate(status)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant='secondary'
                    className={cn('inline-flex gap-1 items-center text-xs text-nowrap font-semibold border rounded-md px-2 py-1 shadow-none',
                        getActiveStatusStyles(status))}
                    loading={loading}
                >
                    {getActiveStatusText(status)}
                    <ChevronDown size={18} />
                </Button>
            </PopoverTrigger>
            <PopoverContent align='start' className='w-fit p-1.5'>
                <div className="flex flex-col gap-1">
                    {[true, false].map((option) => (
                        <Button
                            key={String(option)}
                            variant="ghost"
                            className={cn(
                                'flex items-center justify-start gap-2 ps-3 pe-5 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-muted rounded cursor-pointer',
                                status === option && 'bg-accent'
                            )}
                            onClick={() => handleSelectStatus(option)}
                        >
                            <Check
                                className={cn("size-4 text-blue-500",
                                    status === option ? 'visible' : 'invisible'
                                )}
                            />
                            {getActiveStatusText(option)}
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>

    )
}

export default UpdateStatusForm