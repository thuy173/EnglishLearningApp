export enum CourseStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    UNPUBLISHED = 'UNPUBLISHED',
    ARCHIVED = 'ARCHIVED'
}

export const courseStatusList = [
    CourseStatus.DRAFT,
    CourseStatus.PUBLISHED,
    CourseStatus.UNPUBLISHED,
    CourseStatus.ARCHIVED
]

export const getCourseStatusStyles = (status: CourseStatus) => {
    switch (status) {
        case CourseStatus.DRAFT:
            return 'bg-gray-50 text-gray-600'
        case CourseStatus.PUBLISHED:
            return 'bg-green-50 text-green-600'
        case CourseStatus.UNPUBLISHED:
            return 'bg-red-50 text-red-600'
        case CourseStatus.ARCHIVED:
            return 'bg-blue-50 text-blue-600'
        default:
            return ''
    }
}

export const getCourseStatusText = (status: CourseStatus | undefined): string => {
    switch (status) {
        case CourseStatus.DRAFT:
            return 'Draft'
        case CourseStatus.PUBLISHED:
            return 'Published'
        case CourseStatus.UNPUBLISHED:
            return 'Unpublished'
        case CourseStatus.ARCHIVED:
            return 'Archived'
        default:
            return ''
    }
}
