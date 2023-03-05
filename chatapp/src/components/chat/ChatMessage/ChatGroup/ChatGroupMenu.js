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
import {
  DeleteOutline,
  Logout,
  MoreVert,
  People,
  PersonAdd,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutLocal } from "../../../../service/authService";
import {
  back,
  deleteRoom,
  leaveRoom,
  logout,
} from "../../../../redux/reducer/chatSlice";
import UpdateUser from "../../../user/UpdateUser";
import { Dialog } from "@mui/material";
import RenameGroupModal from "./RenameGroupModal";
import AddMembersGroupModal from "./AddMembersGroupModal";
import { toast } from "react-toastify";
import { GIFJSON } from "../../../../constant";
import Lottie from "react-lottie";
import { useSocket } from "../../../../context/SocketContext";
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
const ChatGroupMenu = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openReNameGroupModal, setOpenReNameGroupModal] = React.useState(false);
  const [openAddMembers, setOpenAddMembers] = React.useState(false);
  const { chats } = useSelector((state) => state.chat);
  const socket = useSocket();
  const { result } = JSON.parse(localStorage.getItem("user"));
  const handleOpenModal = () => {
    setOpenReNameGroupModal(true);
    handleClose();
  };
  const handleOpenAddMembers = () => {
    setOpenAddMembers(true);
    handleClose();
  };
  const handleCloseModal = () => setOpenReNameGroupModal(false);
  const handleCloseAddMembers = () => setOpenAddMembers(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLeaveRoom = () => {
    const confirm = window.confirm("Are you sure to leave this group?");
    if (confirm) {
      const data = {
        chatId: chats?._id,
      };
      dispatch(leaveRoom(data));
      dispatch(back());
      const dataLeave = {
        chatId: chats?._id,
        nameUser: result.fullName,
      };
      socket.emit("leaveRoom", dataLeave);
    }
  };

  const handleDeleteGroup = () => {
    // hop thoai xac nhan
    const confirm = window.confirm("Are you sure to delete this group?");
    if (confirm) {
      const data = {
        chatId: chats?._id,
      };
      dispatch(
        deleteRoom({
          data: chats?._id,
          toast,
        })
      );
      dispatch(back());
    }
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
        <MenuItem disableRipple onClick={handleOpenModal}>
          <div className="my-0 ml-0 mr-[5px]">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: GIFJSON.ReName,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={25}
              width={25}
            />
          </div>
          Rename group
        </MenuItem>
        <MenuItem disableRipple onClick={handleOpenAddMembers}>
          <div className="my-0 ml-0 mr-[5px]">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: GIFJSON.AddPeople,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={25}
              width={25}
            />
          </div>
          Add people
        </MenuItem>
        {/* <MenuItem disableRipple>
          <div className="my-0 ml-0 mr-[5px]">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: GIFJSON.Group,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={25}
              width={25}
            />
          </div>
          Group info
        </MenuItem> */}
        <MenuItem disableRipple onClick={handleDeleteGroup}>
          <div className="my-0 ml-0 mr-[5px]">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: GIFJSON.Trash,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={25}
              width={25}
            />
          </div>
          Delete group
        </MenuItem>
        <MenuItem
          disableRipple
          onClick={handleLeaveRoom}
          sx={{
            color: "red",
          }}
        >
          <div className="my-0 ml-0 mr-[5px]">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: GIFJSON.Logout,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={25}
              width={25}
            />
          </div>
          Leave group
        </MenuItem>
      </StyledMenu>
      <RenameGroupModal
        open={openReNameGroupModal}
        handleClose={handleCloseModal}
        chats={chats}
      />
      <AddMembersGroupModal
        open={openAddMembers}
        handleClose={handleCloseAddMembers}
        chats={chats}
      />
    </div>
  );
};

export default ChatGroupMenu;
