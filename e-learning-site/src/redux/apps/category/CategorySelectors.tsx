import { RootState } from "@/redux/store";

export const selectCategories = (state: RootState) => state.category.categories;

export const selectOneCategory = (state: RootState) => state.category.category;
