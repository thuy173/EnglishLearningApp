/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionReducerMapBuilder,
  AsyncThunk,
  Draft,
  AnyAction,
} from "@reduxjs/toolkit";

// Basic interface for state with loading and error
export interface LoadingState {
  loading: boolean;
  error: string | null;
}

// Type for state handlers with proper action typing
export type StateHandler<T extends LoadingState, Action = AnyAction> = (
  state: Draft<T>,
  action?: Action
) => void;

// Options for addLoadingCases with proper generic types
export interface LoadingCaseOptions<T extends LoadingState, ReturnType = any> {
  onPending?: StateHandler<T>;
  onFulfilled?: StateHandler<T, { payload: ReturnType }>;
  onRejected?: StateHandler<T, { payload: string | undefined }>;
}

// Default handlers with proper typing
export const defaultHandlers = {
  handleLoading: <T extends LoadingState>(state: Draft<T>) => {
    state.loading = true;
    state.error = null;
  },

  handleSuccess: <T extends LoadingState>(state: Draft<T>) => {
    state.loading = false;
    state.error = null;
  },

  handleError: <T extends LoadingState>(
    state: Draft<T>,
    action: { payload: string | undefined }
  ) => {
    state.loading = false;
    state.error = action.payload || null;
  },
};

/**
 * Helper function to add loading cases for redux slice with proper typing
 */
export const addLoadingCases = <
  T extends LoadingState,
  ReturnType = any,
  ThunkArg = any
>(
  builder: ActionReducerMapBuilder<T>,
  thunk: AsyncThunk<ReturnType, ThunkArg, { rejectValue: string }>,
  options: LoadingCaseOptions<T, ReturnType> = {}
) => {
  const {
    onPending = defaultHandlers.handleLoading,
    onFulfilled = defaultHandlers.handleSuccess,
    onRejected = defaultHandlers.handleError,
  } = options;

  builder
    .addCase(thunk.pending, (state) => onPending(state))
    .addCase(thunk.fulfilled, (state, action) => onFulfilled(state, action))
    .addCase(thunk.rejected, (state, action) => onRejected(state, action));
};
