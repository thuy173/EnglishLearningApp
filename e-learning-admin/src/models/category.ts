export interface CategoryReq {
    name: string;
    icon: File | string;
    description: string;
    status: boolean;
}

export interface CategoryRes {
    id: number;
    name: string;
    icon: string;
    description: string;
    status: boolean;
}