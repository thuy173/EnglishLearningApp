import React from 'react'
import { Button } from '../ui/button'
import { XIcon } from 'lucide-react'
import Picture from './Picture'
import { checkFileType } from '@/utils/fileHelper'
import { cn } from '@/lib/utils'

type Props = {
    onDelete: () => void;
    currentLink?: string;
    file: File | string;
}

const PreviewUpload: React.FC<Props> = ({ onDelete, currentLink = '', file }) => {

    const fileType = checkFileType(currentLink ? currentLink : (file instanceof File ? file.name : file));

    const renderContent = () => {
        switch (fileType) {
            case 'image':
                return (
                    <Picture
                        src={file instanceof File ? URL.createObjectURL(file) : currentLink}
                        alt={`preview-img: ${file instanceof File ? URL.createObjectURL(file) : file}`}
                        className={cn('w-full h-60 object-contain border')}
                    />
                );
            default:
                return '';
        }
    };

    return (
        <div className="relative">
            <Button
                type='button'
                size='icon'
                className='absolute top-1 right-1 w-6 h-6 rounded bg-black/30 hover:bg-black'
                onClick={onDelete}
                title='Xóa file'
            >
                <XIcon size={16} />
            </Button>
            {renderContent()}
        </div>
    )
}

export default PreviewUpload