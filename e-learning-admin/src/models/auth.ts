export interface LoginReq {
    email: string;
    password: string;
}

export interface SignUpReq {
    fullName: string;
    email: string;
    password: string;
    roleId: number;
}

export interface AuthRes {
    accessToken: string;
    refreshToken: string;
    message: string;
}