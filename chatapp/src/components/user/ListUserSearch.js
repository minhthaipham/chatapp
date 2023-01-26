import { Avatar, Badge, styled } from "@mui/material";
import React from "react";
// import Lottie from "lottie-react";
import { GIFJSON } from "../../constant";
import * as api from "../../api";
import { useDispatch } from "react-redux";
import { accessChat, getChat } from "../../redux/reducer/chatSlice";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
const ListUserSearch = ({ users, setUserChats, onlineUsers }) => {
  const dispatch = useDispatch();
  const { result } = JSON.parse(localStorage.getItem("user"));
  const handleGetChat = (id) => {
    const data = {
      ida: result._id,
      idb: id,
    };
    dispatch(accessChat(data));
    // const chat = await api.accessChat(data);
    // setUserChats(chat.data);
    //   const { data } = await api.accessChat({ id , result?._id });
    //   console.log(data);
    // setUserChat(data);

    // dispatch(getChat(id));
  };
  return (
    <div
      className="mt-3 cursor-pointer hover:bg-zinc-500  px-6 py-2"
      onClick={() => {
        handleGetChat(users._id);
      }}
    >
      <div className="flex items-center">
        {/* <div className="relative">
          <Avatar className="mr-3" src={users?.avatar} />

          <span className="absolute w-3 h-3 rounded-full bg-green-500 inline-block right-3 top-[70%]"></span>
        </div> */}
        {onlineUsers?.find(
          (userOnline) => userOnline?.userId === users?._id
        ) ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            className="mr-2"
          >
            <Avatar src={users?.avatar} />
          </StyledBadge>
        ) : (
          <Avatar src={users?.avatar} className="mr-2" />
        )}
        <div>
          {/* <h1 className="text-white text-bold text-xl">{user?.fullName}</h1> */}
          <p className="text-white text-bold text-xl  ">{users?.fullName}</p>
        </div>
      </div>
    </div>
  );
};

export default ListUserSearch;
