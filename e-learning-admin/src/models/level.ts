export interface LevelReq {
    name: string;
    description: string;
    status: boolean;
}

export interface LevelRes {
    id: number;
    name: string;
    description: string;
    status: boolean;
}