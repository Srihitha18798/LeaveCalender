import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
//import image from "../images/image.jpg"
import leaveIcon from "../images/leave-icon-0.jpg";

const Header = ({ title }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <div>
              <img
                src={leaveIcon}
                alt="Symbol"
                style={{ width: "50px", height: "auto", paddingTop: "5px" }}
                onClick={() => navigate("/Home")}
              ></img>
            </div>
            <Typography
              variant="h6"
              color="inherit"
              style={{ flex: 1, textAlign: "center" }}
            >
              {title}
            </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  component={Link}
                  to="/MyAccount"
                  primarytext="My Account"
                  style={{ color: "blue" }}
                  onClick={handleClose}
                >
                  My account
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/Signout"
                  primarytext="Logout"
                  style={{ color: "blue" }}
                  onClick={handleClose}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
