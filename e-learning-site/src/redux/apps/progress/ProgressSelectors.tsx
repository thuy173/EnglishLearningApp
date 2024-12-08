import { RootState } from "@/redux/store";

export const selectProgressCourse = (state: RootState) => state.progress.progress;

