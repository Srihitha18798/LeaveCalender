import { Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import "../components/Leaves.css";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import Header from "./Header";

const JSON_SERVER_URL_LEAVES = "http://localhost:5000/leaves";

const Leaves = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const { user } = useContext(UserContext);
  const location = useLocation();
  const isFilterLeavesView = location.state?.isFilterLeavesView;

  // {
  //   id: 1,
  //   userId: "Sri",
  //   fromDate: "09 Oct 2023",
  //   toData: "10 Oct 2023",
  //   numberOfDays: 2,
  //   leaveType: "Earned Leave",
  //   status: "Approved",
  // },
  // {
  //   id: 2,
  //   userId: "Hitha",
  //   fromDate: "09 Oct 2023",
  //   toData: "10 Oct 2023",
  //   numberOfDays: 2,
  //   leaveType: "Earned Leave",
  //   status: "Approved",
  // },
  // {
  //   id: 3,
  //   userId: "Srihitha",
  //   fromDate: "09 Oct 2023",
  //   toData: "10 Oct 2023",
  //   numberOfDays: 2,
  //   leaveType: "Earned Leave",
  //   status: "Approved",
  // },
  // {
  //   id: 4,
  //   userId: "Srinu",
  //   fromDate: "09 Oct 2023",
  //   toData: "10 Oct 2023",
  //   numberOfDays: 2,
  //   leaveType: "Earned Leave",
  //   status: "Approved",
  // },
  // {
  //   id: 5,
  //   userId: "Srilatha",
  //   fromDate: "09 Oct 2023",
  //   toData: "10 Oct 2023",
  //   numberOfDays: 2,
  //   leaveType: "Earned Leave",
  //   status: "Approved",
  // },
  // {
  //   id: 6,
  //   userId: "Sri",
  //   fromDate: "09 Oct 2023",
  //   toData: "10 Oct 2023",
  //   numberOfDays: 2,
  //   leaveType: "Earned Leave",
  //   status: "Approved",
  // },

  const getData = async (e) => {
    try {
      const response = await axios.get(`${JSON_SERVER_URL_LEAVES}`);
      console.log(response);
      if (response.data.length > 0) {
        let leaves = response.data.filter((leave) => leave.username !== user);
        if (isFilterLeavesView) {
          const filterLeaveType = location.state?.filterLeaveType;
          const filterDate = location.state?.filterDate;
          console.log(filterLeaveType);
          console.log(filterDate);
          leaves = leaves.filter(
            (leave) =>
              leave.leaveType === filterLeaveType &&
              leave.fromDate <= filterDate &&
              leave.toDate >= filterDate
          );
        }
        console.log("leaves", leaves);
        const rowsWithIds = (leaves || []).map((leave) => ({
          ...leave,
          id: leave.id,
        }));
        setRows(rowsWithIds);
      }
    } catch (error) {
      console.log("error while calling db", error);
    }
  };
  useEffect(() => {
    getData();
  }, [user]);

  const changeStatus = async (id) => {
    try {
      const response = await axios.get(`${JSON_SERVER_URL_LEAVES}`);
      if (response.data.length > 0) {
        const leave = response.data.find((l) => l.id === id);

        if (leave) {
          leave.status = "Approved";

          const updatedResponse = await axios.put(
            `${JSON_SERVER_URL_LEAVES}/${leave.id}`,
            leave
          );
          console.log("status has been successfully updated.", updatedResponse);

          getData();
        } else {
          console.log("leave not found with id", id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderDetailsButton = (params) => {
    const isApproved = params.row.status === "Approved";
    return (
      <Button
        variant="contained"
        color="primary"
        size="meduim"
        style={{ fontSize: "14px" }}
        onClick={() => {
          if (!isApproved) {
            changeStatus(params.row.id);
          }
        }}
        disabled={isApproved}
      >
        {isApproved ? "Approved" : "Approve"}
      </Button>
    );
  };

  const columns = [
    { field: "username", headerName: "User Name", flex: 1 },
    { field: "fromDate", headerName: "From Date", flex: 1 },
    { field: "toDate", headerName: "TO Date", flex: 1 },
    { field: "numberOfDays", headerName: "Number of Days", flex: 1 },
    { field: "leaveType", headerName: "Leave Type", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: renderDetailsButton,
    },
  ];

  return (
    <>
      <Header title="Team Leaves" />
      <div className="centeredTable">
        <div className="tableButtons">
          <Button onClick={() => navigate("/TeamsCalenderView")}>
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

export default Leaves;
