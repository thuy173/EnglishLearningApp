export const translateClaimResource = (resource: string): string => {
    const translations: { [key: string]: string } = {
        Default: 'Tối thượng',
        CommodityCategory: 'Loại sản phẩm',
        MoveCategory: 'Loại di chuyển',
        NicheCategory: 'Loại ô chứa',
        ServiceCategory: 'Loại dịch vụ',
        SendCategory: 'Loại hình gửi',
        TendCategory: 'Loại hình trông nom',
        ContractSignPlace: 'Điểm ký hợp đồng',
        Building: 'Tòa tháp',
        Floor: 'Tầng',
        Room: 'Phòng',
        Row: 'Hàng',
        Niche: 'Ô chứa',
        Bill: 'Biên lai',
        Contract: 'Hợp đồng',
        Service: 'Dịch vụ',
        Visit: 'Thăm viếng',
        Role: 'Vai trò',
        User: 'Người dùng',
        Claims: 'Quyền hạn',
        DocumentCategory: 'Loại tài liệu',
        Document: 'Tài liệu',
    }

    return translations[resource] || resource;
}

export const translateClaimValue = (claimValue: string): string => {
    const translations: { [key: string]: string } = {
        // Default
        CanRead: 'Xem',
        CanCreate: 'Tạo',
        CanUpdate: 'Chỉnh sửa',
        CanDelete: 'Xóa',

        // Commodity category
        CanReadCommodityCategory: 'Xem loại sản phẩm',
        CanCreateCommodityCategory: 'Tạo loại sản phẩm',
        CanUpdateCommodityCategory: 'Chỉnh sửa loại sản phẩm',
        CanDeleteCommodityCategory: 'Xóa loại sản phẩm',

        // Move category
        CanReadMoveCategory: 'Xem loại hình di chuyển',
        CanCreateMoveCategory: 'Tạo loại hình di chuyển',
        CanUpdateMoveCategory: 'Chỉnh sửa loại hình di chuyển',
        CanDeleteMoveCategory: 'Xóa loại hình di chuyển',

        // Niche category
        CanReadNicheCategory: 'Xem loại ô chứa',
        CanCreateNicheCategory: 'Tạo loại ô chứa',
        CanUpdateNicheCategory: 'Chỉnh sửa loại ô chứa',
        CanDeleteNicheCategory: 'Xóa loại ô chứa',
        CanReadPriceNicheCategory: 'Xem giá ô chứa',
        CanCreatePriceNicheCategory: 'Tạo giá ô chứa',
        CanUpdatePriceNicheCategory: 'Chỉnh sửa giá ô chứa',
        CanDeletePriceNicheCategory: 'Xóa giá ô chứa',

        // Service category
        CanReadServiceCategory: 'Xem loại dịch vụ',
        CanCreateServiceCategory: 'Tạo loại dịch vụ',
        CanUpdateServiceCategory: 'Chỉnh sửa loại dịch vụ',
        CanDeleteServiceCategory: 'Xóa loại dịch vụ',

        // Send category
        CanReadSendCategory: 'Xem loại hình gửi',
        CanCreateSendCategory: 'Tạo loại hình gửi',
        CanUpdateSendCategory: 'Chỉnh sửa loại hình gửi',
        CanDeleteSendCategory: 'Xóa loại hình gửi',

        // Tend category
        CanReadTendCategory: 'Xem loại hình trông nom',
        CanCreateTendCategory: 'Tạo loại hình trông nom',
        CanUpdateTendCategory: 'Chỉnh sửa loại hình trông nom',
        CanDeleteTendCategory: 'Xóa loại hình trông nom',

        // Contract sign place
        CanReadContractSignPlace: 'Xem điểm ký hợp đồng',
        CanCreateContractSignPlace: 'Tạo điểm ký hợp đồng',
        CanUpdateContractSignPlace: 'Chỉnh sửa điểm ký hợp đồng',
        CanDeleteContractSignPlace: 'Xóa điểm ký hợp đồng',

        // Building
        CanReadBuilding: 'Xem tòa nhà',
        CanCreateBuilding: 'Tạo tòa nhà',
        CanUpdateBuilding: 'Chỉnh sửa tòa nhà',
        CanDeleteBuilding: 'Xóa tòa nhà',

        // Floor
        CanReadFloor: 'Xem tầng',
        CanCreateFloor: 'Tạo tầng',
        CanUpdateFloor: 'Chỉnh sửa tầng',
        CanDeleteFloor: 'Xóa tầng',

        // Room
        CanReadRoom: 'Xem phòng',
        CanCreateRoom: 'Tạo phòng',
        CanUpdateRoom: 'Chỉnh sửa phòng',
        CanDeleteRoom: 'Xóa phòng',

        // Row
        CanReadRow: 'Xem hàng',
        CanCreateRow: 'Tạo hàng',
        CanUpdateRow: 'Chỉnh sửa hàng',
        CanDeleteRow: 'Xóa hàng',

        // Niche
        CanReadNiche: 'Xem ô chứa',
        CanCreateNiche: 'Tạo ô chứa',
        CanUpdateNiche: 'Chỉnh sửa ô chứa',
        CanDeleteNiche: 'Xóa ô chứa',
        CanReadNicheOrder: 'Xem đơn đặt ô chứa',
        CanVerifyNicheOrder: 'Xác minh đơn đặt ô chứa',

        // Bill
        CanReadBill: 'Xem biên lai',
        CanCreateBill: 'Tạo biên lai',
        CanUpdateBill: 'Chỉnh sửa biên lai',
        CanDeleteBill: 'Xóa biên lai',
        CanReadBillDetail: 'Xem chi tiết biên lai',
        CanDeleteBillDetail: 'Xóa chi tiết biên lai',

        // Contract
        CanReadContract: 'Xem hợp đồng',
        CanCreateContract: 'Tạo hợp đồng',
        CanUpdateContract: 'Chỉnh sửa hợp đồng',
        CanDeleteContract: 'Xóa hợp đồng',
        CanReadContractRenew: 'Xem hợp đồng gia hạn',
        CanCreateContractRenew: 'Tạo hợp đồng gia hạn',
        CanUpdateContractRenew: 'Chỉnh sửa hợp đồng gia hạn',
        CanDeleteContractRenew: 'Xóa hợp đồng gia hạn',
        CanReadContractDetail: 'Xem chi tiết hợp đồng',
        CanCreateContractDetail: 'Tạo chi tiết hợp đồng',
        CanUpdateContractDetail: 'Chỉnh sửa chi tiết hợp đồng',
        CanDeleteContractDetail: 'Xóa chi tiết hợp đồng',

        // Service
        CanReadService: 'Xem dịch vụ',
        CanCreateService: 'Tạo dịch vụ',
        CanUpdateService: 'Chỉnh sửa dịch vụ',
        CanDeleteService: 'Xóa dịch vụ',
        CanReadServiceDetail: 'Xem chi tiết dịch vụ',
        CanCreateServiceDetail: 'Tạo chi tiết dịch vụ',
        CanUpdateServiceDetail: 'Chỉnh sửa chi tiết dịch vụ',
        CanDeleteServiceDetail: 'Xóa chi tiết dịch vụ',

        // Visit
        CanReadVisit: 'Xem đơn thăm viếng',
        CanCreateVisit: 'Tạo đơn thăm viếng',
        CanUpdateVisit: 'Chỉnh sửa đơn thăm viếng',
        CanDeleteVisit: 'Xóa đơn thăm viếng',

        // Role
        CanReadRole: 'Xem vai trò',
        CanCreateRole: 'Tạo vai trò',
        CanUpdateRole: 'Chỉnh sửa vai trò',
        CanDeleteRole: 'Xóa vai trò',
        CanReadRoleClaim: 'Xem quyền của vai trò',
        CanCreateRoleClaim: 'Tạo quyền của vai trò',
        CanUpdateRoleClaim: 'Chỉnh sửa quyền của vai trò',
        CanDeleteRoleClaim: 'Xóa quyền của vai trò',
        CanReadUserRole: 'Xem vai trò người dùng',
        CanCreateUserRole: 'Tạo vai trò người dùng',
        CanUpdateUserRole: 'Chỉnh sửa vai trò người dùng',
        CanDeleteUserRole: 'Xóa vai trò người dùng',

        // User
        CanReadUser: 'Xem người dùng',
        CanCreateUser: 'Tạo người dùng',
        CanUpdateUser: 'Chỉnh sửa người dùng',
        CanDeleteUser: 'Xóa người dùng',
        CanReadUserClaim: 'Xem quyền người dùng',
        CanCreateUserClaim: 'Tạo quyền người dùng',
        CanUpdateUserClaim: 'Chỉnh sửa quyền người dùng',
        CanDeleteUserClaim: 'Xóa quyền người dùng',

        // Claims
        CanReadClaims: 'Xem quyền',
        CanCreateClaims: 'Tạo quyền',
        CanUpdateClaims: 'Chỉnh sửa quyền',
        CanDeleteClaims: 'Xóa quyền',

        // Document category
        CanReadDocumentCategory: 'Xem loại tài liệu',
        CanCreateDocumentCategory: 'Tạo loại tài liệu',
        CanUpdateDocumentCategory: 'Chỉnh sửa loại tài liệu',
        CanDeleteDocumentCategory: 'Xóa loại tài liệu',

        // Document
        CanReadDocument: 'Xem tài liệu',
        CanCreateDocument: 'Tạo tài liệu',
        CanUpdateDocument: 'Chỉnh sửa tài liệu',
        CanDeleteDocument: 'Xóa tài liệu',
    };

    return translations[claimValue] || claimValue;
}
