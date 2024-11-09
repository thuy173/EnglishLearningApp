export interface CourseReq {
    name: string;
    description: string;
    audience: string;
    target: string;
    content: string;
    thumbnail: File;
    price: number;
    status: boolean;
    categoryId: number;
    levelId: number;
}

export interface CourseRes {
    id: number;
    name: string;
    description: string;
    audience: string;
    target: string;
    content: string;
    thumbnail: string;
    price: number;
    status: boolean;
    categoryId: number;
    levelId: number;
}