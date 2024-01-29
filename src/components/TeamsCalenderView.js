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
import "../components/TeamCalendarView.css";

const localizer = momentLocalizer(moment);
const JSON_SERVER_URL_LEAVES = "http://localhost:5000/leaves";

const TeamsCalenderView = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(JSON_SERVER_URL_LEAVES)
      .then((response) => {
        const leaves = response.data.filter((leave) => leave.username !== user);
        const leaveCountsByDate = {};
        leaves.forEach((leave) => {
          const fromDate = moment(leave.fromDate).format("YYYY-MM-DD");
          const toDate = moment(leave.toDate).format("YYYY-MM-DD");
          for (
            let date = fromDate;
            date <= toDate;
            date = moment(date).add(1, "day").format("YYYY-MM-DD")
          ) {
            // Initialize the counts for the date if not already set
            if (!leaveCountsByDate[date]) {
              leaveCountsByDate[date] = { earned: 0, sick: 0 };
            }
            if (leave.leaveType === "Earned Leave") {
              leaveCountsByDate[date].earned++;
            } else if (leave.leaveType === "Sick leave") {
              leaveCountsByDate[date].sick++;
            }
          }
        });
        // Create events with counts for each day
        const formattedEvents = Object.keys(leaveCountsByDate).map((date) => {
          const { earned, sick } = leaveCountsByDate[date];
          const formattedDate = moment(date).toDate();
          return {
            id: date,
            title: (
              <div style={{ backgroundColor: "#007bff" }}>
                <Button
                  style={{ backgroundColor: "green", color: "white" }}
                  onClick={() => {
                    navigate("/Leaves", {
                      state: {
                        isFilterLeavesView: true,
                        filterLeaveType: "Earned Leave",
                        filterDate: date,
                      },
                    });
                  }}
                >
                  Earned:{earned}
                </Button>
                <br />
                <Button
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => {
                    navigate("/Leaves", {
                      state: {
                        isFilterLeavesView: true,
                        filterLeaveType: "Sick leave",
                        filterDate: date,
                      },
                    });
                  }}
                >
                  Sick:{sick}
                </Button>
              </div>
            ),
            start: formattedDate,
            end: formattedDate,
          };
        });
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error("Error fetching leave data:", error);
      });
  }, [user]);
  const eventStyleGetter = (event, start, end, isSelected) => {
    let style = {
      backgroundColor: "#007bff",
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
            onClick={() => navigate("/Leaves")}
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
            style={{
              height: "700px",
              backgroundColor: "#007bff",
              width: "1000px",
            }}
          ></Calendar>
        </div>
      </div>
    </>
  );
};

export default TeamsCalenderView;
