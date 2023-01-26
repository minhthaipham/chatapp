import {
  Clear,
  Email,
  ExitToApp,
  LocationSearching,
  PhoneIphone,
} from "@mui/icons-material";
import { Avatar, AvatarGroup } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../redux/reducer/modalSlice";
const Detail = ({ otherUser }) => {
  const dispatch = useDispatch();
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
          src={otherUser?.avatar}
          sx={{ width: "200px", height: "200px" }}
        />
        <h1 className="text-bold text-2xl mt-3">{otherUser?.fullName}</h1>
        {/* <p className="text-sm text-gray-400">Hello</p> */}
      </div>
      <div className="mt-5 flex items-center">
        <LocationSearching className="text-gray-400" />
        <p className="text-sm ml-2"> {otherUser?.address} </p>
      </div>
      <div className="mt-5 flex items-center">
        <PhoneIphone className="text-gray-400" />
        <p className="text-sm ml-2"> + {otherUser?.phone} </p>
      </div>
      <div className="mt-5 flex items-center">
        <Email className="text-gray-400" />
        <p className="text-sm ml-2"> {otherUser?.email}</p>
      </div>
      <h1 className="mt-5">Media</h1>
      <div>
        <AvatarGroup max={4}>
          <Avatar src="https://i.pinimg.com/236x/19/23/6a/19236afdd84bc24253fa074bc27c9b64.jpg" />
          <Avatar src="https://i.pinimg.com/236x/19/23/6a/19236afdd84bc24253fa074bc27c9b64.jpg" />
          <Avatar src="https://i.pinimg.com/236x/19/23/6a/19236afdd84bc24253fa074bc27c9b64.jpg" />
          <Avatar src="https://i.pinimg.com/236x/19/23/6a/19236afdd84bc24253fa074bc27c9b64.jpg" />
          <Avatar src="https://i.pinimg.com/236x/19/23/6a/19236afdd84bc24253fa074bc27c9b64.jpg" />
          <Avatar src="https://i.pinimg.com/236x/19/23/6a/19236afdd84bc24253fa074bc27c9b64.jpg" />
        </AvatarGroup>
      </div>
    </div>
  );
};

export default Detail;
