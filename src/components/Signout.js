import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
import { UserContext } from "../UserContext";

const Signout = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(UserContext);

  const areUSureDelete = (choose) => {
    if (choose) {
      handleLogout();
      navigate("/Login");
    } else {
      navigate("/MyAccount");
    }
  };

  return (
    <Notification
      message={"Are you sure you want to Logout"}
      onDialog={areUSureDelete}
    />
  );
};

export default Signout;
