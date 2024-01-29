import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Header from "./Header";

const localizer = momentLocalizer(moment);
const JSON_SERVER_URL_LEAVES = "http://localhost:5000/leaves";

const CalendarView = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);

  const getData = async (e) => {
    try {
      const response = await axios.get(`${JSON_SERVER_URL_LEAVES}`);
      if (response.data.length > 0) {
        const leaves = response.data.filter((leave) => leave.username === user);
        if (leaves) {
          setLeaves(leaves);
          console.log("leaves", leaves);
        } else {
          console.log("error while getting data");
        }
      }
    } catch (error) {
      console.log("error while calling db", error);
    }
  };
  useEffect(() => {
    getData();
  }, [user]);

  //   const leaves = [
  //     {
  //       id: 1,
  //       userId: "Sri",
  //       fromDate: "09 Oct 2023",
  //       toData: "10 Oct 2023",
  //       numberOfDays: 2,
  //       leaveType: "Sick Leave",
  //       status: "Approved",
  //     },
  //     {
  //       id: 2,
  //       userId: "Hitha",
  //       fromDate: "19 Oct 2023",
  //       toData: "22 Oct 2023",
  //       numberOfDays: 2,
  //       leaveType: "Earned Leave",
  //       status: "Approved",
  //     },

  //   ];

  const changeDateFormat = (date) => {
    const newdate = new Date(date);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = newdate.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const events = leaves.map((leave) => {
    const formattedfromDate = changeDateFormat(leave.fromDate);
    const formattedtoDate = changeDateFormat(leave.toDate);
    return {
      id: leave.id,
      title: leave.leaveType,
      start: new Date(formattedfromDate),
      end: new Date(formattedtoDate),
    };
  });

  const eventStyleGetter = (event, start, end, isSelected) => {
    let style = {
      backgroundColor: event.title === "Earned Leave" ? "green" : "red",
    };
    return {
      style,
    };
  };
  return (
    <>
      <Header title="Calendar View"></Header>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "10px",
            paddingTop: "10px",
          }}
        >
          <Button
            onClick={() => navigate("/MyLeaves")}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Back to Leaves
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "20px",
          }}
        >
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={new Date()}
            eventPropGetter={eventStyleGetter}
            style={{ height: "700px", backgroundColor: "#007bff" }}
          ></Calendar>
        </div>
      </div>
    </>
  );
};

export default CalendarView;
