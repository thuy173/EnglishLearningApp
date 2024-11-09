import { Claim } from "@/models/claim";
import { UserDetailRes } from "@/models/user";

export const checkClaims = ({
    userDetail,
    requiredClaims
}: {
    userDetail: UserDetailRes,
    requiredClaims: Claim[]
}) => {
    // First check if user has any of the required claims directly
    const hasClaims = requiredClaims.every(requiredClaim =>
        userDetail.userClaims?.some(userClaim =>
            userClaim.claimType === requiredClaim.claimType &&
            userClaim.claimValue === requiredClaim.claimValue
        )
    );

    // If direct claims check passed, return true
    if (hasClaims) return true;

    // If no direct claims match, check role-based claims
    return requiredClaims.every(requiredClaim =>
        userDetail.userRoles?.some(role =>
            role.roleClaims?.some(roleClaim =>
                roleClaim.claimType === requiredClaim.claimType &&
                roleClaim.claimValue === requiredClaim.claimValue
            )
        )
    );
};

// // Helper function to check either claims or roles individually
// export const checkUserClaims = ({
//     userDetail,
//     requiredClaims
// }: {
//     userDetail: UserDetailRes,
//     requiredClaims: Claim[]
// }) => {
//     return requiredClaims.every(requiredClaim =>
//         userDetail.userClaims?.some(userClaim =>
//             userClaim.claimType === requiredClaim.claimType &&
//             userClaim.claimValue === requiredClaim.claimValue
//         )
//     );
// };

// const checkRoleClaims = ({
//     userDetail,
//     requiredClaims
// }: {
//     userDetail: UserDetailRes,
//     requiredClaims: Claim[]
// }) => {
//     return requiredClaims.every(requiredClaim =>
//         userDetail.userRoles?.some(role =>
//             role.roleClaims?.some(roleClaim =>
//                 roleClaim.claimType === requiredClaim.claimType &&
//                 roleClaim.claimValue === requiredClaim.claimValue
//             )
//         )
//     );
// };