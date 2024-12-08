export enum VocabStatus {
    ACTIVE = 'ACTIVE',
    FLAGGED = 'FLAGGED',
    DEPRECATED = 'DEPRECATED',
    ARCHIVED = 'ARCHIVED'
}

export const vocabStatusList = [
    VocabStatus.ACTIVE,
    VocabStatus.FLAGGED,
    VocabStatus.DEPRECATED,
    VocabStatus.ARCHIVED
]

export const getVocabStatusStyles = (status: VocabStatus) => {
    switch (status) {
        case VocabStatus.ACTIVE:
            return 'bg-green-50 text-green-600'
        case VocabStatus.FLAGGED:
            return 'bg-amber-50 text-amber-600'
        case VocabStatus.DEPRECATED:
            return 'bg-red-50 text-red-600'
        case VocabStatus.ARCHIVED:
            return 'bg-blue-50 text-blue-600'
        default:
            return ''
    }
}

export const getVocabStatusText = (status: VocabStatus | undefined): string => {
    switch (status) {
        case VocabStatus.ACTIVE:
            return 'Active'
        case VocabStatus.FLAGGED:
            return 'Flagged'
        case VocabStatus.DEPRECATED:
            return 'Deprecated'
        case VocabStatus.ARCHIVED:
            return 'Archived'
        default:
            return ''
    }
}
