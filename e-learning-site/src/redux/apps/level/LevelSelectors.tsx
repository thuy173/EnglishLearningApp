import { RootState } from "@/redux/store";

export const selectLevels = (state: RootState) => state.level.levels;
