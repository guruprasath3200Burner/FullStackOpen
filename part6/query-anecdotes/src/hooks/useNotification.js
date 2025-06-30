import { useNotificationDispatch } from "../NotificationContext";

export const useNotification = () => {
  const dispatch = useNotificationDispatch();

  const notify = (message, timeoutDuration = 5000) => {
    dispatch({ type: "SET_NOTIFICATION", payload: message });
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, timeoutDuration);
  };

  return notify;
};
