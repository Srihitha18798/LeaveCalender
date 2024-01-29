import React, { useEffect, useState } from "react";
import "./CustomNotification.css";

const CustomNotification = ({ message, onConfirm }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
      onConfirm(); // Call the onConfirm function to navigate to the "Leaves" page
    }, 3000); // Close the notification after 3 seconds (adjust as needed)
  }, [onConfirm]);

  return (
    <div className={`notification ${visible ? "show" : "hide"}`}>
      {message}
      <button onClick={() => onConfirm()}>OK</button>
    </div>
  );
};

export default CustomNotification;
