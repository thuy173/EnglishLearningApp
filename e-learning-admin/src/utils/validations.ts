// Regex pattern
const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const USERNAME_PATTERN = /^[a-z0-9_-]+$/;
const SPACE_PATTERN = /\s/;
const UPPERCASE_PATTERN = /[A-Z]/;
const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;

// Min lengths
const MIN_LENGTHS = {
    username: 8,
    password: 8,
    phone: 10,
} as const

// Max lengths
const MAX_LENGTHS = {
    email: 255,
    username: 16,
    password: 16,
} as const

// Error messages
const ERROR_MESSAGES = {
    email: {
        required: 'Email là bắt buộc',
        invalid: 'Địa chỉ email không hợp lệ',
        maxLength: `Email không được vượt quá ${MAX_LENGTHS.email} ký tự`
    },
    username: {
        required: 'Tên đăng nhập là bắt buộc',
        minLength: `Tên đăng nhập phải dài tối thiểu ${MIN_LENGTHS.username} ký tự`,
        maxLength: `Tên đăng nhập không được vượt quá ${MAX_LENGTHS.username} ký tự`,
        pattern: 'Tên đăng nhập chỉ được chứa chữ thường, số, gạch dưới và gạch ngang',
        noSpaces: 'Tên đăng nhập không được chứa khoảng trắng',
        noUppercase: 'Tên đăng nhập không được chứa chữ in hoa'
    },
    password: {
        required: 'Mật khẩu là bắt buộc',
        minLength: `Mật khẩu phải dài tối thiểu ${MIN_LENGTHS.password} ký tự`,
        maxLength: `Mật khẩu không được vượt quá ${MAX_LENGTHS.password} ký tự`,
        pattern: 'Mật khẩu phải chứa ít nhất một ký tự viết hoa và một ký tự đặc biệt',
    },
    phone: {
        required: 'Số điện thoại là bắt buộc',
        minLength: `Số điện thoại phải dài tối thiểu ${MIN_LENGTHS.phone} ký tự`
    }
} as const

// Validation rules
export const validationRules = {
    email: {
        required: {
            value: true,
            message: ERROR_MESSAGES.email.required
        },
        pattern: {
            value: EMAIL_PATTERN,
            message: ERROR_MESSAGES.email.invalid
        },
        maxLength: {
            value: MAX_LENGTHS.email,
            message: ERROR_MESSAGES.email.maxLength
        }
    },
    username: {
        required: {
            value: true,
            message: ERROR_MESSAGES.username.required
        },
        minLength: {
            value: MIN_LENGTHS.username,
            message: ERROR_MESSAGES.username.minLength
        },
        maxLength: {
            value: MAX_LENGTHS.username,
            message: ERROR_MESSAGES.username.maxLength
        },
        pattern: {
            value: USERNAME_PATTERN,
            message: ERROR_MESSAGES.username.pattern
        },
        validate: {
            noSpaces: (value: string) =>
                !SPACE_PATTERN.test(value) || ERROR_MESSAGES.username.noSpaces,
            noUppercase: (value: string) =>
                !UPPERCASE_PATTERN.test(value) || ERROR_MESSAGES.username.noUppercase
        }
    },
    password: {
        required: {
            value: true,
            message: ERROR_MESSAGES.password.required
        },
        minLength: {
            value: MIN_LENGTHS.password,
            message: ERROR_MESSAGES.password.minLength
        },
        maxLength: {
            value: MAX_LENGTHS.password,
            message: ERROR_MESSAGES.password.maxLength
        },
        pattern: {
            value: PASSWORD_PATTERN,
            message: ERROR_MESSAGES.password.pattern
        },
    },
    phone: {
        required: {
            value: true,
            message: ERROR_MESSAGES.phone.required
        },
        minLength: {
            value: MIN_LENGTHS.phone,
            message: ERROR_MESSAGES.phone.minLength
        }
    }
}