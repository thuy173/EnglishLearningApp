import { Gender } from "@/enums/gender";

export interface UserRes {
    id: number;
    email: string;
    avatar: string;
    fullName: string;
    phone: string;
    gender: Gender;
    dob: string;
    status: boolean;
}

export interface UserReq {
    email: string;
    fullName: string;
    phoneNumber: string;
    gender: Gender;
    dob: Date;
}

export interface UserUpdateReq {
    fullName: string;
    phoneNumber: string;
    gender: Gender;
    dob: Date;
    status: boolean;
}