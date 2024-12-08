
export const getActiveStatusStyles = (status: boolean) => {
    switch (status) {
        case true:
            return 'bg-green-50 text-green-600'
        case false:
            return 'bg-red-50 text-red-600'
        default:
            return ''
    }
}

export const getActiveStatusText = (status: boolean | undefined): string => {
    switch (status) {
        case true:
            return 'Active'
        case false:
            return 'Inactive'
        default:
            return ''
    }
}
