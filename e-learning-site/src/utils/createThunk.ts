import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleAxiosError } from "@/utils/error.utils";
import { showNotification } from "@/redux/apps/message/MessageSlice";

interface ThunkOptions {
  successMessage?: string;
  errorMessage?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (dispatch: any) => void;
}

export const createAppThunk = <TResponse, TRequest = void>(
  type: string,
  handler: (data: TRequest) => Promise<TResponse>,
  options: ThunkOptions = {}
) => {
  return createAsyncThunk<TResponse, TRequest, { rejectValue: string }>(
    type,
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const result = await handler(data);

        if (options.successMessage) {
          dispatch(
            showNotification({
              message: options.successMessage,
              type: "success",
            })
          );
        }

        if (options.onSuccess) {
          options.onSuccess(dispatch);
        }

        return result;
      } catch (error) {
        const errorMessage = options.errorMessage || handleAxiosError(error);

        dispatch(
          showNotification({
            message: errorMessage,
            type: "error",
          })
        );

        return rejectWithValue(errorMessage);
      }
    }
  );
};
