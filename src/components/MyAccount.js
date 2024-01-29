import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import Header from "./Header";
import "../components/MyAccount.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const JSON_SERVER_URL_LEAVES = "http://localhost:5000/leaves";

const MyAccount = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const getData = async (e) => {
    try {
      const response = await axios.get(`${JSON_SERVER_URL_LEAVES}`);

      if (response.data.length > 0) {
        const leaves = response.data.filter((leave) => leave.username === user);
        setUserData(leaves);
      } else {
        console.log("error fetching data");
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  useEffect(() => {
    getData();
  }, [user]);

  const calculateRemainingleaves = (userData) => {
    const totalLeaves = 20;
    const appliedLeaves = userData.length;
    const remainingLeaves = totalLeaves - appliedLeaves;
    return remainingLeaves;
  };

  return (
    <>
      <Header title="My Details"></Header>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "10px",
          paddingTop: "10px",
        }}
      >
        <Button
          onClick={() => navigate("/Home")}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </Button>
      </div>
      <div className="my-account-container">
        {userData && (
          <div className="user-details">
            <p>Username:{user}</p>
            <p>Applied Leaves:{userData.length}</p>
            <p>
              Sick Leaves Applied:
              {
                userData.filter((leave) => leave.leaveType === "Sick leave")
                  .length
              }
            </p>
            <p>
              Earned Leaved Applied:
              {
                userData.filter((leave) => leave.leaveType === "Earned Leave")
                  .length
              }
            </p>
            <p>Leaves Remaining:{calculateRemainingleaves(userData)}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default MyAccount;
