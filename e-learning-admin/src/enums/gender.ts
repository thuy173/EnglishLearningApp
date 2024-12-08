export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}

export const genderList = [
    Gender.MALE,
    Gender.FEMALE,
    Gender.OTHER
]


export const getGenderStyles = (gender: Gender) => {
    switch (gender) {
        case Gender.MALE:
            return 'bg-blue-50 text-blue-600'
        case Gender.FEMALE:
            return 'bg-rose-50 text-rose-600'
        case Gender.OTHER:
            return 'bg-gray-50 text-gray-600'
        default:
            return ''
    }
}

export const getGenderText = (gender: Gender | undefined): string => {
    switch (gender) {
        case Gender.MALE:
            return 'Male'
        case Gender.FEMALE:
            return 'Female'
        case Gender.OTHER:
            return 'Other'
        default:
            return ''
    }
}
