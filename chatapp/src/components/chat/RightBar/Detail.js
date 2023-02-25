import {
  Clear,
  Email,
  ExitToApp,
  LocationSearching,
  PhoneIphone,
} from "@mui/icons-material";
import { Avatar, AvatarGroup, Tooltip } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../redux/reducer/modalSlice";
import ModalImage from "./ModalImage";
const Detail = ({ otherUser, chats }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const handleClose = () => {
    dispatch(closeModal());
  };
  return (
    <div className="h-full bg-white p-6">
      <div className="flex items-end justify-end">
        <Clear onClick={handleClose} className="cursor-pointer" />
      </div>
      <div className="flex items-center justify-center mt-5 flex-col">
        <Avatar
          // src="https://i.pinimg.com/236x/19/23/6a/19236afdd84bc24253fa074bc27c9b64.jpg"
          // src={user?.result?.avatar}
          src={chats?.image || otherUser?.avatar}
          sx={{ width: "200px", height: "200px" }}
          onClick={handleOpen}
          className="cursor-pointer"
        />
        <h1 className="text-bold text-2xl mt-3">
          {chats?.chatName || otherUser?.fullName}
        </h1>
        {/* <p className="text-sm text-gray-400">Hello</p> */}
      </div>
      <div className="mt-5 flex items-center">
        <LocationSearching className="text-gray-400" />
        <p className="text-sm ml-2"> {"" || otherUser?.address} </p>
      </div>
      <div className="mt-5 flex items-center">
        <PhoneIphone className="text-gray-400" />
        <p className="text-sm ml-2"> + {otherUser?.phone} </p>
      </div>
      <div className="mt-5 flex items-center">
        <Email className="text-gray-400" />
        <p className="text-sm ml-2"> {otherUser?.email}</p>
      </div>
      {chats?.isGroupChat && (
        <div>
          <h1 className="mt-5">Members</h1>
          <div>
            <AvatarGroup max={3}>
              {chats?.users.map((item) => (
                <Tooltip
                  title={item.fullName}
                  placement="top"
                  key={item._id}
                  className="cursor-pointer"
                >
                  <Avatar
                    src={item.avatar}
                    alt={item.fullName}
                    sx={{ width: "40px", height: "40px" }}
                  />
                </Tooltip>
              ))}
            </AvatarGroup>
          </div>
        </div>
      )}

      <ModalImage
        open={open}
        handleCloseModal={handleCloseModal}
        avatar={chats?.image || otherUser?.avatar}
      />
    </div>
  );
};

export default Detail;
