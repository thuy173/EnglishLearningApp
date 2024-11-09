import { RootState } from "@/redux/store";

export const selectVisits = (state: RootState) => state.visit.visits;

export const selectOneVisit = (state: RootState) => state.visit.visit;
