import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Trash2Icon } from 'lucide-react'
import React from 'react'

type Props = {
    title: string;
    description: string;
    loading: boolean;
    onDelete: () => void;
}

const DeleteOneAlertDialog: React.FC<Props> = ({ title, description, loading, onDelete }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    size='icon'
                    className='text-red-500 bg-red-500/20 hover:text-white hover:bg-red-500'
                    loading={loading}
                    title='Delete'
                >
                    <Trash2Icon size={18} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel tabIndex={-1}>Cancel</AlertDialogCancel>
                    <AlertDialogAction tabIndex={0} className={cn(buttonVariants({ variant: "destructive" }))} asChild>
                        <Button tabIndex={0} onClick={onDelete} loading={loading} title='Delete'>Delete</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteOneAlertDialog