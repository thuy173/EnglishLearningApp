import React from 'react'
import DefaultImg from '@/assets/default-img.png'

type Props = {
    src: string;
    alt: string;
    className?: string;
}

const Picture: React.FC<Props> = ({ src, alt, className }) => {

    if (!src) {
        src = DefaultImg;
    }

    const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = DefaultImg;

        // prevent infinity loop when default image error
        event.currentTarget.onerror = null;
    };

    return (
        <>
            <img src={src} alt={alt} className={`${className}`} onError={handleError} />
        </>
    )
}

export default Picture