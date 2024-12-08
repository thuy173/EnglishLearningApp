export enum LessonStatus {
    DRAFT = 'DRAFT',
    READY = 'READY',
    HIDDEN = 'HIDDEN',
    LOCKED = 'LOCKED',
    ARCHIVED = 'ARCHIVED'
}

export const lessonStatusList = [
    LessonStatus.DRAFT,
    LessonStatus.READY,
    LessonStatus.HIDDEN,
    LessonStatus.ARCHIVED,
    LessonStatus.LOCKED
]

export const getLessonStatusStyles = (status: LessonStatus) => {
    switch (status) {
        case LessonStatus.DRAFT:
            return 'bg-gray-50 text-gray-600'
        case LessonStatus.READY:
            return 'bg-green-50 text-green-600'
        case LessonStatus.HIDDEN:
            return 'bg-red-50 text-red-600'
        case LessonStatus.LOCKED:
            return 'bg-violet-50 text-violet-600'
        case LessonStatus.ARCHIVED:
            return 'bg-blue-50 text-blue-600'
        default:
            return ''
    }
}

export const getLessonStatusText = (status: LessonStatus | undefined): string => {
    switch (status) {
        case LessonStatus.DRAFT:
            return 'Draft'
        case LessonStatus.READY:
            return 'Ready'
        case LessonStatus.HIDDEN:
            return 'Hidden'
        case LessonStatus.LOCKED:
            return 'Locked'
        case LessonStatus.ARCHIVED:
            return 'Archived'
        default:
            return ''
    }
}
