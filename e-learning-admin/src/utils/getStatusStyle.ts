
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
            return 'Đang hoạt động'
        case false:
            return 'Không hoạt động'
        default:
            return ''
    }
}

export const getBillStatusText = (status: boolean | undefined): string => {
    switch (status) {
        case true:
            return 'Đã xuất'
        case false:
            return 'Chưa xuất'
        default:
            return ''
    }
}

export const getPaymentStatusText = (status: boolean | undefined): string => {
    switch (status) {
        case true:
            return 'Đã thanh toán'
        case false:
            return 'Chưa thanh toán'
        default:
            return ''
    }
}

export const getVisitConfirmText = (status: boolean | undefined): string => {
    switch (status) {
        case true:
            return 'Đã xác nhận'
        case false:
            return 'Chưa xác nhận'
        default:
            return ''
    }
}

export const getLongSendText = (isLongSend: boolean | undefined): string => {
    switch (isLongSend) {
        case true:
            return 'Gửi lâu dài'
        case false:
            return 'Gửi ngắn hạn'
        default:
            return ''
    }
}