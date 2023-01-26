import React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Logout, MoreVert } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutLocal } from "../../../service/authService";
import { logout } from "../../../redux/reducer/chatSlice";
import UpdateUser from "../../user/UpdateUser";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
const { useSelector } = require("react-redux");
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
const SideBarMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [opens, setOpen] = React.useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout());
      if (logOutLocal()) {
        navigate("/login");
      } else {
        alert("Something went wrong!");
      }
    }
  };
  const handleOpenModal = () => {
    handleClose();
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  return (
    <div className="cursor-pointer">
      <MoreVert
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        onClick={handleClick}
      />

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenModal} disableRipple>
          <EditIcon />
          Profile
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleLogout} disableRipple>
          <Logout />
          Log out
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <MoreHorizIcon />
          More
        </MenuItem>
      </StyledMenu>
      <Dialog
        open={opens}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <UpdateUser open={opens} handleClose={handleCloseModal} />
      </Dialog>
    </div>
  );
};

export default SideBarMenu;
