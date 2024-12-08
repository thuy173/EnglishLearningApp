import { CourseStatus } from "@/enums/courseStatus";

export interface CourseReq {
    name: string;
    description: string;
    audience: string;
    target: string;
    content: string;
    thumbnail: File | string;
    price: number;
    status: CourseStatus;
    categoryId: number;
    levelId: number;
}

export interface CourseShortRes {
    id: number;
    name: string;
    thumbnail: string;
    status: CourseStatus;
    categoryName: string;
    levelName: string;
}

export interface CourseRes {
    id: number;
    name: string;
    description: string;
    audience: string;//
    target: string;//
    content: string;//
    thumbnail: string;
    price: number;
    status: CourseStatus;
    categoryId: number;
    levelId: number;
}