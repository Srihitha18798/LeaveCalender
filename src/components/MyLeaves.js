import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Header from "./Header";
import { Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import "../components/MyLeaves.css";

const JSON_SERVER_URL_LEAVES = "http://localhost:5000/leaves";

const MyLeaves = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getData = async (e) => {
      console.log("submitted");
      try {
        const response = await axios.get(`${JSON_SERVER_URL_LEAVES}`);
        if (response.data.length > 0) {
          const leaves = response.data.filter(
            (leave) => leave.username === user
          );
          if (leaves) {
            const rowsWithIds = (leaves || []).map((leave, index) => ({
              ...leave,
              id: index,
            }));
            setRows(rowsWithIds);
          } else {
            console.log("error while getting data");
          }
        }
      } catch (error) {
        console.log("error while calling db", error);
      }
    };

    getData();
  }, [user]);

  const columns = [
    { field: "fromDate", headerName: "From Date", flex: 1 },
    { field: "toDate", headerName: "TO Date", flex: 1 },
    { field: "numberOfDays", headerName: "Number of Days", flex: 1 },
    { field: "leaveType", headerName: "Leave Type", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  return (
    <>
      <Header title="My Leaves" />
      <div className="centeredTable">
        <div className="tableButtons">
          <Button onClick={() => navigate("/ApplyLeave")}>Apply leave</Button>
          <Button onClick={() => navigate("/CalendarView")}>
            Calender View
          </Button>
        </div>
        <div className="dataGridContainer">
          <DataGrid
            rows={rows}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
          ></DataGrid>
        </div>
      </div>
    </>
  );
};

export default MyLeaves;
