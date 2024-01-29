import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const JSON_SERVER_URL_LEAVES = "http://localhost:5000/leaves";
const JSON_SERVER_URL = "http://localhost:5000/users";

const ApplyLeave = () => {
  const { user } = useContext(UserContext);

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [leaveType, setLeaveType] = useState("Earned Leave");
  const [isFormValid, setIsFormValid] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const navigate = useNavigate();

  const handleLeaveApplication = async (e) => {
    e.preventDefault();

    console.log("submitted");

    try {
      const response = await axios.get(`${JSON_SERVER_URL}?username=${user}`);

      if (response.data.length === 1) {
        const leaveApplicationData = {
          username: user,
          fromDate,
          toDate,
          numberOfDays,
          leaveType,
          status: "Pending",
        };

        console.log(response.data[0]);

        //const updatedProfile = response.data[0];

        //updatedProfile.leaves.push(leaveApplicationData);

        console.log(response.data[0]);
        console.log(leaveApplicationData);
        const updatedResponse = await axios.post(
          JSON_SERVER_URL_LEAVES,
          leaveApplicationData
        );
        console.log("Data has been succesfully added", updatedResponse);

        /*const confirmDelete = window.confirm(
                    "Leave has been succesfully submitted"
                  );
                  if (confirmDelete) {
                  
                    navigate("/Leaves")
                  }*/

        // Show the notification
        setShowNotification(true);

        // Automatically hide the notification after a few seconds (e.g., 3 seconds)
        setTimeout(() => {
          setShowNotification(false);
          // Navigate to the "Leaves" page after hiding the notification
          navigate("/Home");
        }, 2000); // 3000 milliseconds = 3 seconds
      } else {
        console.log("Error applying for leave");
      }
    } catch (error) {
      console.log("Error applying for leave", error);
    }
  };

  const isDateValid = (date) => {
    // Date format validation (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
  };

  const isNumberOfDaysValid = (days) => {
    return days > 0;
  };

  // Check if all form fields are filled and valid
  const isFormFieldsValid = () => {
    return (
      isDateValid(fromDate) &&
      isDateValid(toDate) &&
      isNumberOfDaysValid(numberOfDays)
    );
  };

  // Update the isFormValid state whenever form fields change
  useEffect(() => {
    setIsFormValid(isFormFieldsValid());
  }, [fromDate, toDate, numberOfDays]);

  return (
    <>
      <Header title="Leave Application" />
      <div className="login">
        {showNotification && (
          <div style={{ fontSize: "40px", fontWeight: "bold", color: "green" }}>
            Leave has been successfully submitted
          </div>
        )}
        <section style={{ height: "600px" }}>
          <h1>Leave Application</h1>
          <form onSubmit={handleLeaveApplication}>
            <label htmlFor="fromDate">From Date:</label>
            <input
              type="date"
              id="fromDate"
              autoComplete="off"
              onChange={(e) => setFromDate(e.target.value)}
              required
              aria-describedby="uidnote"
            ></input>
            <label htmlFor="toDate">To Date:</label>
            <input
              type="date"
              id="toDate"
              autoComplete="off"
              onChange={(e) => setToDate(e.target.value)}
              required
              aria-describedby="uidnote"
            ></input>
            <label htmlFor="numberOfDays">Number of Days:</label>
            <input
              type="number"
              id="numberOfDays"
              autoComplete="off"
              onChange={(e) => setNumberOfDays(e.target.value)}
              required
              aria-describedby="uidnote"
            ></input>
            <label htmlFor="leaveType">
              Leave Type:
              <br />
              <select
                id="leaveType"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                required
                className="select-large"
              >
                <option value="Earned leave">Earned Leave</option>
                <option value="Sick leave">Sick Leave</option>
              </select>
            </label>
            <button disabled={!isFormValid}>Submit</button>
          </form>
        </section>
      </div>
    </>
  );
};

export default ApplyLeave;
