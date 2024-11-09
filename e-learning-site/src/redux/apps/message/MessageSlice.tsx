import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  message: string | null;
  type: "success" | "error"| "warning" | null;
}
interface AlertState {
  notification: NotificationState;
  messageAlert: NotificationState;
}

const initialState: AlertState = {
  notification: {
    message: null,
    type: null,
  },
  messageAlert: {
    message: null,
    type: null,
  },
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    showNotification: (
      state: AlertState,
      action: PayloadAction<{ message: string; type: "success" | "error" | "warning"}>
    ) => {
      state.notification.message = action.payload.message;
      state.notification.type = action.payload.type;
    },
    showMessage: (
      state: AlertState,
      action: PayloadAction<{ message: string; type: "success" | "error" | "warning"}>
    ) => {
      state.messageAlert.message = action.payload.message;
      state.messageAlert.type = action.payload.type;
    },
    clearNotification: (state: AlertState) => {
      state.notification.message = null;
      state.notification.type = null;
    },
    clearMessage: (state: AlertState) => {
      state.messageAlert.message = null;
      state.messageAlert.type = null;
    },
  },
});

export const {
  showNotification,
  showMessage,
  clearNotification,
  clearMessage,
} = messageSlice.actions;

export default messageSlice.reducer;
