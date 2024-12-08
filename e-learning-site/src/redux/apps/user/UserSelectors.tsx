import { RootState } from "@/redux/store";

export const selectUserInformation = (state: RootState) => state.user.user;

export const selectVocabularies = (state: RootState) => state.user.vocabularies;

export const selectTotalElements = (state: RootState) => state.user.totalElements;

export const selectTotalPages = (state: RootState) => state.user.totalPages;
