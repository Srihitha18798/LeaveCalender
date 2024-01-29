import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const EnhancedTable = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      userId: "Sri",
      fromDate: "09 Oct 2023",
      toData: "10 Oct 2023",
      numberOfDays: 2,
      leaveType: "Earned Leave",
      status: "Approved",
    },
    {
      id: 2,
      userId: "Hitha",
      fromDate: "09 Oct 2023",
      toData: "10 Oct 2023",
      numberOfDays: 2,
      leaveType: "Earned Leave",
      status: "Approved",
    },
    {
      id: 3,
      userId: "Srihitha",
      fromDate: "09 Oct 2023",
      toData: "10 Oct 2023",
      numberOfDays: 2,
      leaveType: "Earned Leave",
      status: "Approved",
    },
    {
      id: 4,
      userId: "Srinu",
      fromDate: "09 Oct 2023",
      toData: "10 Oct 2023",
      numberOfDays: 2,
      leaveType: "Earned Leave",
      status: "Approved",
    },
    {
      id: 5,
      userId: "Srilatha",
      fromDate: "09 Oct 2023",
      toData: "10 Oct 2023",
      numberOfDays: 2,
      leaveType: "Earned Leave",
      status: "Approved",
    },
    {
      id: 6,
      userId: "Sri",
      fromDate: "09 Oct 2023",
      toData: "10 Oct 2023",
      numberOfDays: 2,
      leaveType: "Earned Leave",
      status: "Approved",
    },
  ]);

  const columns = [
    { field: "userId", headerName: "User Id", flex: 1 },
    { field: "fromDate", headerName: "From Date", flex: 1 },
    { field: "toData", headerName: "TO Date", flex: 1 },
    { field: "numberOfDays", headerName: "Number of Days", flex: 1 },
    { field: "leaveType", headerName: "Leave Type", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "150px",
      }}
    >
      <div style={{ width: "80%", backgroundColor: "white" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
        ></DataGrid>
      </div>
    </div>
  );
};

export default EnhancedTable;
