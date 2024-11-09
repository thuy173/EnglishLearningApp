type FileType = 'image' | 'doc' | 'pdf';

export function getFileExtension(filename: string): string | undefined {
    return filename.split('.').pop();
}

export const checkFileType = (link: string): FileType | 'unknown' => {
    const extension = getFileExtension(link);

    if (!extension) {
        return 'unknown';
    }

    switch (extension.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'bmp':
        case 'webp':
            return 'image';
        case 'doc':
        case 'docx':
            return 'doc';
        case 'pdf':
            return 'pdf';
        default:
            return 'unknown';
    }
}