import { SortDirection } from "../enums/sortDirection";

export interface CommonParam {
    pageNumber?: number;
    pageSize?: number;
    sortDirection?: SortDirection;
}