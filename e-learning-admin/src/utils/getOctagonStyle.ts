interface OctagonStyle {
    backgroundColor: string;
    clipPath: string;
    color: string;
}

export const getOctagonStyle = (segment: number): OctagonStyle => {
    switch (segment) {
        case 1:
            return {
                backgroundColor: '#FFDD00',
                clipPath: 'polygon(30% 0%, 70% 0%, 50% 50%)',
                color: 'text-black'
            }
        case 2:
            return {
                backgroundColor: '#FFA500',
                clipPath: 'polygon(70% 0%, 100% 30%, 50% 50%)',
                color: 'text-black'
            }
        case 3:
            return {
                backgroundColor: '#FF0000',
                clipPath: 'polygon(100% 30%, 100% 70%, 50% 50%)',
                color: 'text-white'
            }
        case 4:
            return {
                backgroundColor: '#800080',
                clipPath: 'polygon(100% 70%, 70% 100%, 50% 50%)',
                color: 'text-white'
            }
        case 5:
            return {
                backgroundColor: '#4B0082',
                clipPath: 'polygon(70% 100%, 30% 100%, 50% 50%)',
                color: 'text-white'
            }
        case 6:
            return {
                backgroundColor: '#008000',
                clipPath: 'polygon(30% 100%, 0% 70%, 50% 50%)',
                color: 'text-white'
            }
        case 7:
            return {
                backgroundColor: '#00FF00',
                clipPath: 'polygon(0% 70%, 0% 30%, 50% 50%)',
                color: 'text-black'
            }
        case 8:
            return {
                backgroundColor: '#00FFFF',
                clipPath: 'polygon(0% 30%, 30% 0%, 50% 50%)',
                color: 'text-black'
            }
        default:
            return {
                backgroundColor: '#d1d5db',
                clipPath: '',
                color: ''
            }
    }
}