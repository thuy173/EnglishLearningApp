import { RootState } from "@/redux/store";

export const selectTestingDetail = (state: RootState) => state.testing.testing;

export const selectAllTesting = (state: RootState) => state.testing.testings;

export const selectTotalElements = (state: RootState) => state.testing.totalElements;

export const selectTotalPages = (state: RootState) => state.testing.totalPages;

export const resultData = (state: RootState) => state.testing.resultData;

export const selectAttempts = (state: RootState) => state.testing.results;