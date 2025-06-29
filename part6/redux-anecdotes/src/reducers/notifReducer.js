import { createSlice } from "@reduxjs/toolkit";

const NotificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return "";
    },
  },
});

export const { setNotification: displayNotification, clearNotification } =
  NotificationSlice.actions;

export const setNotification = (message, timeout) => {
  return (dispatch) => {
    dispatch(displayNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);
  };
};
export default NotificationSlice.reducer;
