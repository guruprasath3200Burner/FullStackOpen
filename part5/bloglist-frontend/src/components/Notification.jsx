import React from "react";

const notificationStyle = {
  padding: "1em",
  margin: "1em 0",
  borderRadius: "5px",
  fontSize: "1.1em",
  border: "2px solid",
  display: "inline-block",
};

const styles = {
  success: {
    ...notificationStyle,
    color: "green",
    background: "#e6ffe6",
    borderColor: "green",
  },
  error: {
    ...notificationStyle,
    color: "red",
    background: "#ffe6e6",
    borderColor: "red",
  },
};

const Notification = ({ message, type }) => {
  if (!message) return null;

  const style = type === "success" ? styles.success : styles.error;

  return (
    <div style={style} className={`notification ${type}`}>
      {message}
    </div>
  );
};

export default Notification;
