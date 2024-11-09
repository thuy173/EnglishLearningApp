export interface CategoryReq {
    name: string;
    description: string;
    status: boolean;
}

export interface CategoryRes {
    id: number;
    name: string;
    description: string;
    status: boolean;
}