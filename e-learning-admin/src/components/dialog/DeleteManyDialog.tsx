import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Trash2Icon } from 'lucide-react'
import React from 'react'

type DeleteManyDialogProps = {
    title: string;
    description: string;
    loading?: boolean;
    onDelete: () => void;
}

const DeleteManyDialog: React.FC<DeleteManyDialogProps> = ({ title, description, loading, onDelete }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button loading={loading} className='bg-red-500 hover:bg-red-500/80 my-1' title='Delete many'>
                    <Trash2Icon size={18} className='me-2' />
                    Xóa
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button tabIndex={1} type="button" variant="secondary" title='Hủy'>
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button tabIndex={0} type="button" variant='destructive' onClick={onDelete} title='Delete'>
                            Delete
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteManyDialog