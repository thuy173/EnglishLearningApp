export interface PageResponse<T> {
    content: T[];
    pageable: Array<{
        pageNumber: number;
        pageSize: number;
        sort: Array<{
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        }>;
        offset: number;
        paged: boolean;
        unpaged: boolean;
    }>;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: Array<{
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    }>;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}